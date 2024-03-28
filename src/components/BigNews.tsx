export default function() {
    return <>
    <div className="container px-5 flex w-full flex-col">
        <img src="./logo2.png" className="my-2 max-w-[500px]"></img>
        <p className="font-bold mb-3">Berita</p>
        <div className="w-full gap-x-2 flex mb-3 h-[300px] md:h-[450px] xl:h-[600px]">
          <div className="flex-1 h-full">
            <div className="relative w-full bg-black h-full rounded-lg bg-center bg-cover shadow-lg flex flex-col justify-end" style={{backgroundImage: "url(./thumb.jpeg)"}}>
              <div className="h-32 z-10 rounded-lg absolute w-full bg-black opacity-70 border-t-2 border-custom-blue-sky text-white font-bold text-2xl">
              </div>  
              <div className="h-32 z-10 p-5 border-t-2 border-custom-blue-sky text-white font-bold text-xl md:text-2xl">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et sapien orci.</p>
              </div>  
            </div>
          </div>
          <div className="flex-none flex flex-col gap-y-2 w-0 lg:w-72 xl:w-96 h-full">
            <div className="flex-1 bg-black">

            </div>
            <div className="flex-1 bg-black">

            </div>
            <div className="flex-1 bg-black">

            </div>
          </div>
        </div>
      </div>
    </>
}