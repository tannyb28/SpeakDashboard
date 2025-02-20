export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
}) {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />

      {/* Modal container: limit width to "max-w-sm" */}
      <div className="relative z-10 bg-white p-4 rounded-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Video Preview</h2>
        
        {/* Constrain height using "max-h-[80vh]" (or any desired value) */}
        <video
          src={videoUrl}
          controls
          className="w-full h-auto max-h-[80vh] object-contain rounded border"
        >
          Your browser does not support the video tag.
        </video>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}