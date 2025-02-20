import React, { useState } from "react";
import { EXERCISE_TAGS, ExerciseTag, TagView } from "@/components/ExerciseTags";
import { createExercise, uploadPDF } from "@/services/ExerciseService";
import Cookies from "js-cookie";

type CreateExerciseWizardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onExerciseCreated?: () => void;
};

export default function CreateExerciseWizardModal({
  isOpen,
  onClose,
  onExerciseCreated,
}: CreateExerciseWizardModalProps) {
  // Step-based state
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Common form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<ExerciseTag[]>([]);
  const [isGlobal, setIsGlobal] = useState(true);

  // PDF fields
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  // Move to next step
  function goNext() {
    // Example validation on Step 1
    if (currentStep === 1) {
      if (!name || !description || selectedTags.length === 0) {
        alert("Please fill out name, description, and at least one tag.");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  }

  // Move to previous step
  function goBack() {
    setCurrentStep((prev) => prev - 1);
  }

  // Cancel entire flow
  function handleCancel() {
    onClose();
    resetWizard();
  }

  // Reset fields if desired (optional)
  function resetWizard() {
    setCurrentStep(1);
    setName("");
    setDescription("");
    setSelectedTags([]);
    setIsGlobal(true);
    setPdfFile(null);
    setPdfUrl(null);
  }

  // Submit final data
  async function handleSubmit() {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exercise`, {
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
  
      // Handle successful creation (e.g., update UI, close modal)
      if (onExerciseCreated) onExerciseCreated();
      onClose();
      resetWizard();
    } catch (err) {
      alert(`Error creating exercise: ${err}`);
    }
  }
  

  // Handle PDF
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfUrl(URL.createObjectURL(file)); // For preview
    } else {
      setPdfFile(null);
      setPdfUrl(null);
      alert("Please select a valid PDF file.");
    }
  }

  // Toggle a tag
  function toggleTag(tag: ExerciseTag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={handleCancel} />

      <div className="relative z-10 bg-white p-6 rounded-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create Exercise (Step {currentStep})</h2>

        {/* STEP 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                className="w-full p-2 border rounded"
                placeholder="Exercise Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Exercise Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <span className="font-semibold mr-2">Visibility:</span>
              <label className="mr-4">
                <input
                  type="radio"
                  name="visibility"
                  checked={isGlobal}
                  onChange={() => setIsGlobal(true)}
                />
                {" Global "}
              </label>
              <label>
                <input
                  type="radio"
                  name="visibility"
                  checked={!isGlobal}
                  onChange={() => setIsGlobal(false)}
                />
                {" Private "}
              </label>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Tags</label>
              <div className="flex flex-wrap gap-2">
                {EXERCISE_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <TagView
                      key={tag}
                      tag={tag}
                      isSelected={isSelected}
                      isSelectable
                      onSelect={() => toggleTag(tag)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PDF Upload/Preview */}
        {currentStep === 2 && (
          <div>
            <label className="block mb-1 font-semibold">Upload PDF (optional)</label>
            <div className="flex items-center">
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
              {pdfFile && (
              <button
                onClick={() => {
                setPdfFile(null);
                setPdfUrl(null);
                }}
                className="ml-2 text-red-600 font-bold"
              >
                x
              </button>
              )}
            </div>
            {pdfUrl && (
              <div className="mt-2 border p-2 rounded max-h-64 overflow-auto">
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                style={{ width: "100%", height: "400px" }}
              />
              </div>
            )}
            
            <p className="text-sm text-gray-500 mt-2">
              You can skip uploading a PDF if you prefer. This is optional.
            </p>
          </div>
        )}

        {/* STEP 3: Confirm (Optional) */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="font-semibold">Review Your Entries:</p>
            <ul className="list-disc ml-5">
              <li>
                <strong>Name: </strong>
                {name}
              </li>
              <li>
                <strong>Description: </strong>
                {description}
              </li>
              <li>
                <strong>Visibility: </strong>
                {isGlobal ? "Global" : "Private"}
              </li>
              <li>
                <strong>Tags: </strong>
                {selectedTags.join(", ")}
              </li>
              <li>
                <strong>PDF: </strong>
                {pdfFile ? pdfFile.name : "No PDF uploaded"}
              </li>
            </ul>
            <p>Everything look good? Click &quot;Create&quot; below.</p>
          </div>
        )}

        {/* ACTION BUTTONS: Next / Back / Submit */}
        <div className="flex justify-end mt-4 space-x-2">
          {/* "Back" only shows if not on Step 1 */}
          {currentStep > 1 && (
            <button
              onClick={goBack}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Back
            </button>
          )}

          {/* "Next" shows if not on last step (in this example step 3 is last) */}
          {currentStep < 3 && (
            <button
              onClick={goNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}

          {/* "Create" on final step */}
          {currentStep === 3 && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
