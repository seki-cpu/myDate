"use client";
import { useEffect, useRef, useState } from "react";
import type { MemoryImage } from "../../types/domain";
import { MAX_PHOTOS, StorageService } from "../../lib/services/photos";
import { useLocale } from "../ui/locale";
import { journalCopy } from "./journalCopy";
import { PrivatePhoto } from "./PrivatePhoto";

export function PhotoJournal({
  memoryId,
  photos,
  refresh,
}: {
  memoryId: string;
  photos: MemoryImage[];
  refresh: () => Promise<void>;
}) {
  const t = journalCopy[useLocale()];
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [failed, setFailed] = useState<File[]>([]);
  const [index, setIndex] = useState(0);
  const [viewing, setViewing] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = [...photos]
    .filter((p) => p.ready)
    .sort((a, b) => a.sort_order - b.sort_order);
  useEffect(() => {
    if (viewing) dialog.current?.showModal();
    else dialog.current?.close();
  }, [viewing]);

  async function upload(files: File[]) {
    if (busy || !files.length) return;
    if (files.length + photos.length > MAX_PHOTOS) {
      setError(t.photo_limit);
      return;
    }
    setBusy(true);
    setError("");
    setFailed([]);
    const failures: File[] = [];
    try {
      for (const [i, file] of files.entries()) {
        setProgress(`${t.upload} ${i + 1} / ${files.length}`);
        try {
          await StorageService.upload(memoryId, file);
        } catch (cause) {
          failures.push(file);
          const key =
            cause && typeof cause === "object" && "message" in cause
              ? String(cause.message)
              : "";
          setError(
            key in t ? String(t[key as keyof typeof t]) : t.uploadFailed,
          );
        }
      }
      setFailed(failures);
    } finally {
      await refresh();
      setBusy(false);
      setProgress("");
    }
  }
  async function remove(photo: MemoryImage) {
    setBusy(true);
    setError("");
    try {
      await StorageService.remove(photo);
      await refresh();
    } catch {
      setError(t.failed);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="journal-panel">
      <h2>
        {t.photos} <small>{photos.length} / 9</small>
      </h2>
      <div className="journal-photo-grid">
        {[...photos]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((photo) => (
            <div key={photo.id}>
              {photo.ready ? (
                <div
                  className="journal-photo-trigger"
                  role="button"
                  tabIndex={0}
                  aria-label={t.photoAlt}
                  onClick={() => {
                    setIndex(visible.findIndex((p) => p.id === photo.id));
                    setViewing(true);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIndex(visible.findIndex((p) => p.id === photo.id));
                      setViewing(true);
                    }
                  }}
                >
                  <PrivatePhoto photo={photo} />
                </div>
              ) : (
                <p>{t.pending}</p>
              )}
              <button
                className="journal-text-button"
                disabled={busy}
                onClick={() => void remove(photo)}
              >
                {t.remove}
              </button>
            </div>
          ))}
      </div>

      <div className="journal-file-label">
        <span className="journal-upload-caption">{t.addPhotos}</span>
        <label
          className={`journal-upload-button${busy || photos.length >= MAX_PHOTOS ? " is-disabled" : ""}`}
        >
          <span aria-hidden="true">＋</span>
          <span>{t.addPhotos}</span>
          <input
            className="journal-file-input"
            aria-label={t.addPhotos}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
            multiple
            disabled={busy || photos.length >= MAX_PHOTOS}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              event.target.value = "";
              void upload(files);
            }}
          />
        </label>
      </div>

      <p className="journal-upload-status" role="status">{progress}</p>
      <p className="journal-upload-error" role="alert">{error}</p>
      {failed.length > 0 && (
        <div>
          <p>{failed.map((f) => f.name).join(", ")}</p>
          <button
            className="secondary-button"
            disabled={busy}
            onClick={() => void upload(failed)}
          >
            {t.retry} ({failed.length})
          </button>
        </div>
      )}
      <dialog
        className="journal-viewer"
        ref={dialog}
        onCancel={() => setViewing(false)}
        onClose={() => setViewing(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft")
            setIndex((i) => (i + visible.length - 1) % visible.length);
          if (event.key === "ArrowRight")
            setIndex((i) => (i + 1) % visible.length);
        }}
        aria-label={t.photos}
      >
        <div className="journal-viewer-toolbar">
          <button autoFocus onClick={() => setViewing(false)}>
            {t.close}
          </button>
          <span>
            {index + 1} / {visible.length}
          </span>
        </div>
        {viewing && visible[index] && (
          <PrivatePhoto photo={visible[index]} large />
        )}
        <div className="journal-viewer-toolbar">
          <button
            aria-label={t.previous}
            disabled={visible.length < 2}
            onClick={() =>
              setIndex((i) => (i + visible.length - 1) % visible.length)
            }
          >
            ←
          </button>
          <button
            aria-label={t.next}
            disabled={visible.length < 2}
            onClick={() => setIndex((i) => (i + 1) % visible.length)}
          >
            →
          </button>
        </div>
      </dialog>
    </section>
  );
}
