import { RxAvatar } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`flex ${menuOpen ? 'flex-col gap-4' : ''} items-center justify-between shadow-md px-10 py-5`}>
      <div>
        <Image src="/images/logo.jpg" width={150} height={25} alt="logo" />
      </div>
      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {!menuOpen? (<RxHamburgerMenu size={"25px"} />) : (<RxCross1 size={"25px"} />)}
        </button>
      </div>
      {menuOpen && (
        <div className="flex flex-col gap-8 items-center">
          <Link
            href="/"
            className="text-brand-primary hover:underline hover:underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-brand-primary hover:underline hover:underline-offset-4"
          >
            Favourites
          </Link>
          <Link
            href="/"
            className="text-brand-primary hover:underline hover:underline-offset-4"
          >
            Account
          </Link>
        </div>
      )}
      <div className="hidden sm:flex gap-8 items-center">
        <Link
          href="/"
          className="text-brand-primary hover:underline hover:underline-offset-4"
        >
          Home
        </Link>
        <Link
          href="/"
          className="text-brand-primary hover:underline hover:underline-offset-4"
        >
          Favourites
        </Link>
      </div>
      <div className="hidden sm:flex items-center">
        <RxAvatar size={"25px"} />
        <RiArrowDropDownLine size={"25px"} />
      </div>
    </div>
  );
}
