// File: pages/404.js

import Link from "next/link";
import Image from "next/image";
import logo from "/public/image/notFound.jpg";

const NotFound = () => {
  return (
    <div className="flex  mobile:flex-col tablet:flex-col laptop:flex-row justify-evenly items-center h-full">
      <Image
        src={logo}
        alt="123"
        className="mobile:w-[70vw] tablet:w-[40vw] laptop:w-[40vw] mt-5"
      />
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl mt-4 text-gray-800">PAGE NOT FOUND</h2>
        <div>
          <p className="text-lg text-gray-600 mt-2">
            We looked everywhere for this page.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Are you sure the website URL is correct?
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Get in touch with the site owner.
          </p>
        </div>
        <Link href="/">
          <div className="btn btn-xl w-full btn-primary">Go Back Home</div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
