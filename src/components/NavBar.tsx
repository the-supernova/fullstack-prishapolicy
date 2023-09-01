import { RxAvatar } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between shadow-md px-10 py-5">
      <div>
        <Image
          src="/images/logo.jpg"
          width={150}
          height={25}
          alt="logo"
        />
      </div>
      <div className="flex gap-8 items-center">
        <Link
          href="/"
          className="text-[#27378C] hover:underline hover:underline-offset-4"
        >
          Home
        </Link>
        <Link
          href="/"
          className="text-[#27378C] hover:underline hover:underline-offset-4"
        >
          Favourites
        </Link>
      </div>
      <div className="flex items-center">
        <RxAvatar size={"25px"} />
        <RiArrowDropDownLine size={"25px"} />
      </div>
    </div>
  );
}
