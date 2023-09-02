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
      <div className="flex flex-col gap-2 w-[15%] min-w-[12rem] cursor-pointer" onClick={() => router.push(`/book/${id}`)}>
        <div className="w-full h-[40vh] rounded-lg overflow-hidden relative">
          <Image
            layout="fill"
            objectFit="cover"
            src={cover}
            alt={'coverImage'}
            className="rounded-xl mb-2"
          />
        </div>
        <div>
          <h2 className="text-[1.25rem] truncate italic font-bold">{title}</h2>
          <p className="text-[0.875rem] text-brand-secondary truncate">{author}</p>
        </div>
      </div>
    </>
  );
}
