import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="w-full h-1 bg-custom-blue-sky"></div>
      <div className="shadow-sm w-full fixed flex bg-white justify-center pb-5">
        <div className="container px-5">
          <div className="w-full mt-5 h-10 flex">
            <img src="./logo.png" width={100}></img>
            <div className="w-[1px] h-full ml-16 bg-black"></div>
            <a href="#" className="md:flex hidden h-full ml-10 font-bold text-custom-blue-sky border-custom-blue-sky border-b-2 flex items-center">BERANDA</a>
            <a href="$" className="md:flex hidden h-full ml-10 font-bold text-slate-400 flex items-center">KHABAR DESA</a>
            <div className="flex-1 justify-end flex">
              <a href="#" className="h-full font-bold text-red-500 border-2 border-red-500 flex items-center px-8">LIVE RADIO</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
