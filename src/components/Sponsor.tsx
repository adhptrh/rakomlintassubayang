import Link from "next/link";

function Sponsor() {
    return <>
    
    <div className="container xl:px-32 px-4 flex w-full flex-col">
      <div className="flex bg-white rounded-2xl mt-8 p-4 pt-1 shadow-sm border-gray-200 border-[1px] justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <Link href="https://yapeka.or.id/"><img src="./yapeka.jpeg" className="w-[250px] mt-3 rounded-2xl"></img></Link>
          <div className="flex">
            <Link href="https://yapeka.or.id/"><img src="./sponsor.jpeg" className="w-[250px] rounded-2xl"></img></Link>
            <Link href="https://www.greenradioline.id/"><img src="https://www.greenradioline.id/frontend/images/logo.png" className="w-[100px] mb-3 mt-2 ml-1"></img></Link>
          </div>
        </div>
      </div>
    </div>
    </>
}

export default Sponsor;