import { Dispatch, SetStateAction } from "react";

type Props = {
    selectedFile: string;
    setSelectedFile: Dispatch<SetStateAction<string>>;
}

export default function DropZone({ selectedFile, setSelectedFile }: Props) {
    return (
        <div className="flex">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 p-12"
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
                    {selectedFile === "" ? (
                      <>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold text-[#27378C] underline underline-offset-4">
                            Browse
                          </span>{" "}
                          or drop file here
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports: PDF; upto 10MB
                        </p>
                      </>
                    ) : (
                      <p className="mb-2 text-sm text-gray-500">
                        {selectedFile}
                      </p>
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
                            setSelectedFile(e.target.files[0].name);
                        } else {
                            setSelectedFile("");
                        }
                      }
                    }
                    }
                    className="hidden"
                  />
                </label>
              </div>
    )
}
