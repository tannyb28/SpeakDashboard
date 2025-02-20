'use client';

// app/patients/[patientId]/page.tsx
import { notFound } from "next/navigation";
import { getPatientExercisesByUser } from "@/services/ExerciseService";
import { getPatient } from "@/services/PatientService";
import ClientPatientDetailPage from "./ClientPatientDetailPage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function PatientDetailPage({
  params,
}: {
  params: { patientId: string };
}) {
  const { patientId } = params;
  const [patient, setPatient] = useState(null);
  const [patientExercises, setPatientExercises] = useState([]);
  const [noPatient, setNoPatient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // 1. fetch the patient
      const fetchedPatient = await getPatient(patientId);
      if (!fetchedPatient) {
        notFound();
      }
      setPatient(fetchedPatient);

      // 2. fetch the patient’s exercises
      const fetchedExercises = await getPatientExercisesByUser(patientId);
      setPatientExercises(fetchedExercises);

      setLoading(false);
    }

    fetchData();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  
  // 3. pass them to the client component
  if (!patient) {
    notFound();
  }
  return (
    <ClientPatientDetailPage
      patient={patient}
      patientExercises={patientExercises}
    />
  );
}
