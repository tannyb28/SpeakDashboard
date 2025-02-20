// src/hooks/usePatients.ts
import { useEffect, useState } from 'react';
import { getPatients } from '@/services/PatientService';

export function usePatients(therapistId: string) {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!therapistId) return;
    setLoading(true);
    getPatients(therapistId)
      .then((data) => {
        // data is an array of patient objects
        setPatients(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [therapistId]);

  return { patients, loading, error };
}
