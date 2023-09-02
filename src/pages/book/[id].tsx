import Modal from "@/components/Modal";
import NavBar from "@/components/NavBar";
import { appRouter } from "@/server/routers/_app";
import getTime from "@/utils/getTime";
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
            className="flex items-center gap-2 border-2 border-brand-primary rounded-lg px-6 py-2"
            onClick={() => router.push("/")}
          >
            <BiChevronLeft />
            <p className="text-brand-primary hover:underline hover:underline-offset-4">
              Back to Home
            </p>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-[30vw] min-w-[18rem] h-[75vh] relative rounded-lg overflow-hidden">
            <Image
              src={data.cover}
              layout="fill"
              objectFit="cover"
              alt="bookcover"
            />
          </div>
          <div className="sm:w-[50%] flex flex-col gap-4">
            <h1 className="text-[2.5rem] text-brand-primary font-semibold">
              {data.title}
            </h1>
            <div>
              <p className="text-[1.25rem] text-brand-secondary">{data.author}</p>
              <p className="text-[1.25rem] text-brand-secondary">
                Book Read Time: {getTime(data.readtime)}
              </p>
            </div>
            <p>{data.description}</p>
            <button
              className="self-start rounded-lg px-4 py-2 bg-brand-primary text-white"
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
