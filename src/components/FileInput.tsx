import React, { useEffect, useState, useRef } from "react";
import { FiUploadCloud, FiFile, FiImage, FiXCircle } from "react-icons/fi";

interface FileInputProps {
  label?: string;
  initialFileUrl?: string;
  onFileChange: (file: File | null) => void;
  accept?: string;
  errorMessage?: string;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  initialFileUrl,
  onFileChange,
  accept = "image/*",
  errorMessage,
  className,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    initialFileUrl
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi helper untuk menentukan apakah URL adalah gambar
  const checkIfUrlIsImage = (url?: string): boolean => {
    if (!url || typeof url !== "string") {
      return false;
    }
    // Cek berdasarkan data URL atau ekstensi file
    return (
      url.startsWith("data:image/") ||
      !!url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)
    );
  };

  const [isFileAnImage, setIsFileAnImage] = useState<boolean>(
    checkIfUrlIsImage(initialFileUrl)
  );

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setIsFileAnImage(file.type.startsWith("image/"));
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(initialFileUrl);
      // Panggil fungsi helper yang aman
      setIsFileAnImage(checkIfUrlIsImage(initialFileUrl));
    }
  }, [file, initialFileUrl]); // Tambahkan initialFileUrl ke dependency array

  const handleFileSelection = (selectedFile: File | null) => {
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    handleFileSelection(selected || null);
    e.stopPropagation();
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(undefined);
    setIsFileAnImage(false); // Reset ini secara eksplisit
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileChange(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile || null);
  };

  const handleDivMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !previewUrl) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {previewUrl ? (
        <div className="relative w-32 h-32 rounded overflow-hidden border shadow group flex items-center justify-center bg-gray-100">
          {isFileAnImage ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 text-sm p-2 text-center">
              <FiFile className="size-8 mb-1" />
              {/* Tampilkan nama file atau teks default jika 'file' belum ada */}
              <span className="break-all px-1 line-clamp-3">
                {file?.name ||
                  previewUrl.split("/").pop()?.split("?")[0] ||
                  "File Preview"}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute inset-0 bg-black bg-opacity-50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <FiXCircle className="size-4 mr-1" /> Hapus
          </button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onMouseDown={handleDivMouseDown}
        >
          <input
            type="file"
            id={`file-upload-${label?.replace(/\s/g, "-") || "default"}`}
            name={`fileUpload-${label?.replace(/\s/g, "-") || "default"}`}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={accept}
            onChange={handleChange}
            ref={fileInputRef}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="space-y-1 text-gray-600">
            <div className="mx-auto mb-3 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 border-gray-25 border-4 text-gray-600">
              <FiUploadCloud className="size-7" />
            </div>
            <p className="text-primary">
              Click to upload{" "}
              <span className="text-gray-600">or drag and drop</span>
            </p>
            <p className="text-sm">
              {accept === "image/*"
                ? "Only image files allowed"
                : `Accepted: ${accept.split(",").join(", ")}`}
            </p>
          </div>
        </div>
      )}
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default FileInput;
