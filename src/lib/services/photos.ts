import type { MemoryImage } from "../../types/domain";
import { supabase } from "../supabase";
import { AuthService } from "./auth";

export const MAX_PHOTOS = 9;
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
const bucket = "memory-photos";

export function validatePhoto(file: Pick<File, "size" | "type" | "name">) {
  if (!file.size || file.size > MAX_UPLOAD_BYTES)
    throw new Error("photo_large");
  if (
    !/^image\/(jpeg|png|webp|heic|heif)$/.test(file.type) &&
    !/\.(heic|heif)$/i.test(file.name)
  )
    throw new Error("photo_format");
}

export async function normalizePhoto(file: File) {
  validatePhoto(file);
  let source: Blob = file;
  if (/heic|heif/i.test(file.type) || /\.(heic|heif)$/i.test(file.name)) {
    try {
      const convert = (await import("heic2any")).default;
      const result = await convert({
        blob: file,
        toType: "image/jpeg",
        quality: 0.92,
      });
      source = Array.isArray(result) ? result[0] : result;
    } catch {
      throw new Error("photo_heic");
    }
  }
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(source, {
      imageOrientation: "from-image",
    });
  } catch {
    throw new Error("photo_format");
  }
  try {
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("photo_format");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (value) => (value ? resolve(value) : reject(new Error("photo_format"))),
        "image/jpeg",
        0.9,
      ),
    );
    if (blob.size > 6 * 1024 * 1024) throw new Error("photo_large");
    return { blob, width: canvas.width, height: canvas.height };
  } finally {
    bitmap.close();
  }
}

export const StorageService = {
  async upload(memoryId: string, file: File) {
    const user = await AuthService.requireUser();
    const normalized = await normalizePhoto(file);
    const id = crypto.randomUUID();
    const path = `users/${user.id}/memories/${memoryId}/${id}.jpg`;
    // Reserve a slot before upload. A row lock and unique slot enforce the nine-photo limit.
    const { data, error } = await supabase()
      .from("memory_images")
      .insert({
        id,
        memory_id: memoryId,
        user_id: user.id,
        storage_path: path,
        width: normalized.width,
        height: normalized.height,
      })
      .select()
      .single();
    if (error) throw error;
    const image = data as MemoryImage;
    try {
      const upload = await supabase()
        .storage.from(bucket)
        .upload(path, normalized.blob, {
          contentType: "image/jpeg",
          upsert: false,
        });
      if (upload.error) throw upload.error;
      const ready = await supabase()
        .from("memory_images")
        .update({ ready: true })
        .eq("id", id);
      if (ready.error) throw ready.error;
    } catch (error) {
      // A failed cleanup leaves a visible, removable reservation so users can recover.
      try {
        await StorageService.remove(image);
      } catch {
        /* Retain reservation for retry. */
      }
      throw error;
    }
  },
  async remove(image: MemoryImage) {
    const removed = await supabase()
      .storage.from(bucket)
      .remove([image.storage_path]);
    if (removed.error) throw removed.error;
    const { error } = await supabase()
      .from("memory_images")
      .delete()
      .eq("id", image.id)
      .select("id")
      .single();
    if (error) throw error;
  },
  async download(image: MemoryImage): Promise<Blob> {
    const { data, error } = await supabase()
      .storage.from(bucket)
      .download(image.storage_path);
    if (error) throw error;
    return data;
  },
};
