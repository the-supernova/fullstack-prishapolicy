import NavBar from "@/components/NavBar";
import { PiBookBookmarkFill } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import prisma from "@/utils/prisma";
import { trpc } from "@/utils/trpc";


export default function Home() {
  const router = useRouter();
  const { data: books } = trpc.getBooks.useQuery();
  return (
    <main className="flex flex-col gap-[4rem]">
      <NavBar />
      <section className="flex flex-col gap-6 px-10 py-5">
        <div className="flex items-center gap-4">
          <PiBookBookmarkFill color={"#27378C"} size={"40px"} />
          <h1 className="text-[2.5rem] text-[#27378C] font-bold">My Books</h1>
        </div>

        {books ? (<div className="flex flex-wrap gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
            />
          ))}
          <div className="flex flex-col w-[15%] h-[400px] gap-4 items-center justify-center border-dashed border-2 border-[#27378C] rounded-lg hover:cursor-pointer" onClick={() => router.push('/add')}>
            <AiOutlinePlus color={"#27378C"} />
            <Link
              href="/add"
              className="text-[#27378C] hover:underline hover:underline-offset-4"
            >
              Add a Book
            </Link>
          </div>
        </div>) : (<div>Loading...</div>)}
      </section>
    </main>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const books = await prisma.book.findMany();
//   return {
//     props: { books }
//   }
// }
