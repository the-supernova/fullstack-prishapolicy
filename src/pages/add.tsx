import DropZone from "@/components/DropZone";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";

export default function Add() {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log('bookcover', formData.get('bookcover'));
    console.log('title', formData.get('title'));
    console.log('author', formData.get('author'));
    console.log('readtime', formData.get('readtime'));
    console.log('details', formData.get('details'));
    console.log('dropzone-file', formData.get('dropzone-file'));
    e.currentTarget.reset();
  };
  return (
    <main className="flex flex-col gap-[4rem]">
      <NavBar />
      <section className="container mx-auto flex flex-col gap-6 px-10 py-5">
        <div>
          <button className="flex items-center gap-2 border-2 border-[#27378C] rounded-lg px-6 py-2">
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
              className="w-full flex flex-col gap-4 items-center justify-center border-dashed border-2 border-[#27378C] rounded-lg hover:cursor-pointer relative"
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
              className="hidden"
              onChange={({ target: { files } }) => {
                if (files) {
                    if (files.length) {
                        const reader = new FileReader();
                        reader.readAsDataURL(files[0]);
                        reader.onload = (e) => {
                        console.log("e.target.result", e.target?.result);
                        };
                        setSelectedFile(files[0]);
                    } else {
                        setSelectedFile(null);
                    }
                }
              }}
            />
          </div>

          <div className="w-[50%] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Name of the Book</label>
              <input
                type="text"
                id="title"
                name="title"
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
                  placeholder="Add all the authors comma separated"
                  className="border-2 focus:outline-[#27378C] rounded-md p-2"
                />
              </div>
              <div className="w-[50%] flex flex-col gap-2">
                <label htmlFor="readtime">Book read time</label>
                <input
                  type="text"
                  id="readtime"
                  name="readtime"
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
