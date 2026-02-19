"use client";

import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";

type UploadZoneProps = {
  onUpload: (dataUrl: string, mimeType: string) => void;
  disabled?: boolean;
};

const ACCEPT = "image/jpeg,image/png,image/webp";
const MAX_SIZE_MB = 8;

export function UploadZone({ onUpload, disabled }: UploadZoneProps) {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.match(/^image\/(jpeg|png|webp)$/)) return;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        onUpload(dataUrl, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDrag(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [disabled, processFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(true);
  }, []);

  const onDragLeave = useCallback(() => setDrag(false), []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      e.target.value = "";
    },
    [processFile]
  );

  const onReset = useCallback(() => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  if (preview) {
    return (
      <div className="rounded-2xl bg-white border border-warm-300 shadow-sm overflow-hidden">
        <div className="relative aspect-video max-h-80 bg-warm-100">
          <img src={preview} alt="Your photo" className="w-full h-full object-contain" />
          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className="absolute top-3 right-3 rounded-lg bg-white/90 shadow hover:bg-white text-warm-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50 transition-colors"
          >
            Choose Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        rounded-2xl border-2 border-dashed p-8 md:p-12 text-center transition-all
        ${drag ? "border-accent bg-accent/5" : "border-warm-300 bg-white hover:border-accent/50 hover:shadow-md hover:shadow-warm-900/5"}
        ${disabled ? "pointer-events-none opacity-60" : "cursor-pointer"}
      `}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={onInputChange}
        className="hidden"
      />
      <Upload className="w-12 h-12 mx-auto text-warm-400 mb-4" />
      <p className="text-warm-700 font-semibold text-lg mb-1">
        Drop your photo here, or click to choose
      </p>
      <p className="text-warm-400">
        Supports JPG, PNG, WebP — max {MAX_SIZE_MB}MB
      </p>
    </div>
  );
}
