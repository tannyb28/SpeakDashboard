// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import PatientsTable from "@/components/PatientsTable";
import ExercisesTable from "@/components/ExercisesTable";
import { usePatients } from "@/hooks/usePatients";
import { useGlobalExercises, useTherapistExercises } from "@/hooks/useExercises";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define the shape of your decoded token
type DecodedToken = {
  email: string;
  exp: number;
  firstName: string;
  lastName: string;
  userID: string; // therapist ID
};

export default function DashboardHome() {
  const [therapistId, setTherapistId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"patients" | "exercises">("patients");
  const [activeExerciseTab, setActiveExerciseTab] = useState<"global" | "therapist">("therapist");

  useEffect(() => {
    const token = Cookies.get("peakspeak-token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setTherapistId(decoded.userID);
      } catch (err) {
        console.error("Error decoding JWT:", err);
      }
    }
  }, []);

  const { patients, loading: patientsLoading, error: patientsError } = usePatients(therapistId || "");
  const {
    exercises: globalExercises,
    loading: globalExercisesLoading,
    error: globalExercisesError,
    refetch: refetchGlobalExercises,
  } = useGlobalExercises();
  const {
    exercises: therapistExercises,
    loading: therapistExercisesLoading,
    error: therapistExercisesError,
    refetch: refetchTherapistExercises,
  } = useTherapistExercises(therapistId || "");

  // Refresh list based on which exercise tab is active
  function refreshList() {
    if (activeExerciseTab === "global") {
      refetchGlobalExercises();
    } else {
      refetchTherapistExercises();
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-4 md:px-8 bg-light w-full">
      {/* Main Title */}
      <h1 className="text-3xl font-bold mt-24 mb-6 text-primary">
        Welcome to the Dashboard
      </h1>

      {/* Main Tab Navigation (Patients / Exercises) */}
      <div className="flex justify-center space-x-8 border-b-2 border-gray-400 pb-2 mb-6">
        <button
          onClick={() => setActiveTab("patients")}
          className={`font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === "patients" ? "bg-primary text-dark" : "text-gray-400 hover:bg-gray-200"
          }`}
        >
          Patients
        </button>
        <button
          onClick={() => setActiveTab("exercises")}
          className={`font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === "exercises" ? "bg-primary text-dark" : "text-gray-400 hover:bg-gray-200"
          }`}
        >
          Exercises
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-grow w-full max-w-7xl mx-auto">
        {/* ========== PATIENTS TAB ========== */}
        {activeTab === "patients" && (
          <div className="bg-light p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Patients</h2>
            {!therapistId && (
              <p className="text-red-500">
                No valid token found or unable to decode therapist ID.
              </p>
            )}
            {therapistId && (
              <>
                {patientsLoading && <p>Loading patients...</p>}
                {patientsError && <p className="text-red-500">Error: {patientsError.message}</p>}
                {!patientsLoading && !patientsError && (
                  <PatientsTable patients={patients} />
                )}
              </>
            )}
          </div>
        )}

        {/* ========== EXERCISES TAB ========== */}
        {activeTab === "exercises" && (
          <div className="bg-light p-6 rounded-lg shadow-md w-full">
            {/* Sub-navigation for Exercises (Global / Therapist) */}
            <div className="flex space-x-1 mb-4">
              <button
                className={`px-4 py-2 font-semibold rounded-md ${
                  activeExerciseTab === "therapist"
                    ? "bg-primary text-dark" : "text-gray-400 shadow-inner hover:bg-gray-200"
                }`}
                onClick={() => setActiveExerciseTab("therapist")}
              >
                My Exercises
              </button>
              <button
                className={`px-4 py-2 font-semibold rounded-md ${
                  activeExerciseTab === "global"
                    ? "bg-primary text-dark" : "text-gray-400 shadow-inner hover:bg-gray-200"
                }`}
                onClick={() => setActiveExerciseTab("global")}
              >
                Global Exercises
              </button>
            </div>

            {/* Show relevant data based on sub-tab */}
            {activeExerciseTab === "global" && (
              <div>
                {globalExercisesLoading && <p>Loading global exercises...</p>}
                {globalExercisesError && <p className="text-red-500">Error: {globalExercisesError.message}</p>}
                {!globalExercisesLoading && !globalExercisesError && (
                  <ExercisesTable exercises={globalExercises} refreshList={refetchGlobalExercises}/>
                )}
              </div>
            )}

            {activeExerciseTab === "therapist" && (
              <div>
                {!therapistId && (
                  <p className="text-red-500">No valid token found for therapist ID.</p>
                )}
                {therapistId && (
                  <>
                    {therapistExercisesLoading && <p>Loading therapist exercises...</p>}
                    {therapistExercisesError && (
                      <p className="text-red-500">Error: {therapistExercisesError.message}</p>
                    )}
                    {!therapistExercisesLoading && !therapistExercisesError && (
                      <ExercisesTable exercises={therapistExercises} refreshList={refetchTherapistExercises}/>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Pass refreshList to any modals inside ExercisesTable by wrapping them in a container if needed */}
            {/* For example, if ExercisesTable renders its own modals, you could pass refreshList as props */}
          </div>
        )}
      </div>
    </div>
  );
}
