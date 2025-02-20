// app/exercises/[exerciseId]/page.tsx
import { notFound } from "next/navigation"; // for 404 handling if needed
import { getExerciseById } from "@/services/ExerciseService";
// async function getExerciseById(exerciseId: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercise/${exerciseId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return null; // or throw an error
//   }

//   return res.json();
// }

export default async function ExerciseDetailPage({
  params,
}: {
  params: { exerciseId: string };
}) {
  const { exerciseId } = params;
  const exercise = await getExerciseById(exerciseId);

  // If we didn’t find an exercise, we can show a 404
  if (!exercise) {
    notFound();
  }

  return (
    <main className="mt-16 px-4 md:px-8 bg-light w-full p-4 md:p-8 min-h-screen">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>

        {/* Therapist Info: 
            If your backend returns therapist_name, or if you only have therapist_id, 
            you can show it as-is or do a separate fetch to get the therapist's name. 
         */}
        <p className="mb-2">
          <span className="font-semibold">Therapist:</span>{" "}
          {exercise.therapist_name || exercise.therapist_id || "Unknown Therapist"}
        </p>

        {/* Description */}
        <p className="mb-4">
          <span className="font-semibold">Description:</span> {exercise.description || "—"}
        </p>

        {/* Tags */}
        <div className="mb-4">
          <span className="font-semibold">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {exercise.tags && exercise.tags.length > 0 ? (
              exercise.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-800 
                             text-xs font-semibold px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm italic">No tags</span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
