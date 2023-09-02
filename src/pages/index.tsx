import NavBar from "@/components/NavBar";
import { PiBookBookmarkFill } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import prisma from "@/utils/prisma";
import { trpc } from "@/utils/trpc";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
  const router = useRouter();
  const { data: books } = trpc.getBooks.useQuery();
  return (
    <main className="flex flex-col gap-[4rem]">
      <NavBar />
      <section className="flex flex-col gap-6 px-10 py-5">
        <div className="flex items-center gap-4">
          <PiBookBookmarkFill color={`var(--clr-primary)`} size={"40px"} />
          <h1 className="text-[2.5rem] text-brand-primary font-bold">
            My Books
          </h1>
        </div>

        {books ? (
          <div className="flex flex-wrap gap-8 justify-evenly">
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            ))}
            <div
              className="flex flex-col w-[15%] min-w-[12rem] h-[40vh] gap-4 items-center justify-center border-dashed border-2 border-[#27378C] rounded-lg hover:cursor-pointer"
              onClick={() => router.push("/add")}
            >
              <AiOutlinePlus color={"var(--clr-primary)"} />
              <Link
                href="/add"
                className="text-brand-primary hover:underline hover:underline-offset-4"
              >
                Add a Book
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-evenly">
            {Array.from(Array(9).keys()).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const books = await prisma.book.findMany();
    return {
      props: { books },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { books: [] },
    };
  }
};
