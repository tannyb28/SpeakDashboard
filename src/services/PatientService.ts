// src/services/PatientService.ts
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getPatients(therapistId: string) {
  const response = await fetch(`${BASE_URL}/api/patients`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Cookies.get("peakspeak-token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
}

export async function getPatient(patientId: string) {
  const token = Cookies.get("peakspeak-token");
  console.log(token);
  const response = await fetch(`${BASE_URL}/api/user/${patientId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch patient");
  }
  return response.json();
}
  