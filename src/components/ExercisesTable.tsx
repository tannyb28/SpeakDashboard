// src/components/ExercisesTable.tsx
import React, { useState } from 'react';
import ExerciseDetailModal from './modals/ExerciseDetailModal';
import CreateExerciseWizardModal from './modals/CreateExerciseWizardModal';
import { EXERCISE_TAGS, ExerciseTag, TagView } from './ExerciseTags';

interface Exercise {
  exercise_id: string;
  name: string;
  description: string;
  tags: string[];
  pdf_url: string;
}

type ExercisesTableProps = {
  exercises: Exercise[];
  refreshList: () => void;
};

export default function ExercisesTable({ exercises, refreshList }: ExercisesTableProps) {
  // State to track which exercise is selected & whether the modal is open
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  function handleViewDetails(exercise: Exercise) {
    setSelectedExercise(exercise);
    setIsDetailModalOpen(true);
  }

  function closeDetailModal() {
    setIsDetailModalOpen(false);
    setSelectedExercise(null);
  }

  return (
    <>
      {/* CREATE EXERCISE BUTTON */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Exercise
        </button>
      </div>

      {/* EXERCISE TABLE */}
      <table className="w-full bg-light rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b border-gray-400 text-left font-semibold">
              Exercise Name
            </th>
            <th className="py-3 px-4 border-b border-gray-400 text-left font-semibold">
              Tags
            </th>
            <th className="py-3 px-4 border-b border-gray-400 text-left font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((ex) => (
            <tr key={ex.exercise_id}>
              <td className="py-3 px-4 border-b border-gray-400">{ex.name}</td>
              <td className="py-3 px-4 border-b border-gray-400">
                <div className="flex flex-wrap gap-2">
                  {ex.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-800 
                                 text-xs font-semibold px-2 py-1 
                                 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 border-b border-gray-400">
                <button
                  className="bg-blu px-3 py-1 rounded-md border-2 border-gray-300
                             hover:bg-gray-300 hover:border-gray-500 transition-colors"
                  onClick={() => handleViewDetails(ex)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
        onExerciseDeleted={refreshList}
      />

      {/* Create Exercise Modal */}
      <CreateExerciseWizardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onExerciseCreated={refreshList}
      />
    </>
  );
}