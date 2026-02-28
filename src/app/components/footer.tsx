import React from "react";
import Link from "next/link";
import { Mail, Phone, Film } from "lucide-react";

type Sns = {
  label: string;
};
export const Footer = () => {
  const snss: Sns[] = [
    { label: "Facebook" },
    { label: "Instagram" },
    { label: "Twitter" },
    { label: "Youtube" },
  ];

  return (
    <footer className="pt-12">
      <div className=" w-full flex sm:flex-row flex-col justify-between m-auto sm:h-70 h-77 py-10 sm:px-20 px-5 bg-indigo-700 text-[#FAFAFA] text-sm leading-5">
        <div>
          <Link
            className="flex gap-2 italic font-bold items-center mb-3"
            href="/"
          >
            <Film size={20} /> Movie Z
          </Link>
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex sm:gap-24 justify-between">
          <div className="flex flex-col gap-3">
            Contact Information
            <div className="flex gap-3 items-center">
              <Mail size={16} />
              <div>
                <p className="font-medium">Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex gap-3 items-center mt-3">
              <Phone size={16} />
              <div>
                <p className="font-medium">Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:w-auto w-28.25">
            Follow us
            <p className="flex sm:flex-row flex-col gap-3">
              {snss.map((sns) => (
                <Link key={sns.label} href="/" className="font-medium">
                  {sns.label}
                </Link>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
