import Modal from "@/components/Modal";
import NavBar from "@/components/NavBar";
import { appRouter } from "@/server/routers/_app";
import prisma from "@/utils/prisma";
import { trpc } from "@/utils/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiChevronLeft } from "react-icons/bi";

export default function Book({
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = trpc.getBook.useQuery(id);

  if (!data) {
    return <div>Loading...</div>;
  }
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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

        <div className="flex gap-8">
          <div className="w-[50%] h-[75vh] relative rounded-lg overflow-hidden">
            <Image
              src={data.cover}
              layout="fill"
              objectFit="cover"
              alt="bookcover"
            />
          </div>
          <div className="w-[50%] flex flex-col gap-4">
            <h1 className="text-[2.5rem] text-[#27378C] font-semibold">
              {data.title}
            </h1>
            <p className="text-[1.25rem]">{data.author}</p>
            <p className="text-[1.25rem]">
              Book Read Time: {data.readtime} Mins
            </p>
            <p>{data.description}</p>
            <button
              className="self-start rounded-lg px-4 py-2 bg-[#27378C] text-white"
              onClick={openModal}
            >
              Read This Book
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <embed
                width={"100%"}
                height={"100%"}
                type="application/pdf"
                src={data.pdf}
              />
            </Modal>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: books.map((book) => ({
      params: {
        id: book.id.toString(),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
  });
  const id = params?.id as string;

  await helpers.getBook.prefetch(id);

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
};
