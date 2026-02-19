import {
  Clock,
  Sun,
  Eraser,
  Droplets,
  Palette,
  Focus,
  Scissors,
  AudioLines,
  Smile,
  Film,
  Camera,
  BookImage,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<string, ComponentType<LucideProps>> = {
  Clock,
  Sun,
  Eraser,
  Droplets,
  Palette,
  Focus,
  Scissors,
  AudioLines,
  Smile,
  Film,
  Camera,
  BookImage,
};

export function SlugIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
