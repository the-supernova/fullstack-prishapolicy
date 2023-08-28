import NavBar from "@/components/NavBar";
import { PiBookBookmarkFill } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import { bookData } from "@/utils/bookData";
import BookCard from "@/components/BookCard";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-[4rem]">
      <NavBar />
      <section className="flex flex-col gap-6 px-10 py-5">
        <div className="flex items-center gap-4">
          <PiBookBookmarkFill color={"#27378C"} size={"40px"} />
          <h1 className="text-[2.5rem] text-[#27378C] font-bold">My Books</h1>
        </div>

        <div className="flex flex-wrap gap-8">
          {bookData.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
            />
          ))}
          <div className="flex flex-col w-[15%] h-[400px] gap-4 items-center justify-center border-dashed border-2 border-[#27378C] rounded-lg hover:cursor-pointer">
            <AiOutlinePlus color={"#27378C"} />
            <Link
              href="/"
              className="text-[#27378C] hover:underline hover:underline-offset-4"
            >
              Add a Book
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
