import DropZone from "@/components/DropZone";
import NavBar from "@/components/NavBar";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { DragEvent, FormEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";

export default function Add() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const addBookMutation = trpc.postBookData.useMutation();
  const updateBookMutation = trpc.updateWithFiles.useMutation();

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
        setSelectedFile(e.dataTransfer.files[0]);
      } else {
        setSelectedFile(null);
      }
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const bookData = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      readtime: Number(formData.get("readtime")),
      description: formData.get("details") as string,
    };

    const imageData = new FormData();
    imageData.append("file", formData.get("bookcover") as File);
    imageData.append("upload_preset", "bookData");

    const fileData = new FormData();
    fileData.append("file", formData.get("dropzone-file") as File);
    fileData.append("upload_preset", "bookData");

    addBookMutation.mutate(bookData, {
      onSuccess: async (data) => {
        let imageURL, fileURL;
        let uploadFileApiResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dxkgx5g5i/auto/upload",
          fileData
        );

        if (!uploadFileApiResponse.data) {
          console.log("Error uploading filedata", uploadFileApiResponse);
          return;
        }
        fileURL = uploadFileApiResponse.data.secure_url;

        let uploadImageApiResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dxkgx5g5i/image/upload",
          imageData
        );
        if (!uploadImageApiResponse.data) {
          console.log("Error uploading imagedata", uploadImageApiResponse);
          return;
        }
        imageURL = uploadImageApiResponse.data.secure_url;
        updateBookMutation.mutate(
          { id: data.id, cover: imageURL, pdf: fileURL },
          {
            onSuccess: () => {
              router.push("/");
            },
            onError: (error) => {
              console.log("Error uploading filedata", error);
            },
          }
        );
      },
      onError: (error) => {
        console.log("error", error);
      },
    });

    e.currentTarget.reset();
  };
  return (
    <main className="flex flex-col gap-[4rem]">
      <NavBar />
      <section className="container mx-auto flex flex-col gap-6 px-10 py-5">
        <div>
          <button
            className="flex items-center gap-2 border-2 border-[#27378C] rounded-lg px-6 py-2"
            onClick={() => router.push("/")}
          >
            <BiChevronLeft />
            <p className="text-[#27378C] hover:underline hover:underline-offset-4">
              Back to Home
            </p>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-8">
          <div className="w-[50%] flex">
            <label
              htmlFor="bookcover"
              className="w-full flex flex-col gap-4 items-center justify-center border-dashed border-2 border-[#27378C] rounded-lg hover:cursor-pointer relative overflow-hidden"
              onDragEnter={handleDrag}
            >
              {!selectedFile ? (
                <>
                  <AiOutlinePlus color={"#27378C"} />
                  <p className="text-[#27378C] hover:underline hover:underline-offset-4">
                    Add a Book Cover
                  </p>
                </>
              ) : (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  layout="fill"
                  objectFit="cover"
                  alt="book cover"
                />
              )}
            </label>
            <input
              type="file"
              id="bookcover"
              name="bookcover"
              accept="image/*"
              className="hidden"
              required
              onChange={({ target: { files } }) => {
                if (files) {
                  if (files.length) {
                    setSelectedFile(files[0]);
                  } else {
                    setSelectedFile(null);
                  }
                }
              }}
            />
            {dragActive && <div className="absolute w-full h-full inset-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
          </div>

          <div className="w-[50%] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Name of the Book</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Enter the published name"
                className="border-2 focus:outline-[#27378C] rounded-md p-2"
              />
            </div>
            <div className="w-full flex gap-4">
              <div className="w-[50%] flex flex-col gap-2">
                <label htmlFor="author">Author of the Book</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  required
                  placeholder="Add all the authors comma separated"
                  className="border-2 focus:outline-[#27378C] rounded-md p-2"
                />
              </div>
              <div className="w-[50%] flex flex-col gap-2">
                <label htmlFor="readtime">Book read time</label>
                <input
                  type="number"
                  id="readtime"
                  name="readtime"
                  required
                  placeholder="Add time in mins"
                  className="border-2 focus:outline-[#27378C] rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="details">Book Details</label>
              <textarea
                id="details"
                name="details"
                required
                rows={5}
                placeholder="Should not be more than 300 words"
                className="border-2 focus:outline-[#27378C] rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="upload">Upload PDF</label>
              <DropZone
                selectedFile={selectedFileName}
                setSelectedFile={setSelectedFileName}
              />
            </div>
            <div>
              <button
                type="submit"
                className="rounded-lg px-4 py-2 bg-[#27378C] text-white"
              >
                Add book
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
