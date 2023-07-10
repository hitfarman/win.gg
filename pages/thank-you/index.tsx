import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const ThankYouPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-5 pb-5 text-center">
        <CheckCircleIcon className="h-10 w-10 text-win-primary" />
        <h1 className="font-header text-4xl font-semibold">
          Thank you for your application!
        </h1>
        <h2 className="font-header text-2xl font-semibold">
          I will review your message and reply soon.
        </h2>
        <Link href="/" className="win-primary-button">
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
