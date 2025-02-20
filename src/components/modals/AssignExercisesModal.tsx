'use client';

import { createPatientExercise, getExercisesByTherapist, getGlobalExercises } from "@/services/ExerciseService";
import { useEffect, useState } from "react";

interface ExerciseData {
    exercise_id: string;
    name: string;
    is_global?: boolean;   // or you can check from backend
    // etc. 
}
  
interface AssignExercisesModalProps {
    patientId: string;
    therapistId: string;
    onClose: () => void;
}
  
export default function AssignExercisesModal({
    patientId,
    therapistId,
    onClose,
  }: AssignExercisesModalProps) {
    const [globalExercises, setGlobalExercises] = useState<ExerciseData[]>([]);
    const [therapistExercises, setTherapistExercises] = useState<ExerciseData[]>([]);
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    // Fetch global + therapist exercises
    useEffect(() => {
      let isMounted = true;
  
      async function fetchExercises() {
        setLoading(true);
        setError(null);
        try {
          const globalData = await getGlobalExercises();
          const therapistData = await getExercisesByTherapist(therapistId);
  
          // globalData might be { exercises: [...], total: number }
          setGlobalExercises(globalData.exercises || []);
          // therapistData might be { exercises: [...], total: number }
          setTherapistExercises(therapistData.exercises || []);
        } catch (err: any) {
          console.error("Error fetching exercises:", err);
          setError(err.message);
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
  
      fetchExercises();
  
      return () => {
        isMounted = false;
      };
    }, [therapistId]);
  
    // Handle toggling a checkbox
    const handleToggleExercise = (exerciseId: string) => {
      setSelectedExerciseIds((prev) => {
        if (prev.includes(exerciseId)) {
          return prev.filter((id) => id !== exerciseId);
        } else {
          return [...prev, exerciseId];
        }
      });
    };
  
    // Submit selected exercises
    const handleAssign = async () => {
      console.log(patientId)
      console.log(therapistId)
      console.log(selectedExerciseIds)
      try {
        setLoading(true);
        await createPatientExercise({
          patientId,
          therapistId,
          exerciseIds: selectedExerciseIds,
        });
        // Optionally alert success, or refresh parent’s data, etc.
        onClose(); 
      } catch (err) {
        console.error("Failed to assign exercises:", err);
        setError("Failed to assign exercises");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        {/* modal content */}
        <div className="relative bg-white p-4 rounded shadow-lg w-[90%] max-w-md">
          <h2 className="text-xl font-bold mb-4">Assign Exercises</h2>
  
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
  
          {!loading && !error && (
            <div>
              {/* For example, two collapsible sections or tabs for Global vs Therapist */}
              <h3 className="text-lg font-semibold mb-2">Global Exercises</h3>
              {globalExercises.length === 0 ? (
                <p>No global exercises found.</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {globalExercises.map((ex) => (
                    <label key={ex.exercise_id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedExerciseIds.includes(ex.exercise_id)}
                        onChange={() => handleToggleExercise(ex.exercise_id)}
                      />
                      <span>{ex.name}</span>
                    </label>
                  ))}
                </div>
              )}
  
              <h3 className="text-lg font-semibold mb-2">My Private Exercises</h3>
              {therapistExercises.length === 0 ? (
                <p>No private exercises found.</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {therapistExercises.map((ex) => (
                    <label key={ex.exercise_id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedExerciseIds.includes(ex.exercise_id)}
                        onChange={() => handleToggleExercise(ex.exercise_id)}
                      />
                      <span>{ex.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
  
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={loading || selectedExerciseIds.length === 0}
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    );
  }