// src/components/PatientsTable.tsx
import React from 'react';
import PersonIcon from "@mui/icons-material/Person";
import Link from 'next/link';
import { getPatient } from '@/services/PatientService';
import Image from 'next/image';


interface Patient {
  user_id: string;
  first_name: string;
  last_name: string;
  profile_image?: string | null;
  // ... other patient fields
}

type PatientsTableProps = {
  patients: Patient[];
};

export default function PatientsTable({ patients }: PatientsTableProps) {

  // const handleViewDetails = (patient: Patient) => {
  //   // Show patient details in console log using getPatient
  //   getPatient(patient.user_id)
  //     .then((data) => {
  //       console.log('Patient Details:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching patient details:', error);
  //     });
  // }

  return (
    <table className="w-full bg-light border rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-3 px-4 border-b text-left font-semibold">Name</th>
          <th className="py-3 px-4 border-b text-left font-semibold"></th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.user_id} className="hover:bg-gray-50">
            <td className="flex flex-row items-center py-3 px-4">
              {patient.profile_image ? (
                <Image
                src={patient.profile_image}
                alt="Profile"
                className="w-8 h-8 mr-3 rounded-full object-cover"
                width={32}
                height={32}
                />
              ) : (
                <PersonIcon className="w-8 h-8 mr-3 text-gray-400" />
              )}
              {patient.first_name} {patient.last_name}
            </td>
            <td className="py-3 px-4 border-b">
              <Link href={`dashboard/patients/${patient.user_id}`}>
                <button
                  className="bg-blu px-3 py-1 rounded-md border-2 border-gray-300
                             hover:bg-gray-300 hover:border-gray-500 transition-colors"
                  // onClick={() => handleViewDetails(patient)}
                >
                  View Details
                </button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
