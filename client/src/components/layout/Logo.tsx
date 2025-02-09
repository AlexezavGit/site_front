import { Heart } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Heart className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl">Feel Again</span>
    </div>
  );
}
