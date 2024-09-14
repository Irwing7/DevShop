import Image from "next/image";
import React from "react";
import logoLight from "../../public/assets/logoLight.png";
import { Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <footer className="md:mt-12 mt-8">
      
      <Separator />
      <div className="mt-4 mx-4 md:mx-10">
        <div className="max-w-full px-4 sm:px-6 text-gray-800 dark:text-gray-300 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="p-5">
            <h3 className="font-bold text-2xl text-blue-500">DevShop</h3>
            {/* <Image src={logoLight} alt="DevShop" width={300} /> */}
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-blue-500 font-bold">
              Resources
            </div>
            <a className="my-3 block" href="/#">
              Documentation <span className="text-teal-600 text-xs p-1">Soon</span>
            </a>
            <a className="my-3 block" href="/#">
              Tutorials <span className="text-teal-600 text-xs p-1">Soon</span>
            </a>
            <a className="my-3 block" href="/#">
              Support <span className="text-teal-600 text-xs p-1">New</span>
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-blue-500 font-bold">
              Policies
            </div>
            <Link className="my-3 block" href="/terms-and-conditions">
              Terms and Conditions 
            </Link>
            <Link className="my-3 block" href={'/privacy-policy'}>
              Privacy Policy 
            </Link>
            <Link className="my-3 block" href="/refund-policy">
              Refund Policy 
            </Link>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-blue-500 font-bold">
              Contact us
            </div>
            <a className="my-3 block" href="mailto:21me01014@iitbbs.ac.in">
              Rahil Bhalothia
              <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="mailto:21me01014@iitbbs.ac.in">
            21me01014@iitbbs.ac.in
              <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 dark:text-gray-400 text-sm flex-col
      max-w-screen-lg items-center"
        >
          <div className="md:flex-auto md:flex-row-reverse gap-4 mt-2 flex-row flex">
            <a href="/#" className="w-6 mx-1">
            <Youtube />
            </a>
            <a href="" className="w-6 mx-1">
            <Linkedin />
            </a>
            <a href="/#" className="w-6 mx-1">
            <Instagram />
            </a>
            <a href="" className="w-6 mx-1">
            <Mail />
            </a>
          </div>
          <div className="my-5">© Copyright 2024. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
