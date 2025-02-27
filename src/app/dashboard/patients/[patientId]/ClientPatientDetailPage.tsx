"use client";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { deletePatientExercise } from "@/services/ExerciseService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AssignExercisesModal from "@/components/modals/AssignExercisesModal";
import VideoModal from "@/components/modals/VideoModal";
import { decryptVideoWithAESGCM } from "@/util/VideoUtil";
import Link from "next/link";
import Image from "next/image";

// type definitions for clarity
type Patient = {
  first_name: string;
  last_name: string;
  profile_image?: string;
  [key: string]: any; // fallback for extra fields
};

type Exercise = {
  name?: string;
  description?: string;
  tags?: string[];
  // ...
};

type PatientExerciseObj = {
  exercise: Exercise;
  exercise_id: string;
  id: string; // unique ID for the "patient_exercise" record
  patient_exercise: {
    status: string;
    [key: string]: any;
  };
};

interface ClientPatientDetailPageProps {
  patient: Patient;
  patientExercises: PatientExerciseObj[];
}

// Define the shape of your decoded token
type DecodedToken = {
  Email: string;
  FirstName: string;
  LastName: string;
  userID: string;      // therapist ID
  exp: number;         // expiration (Unix)
};

export default function ClientPatientDetailPage({
  patient,
  patientExercises,
}: ClientPatientDetailPageProps) {
  
  const [therapistId, setTherapistId] = useState<string>(""); // default to empty string
  const [exercises, setExercises] = useState<PatientExerciseObj[]>(patientExercises || []);
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [showAssignModal, setShowAssignModal] = useState(false);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [decryptedVideoUrl, setDecryptedVideoUrl] = useState<string | null>(null);
  
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

  const pendingExercises = exercises.filter(
    (item) => item.patient_exercise.status === "pending"
  );
  const completedExercises = exercises.filter(
    (item) => item.patient_exercise.status === "completed"
  );

  const handleDelete = async (id: string) => {
    try {
      await deletePatientExercise(id);
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
    } catch (error) {
      console.error("Failed to delete exercise", error);
      return;
    }
  };
  
  const handleViewVideo = async (patientExerciseID: string) => {
    try {
      // 2. Fetch the download info (downloadURL + aesKey)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getdownloadurl/${patientExerciseID}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to get download URL");
      const { aes_key, download_url } = await response.json();

      // 3. Download the encrypted video as an ArrayBuffer
      const videoRes = await fetch(download_url);
      if (!videoRes.ok) throw new Error("Failed to download video");
      const encryptedData = await videoRes.arrayBuffer();

      // 4. Decrypt the video
      const decrypted = await decryptVideoWithAESGCM(encryptedData, aes_key);
      if (!decrypted) throw new Error("Failed to decrypt video");

      // 5. Create a blob URL for the decrypted video
      const blob = new Blob([decrypted], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setDecryptedVideoUrl(url);
      setShowVideoModal(true);

    } catch (err) {
      console.error("Error viewing video:", err);
    }
  };

  return (
    <main className="mt-16 px-4 md:px-8 bg-light w-full p-4 md:p-8 min-h-screen">
      {/* Back Button */}
      <div className="mb-4">
        <Link href="/dashboard" className="text-dark hover:text-medium">
          <KeyboardBackspaceIcon />
        </Link>
      </div>
      <div className="flex flex-col justify-center max-w-xl mx-auto bg-white rounded shadow p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <Image
            src={patient.profile_image || "/default-profile.png"}
            alt={`${patient.first_name} ${patient.last_name}`}
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        {/* Title */}
        <h1 className="text-3xl text-center font-bold mb-4">
          {patient.first_name} {patient.last_name}
        </h1>

        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("pending")}
            className={`font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "pending"
                ? "bg-primary text-dark"
                : "text-gray-400 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`font-semibold text-lg px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "completed"
                ? "bg-primary text-dark"
                : "text-gray-400 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Pending Exercises */}
        {activeTab === "pending" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Pending Exercises</h2>
            {pendingExercises.length === 0 ? (
              <p>No pending exercises.</p>
            ) : (
              pendingExercises.map((obj) => (
                <div
                  key={obj.id}
                  className="border-b py-2 px-4 shadow-lg border-2 rounded-lg flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 mr-2 rounded-full ${
                        obj.patient_exercise.status === "pending"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    />
                    <p className="font-semibold">
                      {obj.exercise?.name || "Unnamed Exercise"}
                    </p>
                  </div>
                  {/* TRASH CAN ICON */}
                  <button
                    onClick={() => handleDelete(obj.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Delete Exercise"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Completed Exercises */}
        {activeTab === "completed" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Completed Exercises</h2>
            {completedExercises.length === 0 ? (
              <p>No completed exercises.</p>
            ) : (
              completedExercises.map((obj) => (
                <div
                  key={obj.id}
                  className="border-b py-2 px-4 shadow-lg border-2 rounded-lg flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 mr-2 rounded-full ${
                        obj.patient_exercise.status === "pending"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    />
                    <p className="font-semibold">
                      {obj.exercise?.name || "Unnamed Exercise"}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Possibly an icon to watch the video if it’s completed */}
                    <button
                      onClick={() => handleViewVideo(obj.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      Watch Video
                    </button>

                    {/* TRASH CAN ICON */}
                    <button
                      onClick={() => handleDelete(obj.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete Exercise"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}


        {/* Assign Exercises Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAssignModal(true)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Assign Exercises
          </button>
        </div>
      </div>

      {/* Show the modal if showAssignModal is true */}
      {showAssignModal && (
        <AssignExercisesModal
          patientId={patient.patient_id || patient.user_id}
          therapistId={therapistId}
          onClose={() => setShowAssignModal(false)}
        />
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={showVideoModal}
        onClose={() => {
          setShowVideoModal(false);
          // Cleanup the blob URL
          if (decryptedVideoUrl) URL.revokeObjectURL(decryptedVideoUrl);
          setDecryptedVideoUrl(null);
        }}
        videoUrl={decryptedVideoUrl}
      />
    </main>
  );
}
