import Image from "next/image";
import Navbar from "../components/Navbar";
import BigNews from "../components/BigNews";
import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar />
      <div className="w-full h-[80px]"></div>
      <BigNews />
      <div className="mb-10"></div>

      <NewsList />
      <div className="mb-10"></div>
      <NewsList />
      <div className="mb-10"></div>

      
      <div className="w-full bg-black flex justify-center pt-5">
        <div className="container px-5 flex w-full flex-col text-white">
          <p className="font-bold mb-8">Footer</p>
        </div>
      </div>

    </main>
  );
}
