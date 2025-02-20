import React from "react";

// 1. Allowed Tags - Similar to your Swift enum
export const EXERCISE_TAGS = [
  "articulation",
  "stuttering",
  "comprehension",
  "audio",
  "vocal",
] as const;

export type ExerciseTag = typeof EXERCISE_TAGS[number]; 
// Results in: "articulation" | "stuttering" | "comprehension" | "audio" | "vocal"

// 2. Tag colors - replicate your Swift switch
function tagColor(tag: ExerciseTag): string {
  switch (tag) {
    case "articulation":
      return "bg-red-500";
    case "stuttering":
      return "bg-blue-500";
    case "comprehension":
      return "bg-green-500";
    case "audio":
      return "bg-orange-500";
    case "vocal":
      return "bg-purple-500";
    default:
      return "bg-gray-400";
  }
}

// 3. Props for TagView
interface TagViewProps {
  tag: ExerciseTag;
  isSelected?: boolean;    // default: false
  isSelectable?: boolean;  // default: false
  onSelect?: () => void;
}

// 4. TagView component
export function TagView({
  tag,
  isSelected = false,
  isSelectable = false,
  onSelect,
}: TagViewProps) {
  const colorClass = isSelected ? tagColor(tag) : "bg-gray-400";
  
  return (
    <span
      className={`inline-block text-white text-xs font-semibold px-2 py-1 rounded-md cursor-pointer
                  ${colorClass}`}
      onClick={() => {
        if (isSelectable && onSelect) {
          onSelect();
        }
      }}
    >
      {capitalize(tag)}
    </span>
  );
}

// Optional helper to capitalize the tag name
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
