import Image from "next/image";

type Props = {
  title: string;
  author: string;
  coverImage: string;
};

export default function BookCard({ title, author, coverImage }: Props) {
  return (
    <>
      <div className="flex flex-col w-[15%]">
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            width={250}
            height={400}
            src={`/images/${coverImage}`}
            alt={coverImage}
            className="rounded-xl mb-2"
          />
        </div>
        <h2 className="text-[1.25rem] truncate italic font-bold">{title}</h2>
        <p className="text-[0.875rem] text-[#545454] truncate">{author}</p>
      </div>
    </>
  );
}
