// src/hooks/useExercises.ts
import { useEffect, useState, useCallback } from 'react';
import { getGlobalExercises, getExercisesByTherapist } from '@/services/ExerciseService';

export function useGlobalExercises() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define a refetch function that fetches data again
  const refetch = useCallback(() => {
    setLoading(true);
    getGlobalExercises()
      .then((data) => {
        // data should be { exercises: [...], total: number }
        setExercises(data.exercises || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Fetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  return { exercises, loading, error, refetch };
}

export function useTherapistExercises(therapistId: string) {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define refetch function that depends on therapistId
  const refetch = useCallback(() => {
    if (!therapistId) return;
    setLoading(true);
    getExercisesByTherapist(therapistId)
      .then((data) => {
        // data should be { exercises: [...], total: number }
        setExercises(data.exercises || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [therapistId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { exercises, loading, error, refetch };
}
