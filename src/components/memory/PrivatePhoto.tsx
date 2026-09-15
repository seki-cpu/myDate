"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { MemoryImage } from "../../types/domain";
import { StorageService } from "../../lib/services/photos";
import { useLocale } from "../ui/locale";
import { journalCopy } from "./journalCopy";

export function PrivatePhoto({
  photo,
  large = false,
}: {
  photo: MemoryImage;
  large?: boolean;
}) {
  const t = journalCopy[useLocale()];
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let alive = true;
    let objectUrl = "";
    setUrl("");
    setError(false);
    StorageService.download(photo)
      .then((blob) => {
        if (!alive) return;
        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      })
      .catch(() => {
        if (alive) setError(true);
      });
    return () => {
      alive = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [photo, attempt]);
  if (error)
    return (
      <span role="status">
        {t.failed}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setAttempt(attempt + 1);
          }}
        >
          {t.retry}
        </button>
      </span>
    );
  return url ? (
    <Image
      className={large ? "journal-photo-large" : "journal-photo"}
      src={url}
      width={photo.width ?? 600}
      height={photo.height ?? 600}
      alt={t.photoAlt}
      unoptimized
    />
  ) : (
    <span className="journal-photo-loading">{t.loading}</span>
  );
}
