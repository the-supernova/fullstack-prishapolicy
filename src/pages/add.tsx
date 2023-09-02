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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [error, setError] = useState("");
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

  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      if (e.dataTransfer.files.length) {
        setSelectedImageFile(e.dataTransfer.files[0]);
      } else {
        setSelectedImageFile(null);
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

    const fileData = {
      cover: selectedImageFile as File,
      pdf: selectedPdfFile as File,
    }
    if (!fileData.cover) {
      setError("Please upload a book cover");
      return;
    } else if (!fileData.pdf) {
      setError("Please upload a book pdf");
      return;
    }
    setError("")
    const imageData = new FormData();
    imageData.append("file", fileData.cover);
    imageData.append("upload_preset", "bookData");

    const pdfData = new FormData();
    pdfData.append("file", fileData.pdf);
    pdfData.append("upload_preset", "bookData");

    addBookMutation.mutate(bookData, {
      onSuccess: async (data) => {
        let imageURL, fileURL;
        let uploadFileApiResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dxkgx5g5i/auto/upload",
          pdfData
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
    setSelectedImageFile(null);
    setSelectedPdfFile(null);
    e.currentTarget.reset();
  };
  return (
    <main className="flex flex-col gap-[4rem]">
      <NavBar />
      <section className="container mx-auto flex flex-col gap-6 px-10 py-5">
        <div>
          <button
            className="flex items-center gap-2 border-2 border-brand-primary rounded-lg px-6 py-2"
            onClick={() => router.push("/")}
          >
            <BiChevronLeft />
            <p className="text-brand-primary hover:underline hover:underline-offset-4">
              Back to Home
            </p>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-[30vw] min-w-[18rem] flex">
            <label
              htmlFor="bookcover"
              className="w-full flex flex-col py-4 gap-4 items-center justify-center border-dashed border-2 border-brand-primary rounded-lg hover:cursor-pointer relative overflow-hidden"
              onDragEnter={handleDrag}
            >
              {!selectedImageFile ? (
                <>
                  <AiOutlinePlus color={"var(--clr-primary)"} />
                  <p className="text-brand-primary font-medium hover:underline hover:underline-offset-4">
                    Add a Book Cover
                  </p>
                </>
              ) : (
                <Image
                  src={URL.createObjectURL(selectedImageFile)}
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
              onChange={({ target: { files } }) => {
                if (files) {
                  if (files.length) {
                    setSelectedImageFile(files[0]);
                  } else {
                    setSelectedImageFile(null);
                  }
                }
              }}
            />
            {dragActive && <div className="absolute w-full h-full inset-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleImageDrop}></div>}
          </div>

          <div className="sm:w-[50%] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-medium">Name of the Book<span className="text-red-600"> *</span></label>
              <input
                type="text"
                id="title"
                name="title"
                maxLength={200}
                required
                placeholder="Enter the published name"
                className="border-2 focus:outline-brand-primary rounded-md p-2"
              />
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="md:w-[50%] flex flex-col gap-2">
                <label htmlFor="author" className="font-medium">Author of the Book<span className="text-red-600"> *</span></label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  maxLength={200}
                  required
                  placeholder="Add all the authors comma separated"
                  className="border-2 focus:outline-brand-primary rounded-md p-2"
                />
              </div>
              <div className="md:w-[50%] flex flex-col gap-2">
                <label htmlFor="readtime" className="font-medium">Book read time<span className="text-red-600"> *</span></label>
                <input
                  type="number"
                  min={0}
                  id="readtime"
                  name="readtime"
                  required
                  placeholder="Add time in mins"
                  className="border-2 focus:outline-brand-primary rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="details" className="font-medium">Book Details<span className="text-red-600"> *</span></label>
              <textarea
                id="details"
                name="details"
                required
                rows={5}
                maxLength={2000}
                placeholder="Should not be more than 300 words"
                className="border-2 focus:outline-brand-primary rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="upload" className="font-medium">Upload PDF<span className="text-red-600"> *</span></label>
              <DropZone
                selectedFile={selectedPdfFile}
                setSelectedFile={setSelectedPdfFile}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="rounded-lg px-4 py-2 bg-brand-primary text-white font-medium"
              >
                Add book
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
