import { Dispatch, DragEvent, SetStateAction, useState } from "react";

type Props = {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
};

export default function DropZone({ selectedFile, setSelectedFile }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLLabelElement> | DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      if (e.dataTransfer.files.length) {
        if (e.dataTransfer.files[0].size > 10 * 1024 * 1024) {
          alert("File size should be less than 10MB");
          return;
        }
        setSelectedFile(e.dataTransfer.files[0]);
      } else {
        setSelectedFile(null);
      }
    }
  }
  return (
    <div className="flex">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 p-12"
        onDragEnter={handleDrag}
      >
        <div className="flex flex-col items-center justify-center ">
          <svg
            className="w-8 h-8 mb-4 text-[#27378C]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          {!selectedFile ? (
            <>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold text-[#27378C] underline underline-offset-4">
                  Browse
                </span>{" "}
                or drop file here
              </p>
              <p className="text-xs text-gray-500">Supports: PDF; upto 10MB</p>
            </>
          ) : (
            <p className="mb-2 text-sm text-gray-500">{selectedFile.name}</p>
          )}
        </div>
        <input
          id="dropzone-file"
          name="dropzone-file"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files) {
              if (e.target.files.length) {
                if (e.target.files[0].size > 10 * 1024 * 1024) {
                  alert("File size should be less than 10MB");
                  return;
                }
                setSelectedFile(e.target.files[0]);
              } else {
                setSelectedFile(null);
              }
            }
          }}
          className="hidden"
        />
        {dragActive && <div className="absolute w-full h-full inset-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
      </label>
    </div>
  );
}
