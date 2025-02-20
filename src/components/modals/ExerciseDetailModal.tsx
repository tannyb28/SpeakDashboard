// src/components/ExerciseDetailModal.tsx
import React, { useState, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteExercise } from "@/services/ExerciseService";
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};
const maxWidth = 800;

interface ExerciseDetailModalProps {
  exercise: {
    exercise_id: string;
    name: string;
    description: string;
    tags: string[];
    pdf_url?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onExerciseDeleted?: () => void;
}

export default function ExerciseDetailModal({
  exercise,
  isOpen,
  onClose,
  onExerciseDeleted,
}: ExerciseDetailModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(maxWidth);

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }): void {
    setNumPages(nextNumPages);
    setCurrentPage(1);
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this exercise?")) {
      return;
    }
    if (!exercise) {
      alert("Invalid exercise ID");
      return;
    }
    try {
      await deleteExercise(exercise.exercise_id);
      if (onExerciseDeleted) {
        onExerciseDeleted();
      }
      onClose();
    } catch (error: any) {
      alert(`Failed to delete exercise: ${error.message}`);
    }
  }

  if (!isOpen || !exercise) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-md shadow-lg p-6 max-w-xl w-full overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{exercise.name}</h2>
          {/* Delete Button */}
          <button
            onClick={() => handleDelete}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Delete Exercise"
          >
            <DeleteIcon />
          </button>
        </div>

        <p className="mb-4">
          <span className="font-semibold">Description:</span> {exercise.description}
        </p>

        <div className="mb-4">
          <span className="font-semibold">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {exercise.tags?.length ? (
              exercise.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="italic text-sm">No tags</span>
            )}
          </div>
        </div>

        {/* PDF Viewer Section using react-pdf with page navigation */}
        {exercise.pdf_url ? (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">PDF Preview:</h3>
            <div ref={setContainerRef} className="w-full">
              <Document
                file={exercise.pdf_url}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                loading={<p>Loading PDF...</p>}
                error={<p>Failed to load PDF.</p>}
              >
                <Page
                  pageNumber={currentPage}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
              </Document>
              {numPages > 0 && (
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage <= 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <p>
                    Page {currentPage} of {numPages}
                  </p>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages))}
                    disabled={currentPage >= numPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <span className="italic text-sm">No PDF available</span>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
