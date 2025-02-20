// src/services/ExerciseService.ts
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getGlobalExercises() {
    const response = await fetch(`${BASE_URL}/api/exercises/exercises`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch global exercises");
    }
    return response.json();
}

export async function getExerciseById(exerciseId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercise/${exerciseId}`, {
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
      }
    });
  
    if (!res.ok) {
      return null; // or throw an error
    }
  
    return res.json();
  }
  
export async function getExercisesByTherapist(therapistId: string) {
    const response = await fetch(`${BASE_URL}/api/exercises/therapist?therapist_id=${therapistId}`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch therapist exercises");
    }
    return response.json();
}

export async function uploadPDF(file: File): Promise<{ pdfURL: string }> {
    // 1. Request a pre-signed URL from your backend
    const presignRes = await fetch(`${BASE_URL}/api/exercise/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
      },
    });
    if (!presignRes.ok) {
      throw new Error("Failed to get pre-signed URL");
    }
    const { upload_url, pdf_url } = await presignRes.json();
  
    // 2. Upload the PDF file directly to S3 using the pre-signed URL
    const uploadRes = await fetch(upload_url, {
      method: "PUT",
      mode: "cors",
      body: file,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
    if (!uploadRes.ok) {
      throw new Error("Failed to upload PDF file");
    }
  
    return { pdfURL: pdf_url };
}
  
export async function createExercise(
    name: string,
    description: string,
    selectedTags: string[],
    isGlobal: boolean,
    pdfFile: string
): Promise<void> {
    try {
      // Create a FormData object to hold the fields and file
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      // You can send tags as a comma-separated string (or use multiple fields)
      formData.append("tags", selectedTags.map((t) => t.toLowerCase()).join(","));
      formData.append("is_global", isGlobal ? "true" : "false");
  
      // Append the PDF file only if it exists
      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }
  
      // Send the form data to your backend
      const res = await fetch(`${BASE_URL}/api/exercise`, {
        method: "POST",
        // Let the browser set the correct multipart boundary. (Don't set Content-Type manually.)
        headers: {
          "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
        },
        body: formData,
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`CreateExercise failed: ${errText}`);
      }
    } catch (error) {
      console.error("Error in createExercise:", error);
      throw error;
    }
}


export async function createPatientExercise({
    patientId,
    therapistId,
    exerciseIds,
}: {
    patientId: string;
    therapistId: string;
    exerciseIds: string[];
}) {
    const response = await fetch(`${BASE_URL}/api/patientexercise`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("peakspeak-token")}`,
        },
        body: JSON.stringify({
            "patient_id": patientId,
            "therapist_id": therapistId,
            "exercise_ids": exerciseIds,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create patient exercises");
    }
    return response.json();
}

export async function getPatientExercisesByUser(patientId: string) {
    const response = await fetch(`${BASE_URL}/api/patientexercises/${patientId}`, {
        headers: {
            "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch patient exercises");
    }
    return response.json();
}

export async function deletePatientExercise(id: string) {
    const response = await fetch(`${BASE_URL}/api/patientexercise/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("peakspeak-token")}`,
        },
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error("Failed to delete patient exercise");
    }
    return response.json();
}

// ExerciseService.ts

export async function deleteExercise(exerciseId: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/exercise/${exerciseId}`, {
        method: "DELETE",
        headers: {
        "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
        },
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Delete exercise failed: ${errText}`);
    }
}
  
  
