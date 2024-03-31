import Image from "next/image";
import Navbar from "../../components/Navbar";
import BigNews from "../../components/BigNews";
import NewsList from "@/components/NewsList";

export default function Live() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Navbar />
      <div className="w-full flex flex-col items-center h-screen">
        <div className="h-[80px] w-full">
        </div>
        <div className="container font-bold flex flex-col h-full w-full px-5">
          <div className="">
            <p>Live Radio</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[200px] w-[600px] bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg shadow-2xl p-5 text-white">
              <p>NAMA RADIO</p>
            </div>
          </div>
        </div>

      </div>
      
      <div className="w-full bg-black flex justify-center pt-5">
        <div className="container px-5 flex w-full flex-col text-white">
          <p className="font-bold mb-8">Footer</p>
        </div>
      </div>

    </main>
  );
}
