import Image from "next/image";
import { useRouter } from "next/router";

type Props = {
  id: string;
  title: string;
  author: string;
  cover: string;
};

export default function BookCard({ id, title, author, cover }: Props) {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-[15%] cursor-pointer" onClick={() => router.push(`/book/${id}`)}>
        <div className="w-full h-[40vh] rounded-lg overflow-hidden">
          <Image
            width={250}
            height={400}
            src={cover}
            alt={'coverImage'}
            className="rounded-xl mb-2"
          />
        </div>
        <h2 className="text-[1.25rem] truncate italic font-bold">{title}</h2>
        <p className="text-[0.875rem] text-[#545454] truncate">{author}</p>
      </div>
    </>
  );
}
