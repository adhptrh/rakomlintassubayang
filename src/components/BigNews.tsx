function BigNews() {
    return <>
    <div className="container px-5 flex w-full flex-col">
        <img src="./logo2.png" className="my-2 max-w-[500px]"></img>
        <p className="font-bold mb-5">Berita</p>
        <div className="w-full gap-x-6 flex mb-3 h-[300px] md:h-[450px] xl:h-[600px]">
          <div className="flex-1 h-full">
            <div className="relative w-full bg-black h-full cursor-pointer hover:mt-[-10px] transition-all rounded-lg bg-center bg-cover shadow-2xl flex flex-col justify-end" style={{backgroundImage: "url(./thumb.jpeg)"}}>
              <div className="h-32 z-10 rounded-lg absolute w-full bg-black opacity-70 border-t-2 border-custom-blue-sky text-white font-bold text-2xl">
              </div>  
              <div className="h-32 z-20 p-5 border-t-2 border-custom-blue-sky text-white font-bold text-xl md:text-2xl">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et sapien orci.</p>
              </div>  
            </div>
          </div>
          <div className="flex-none flex-col gap-y-6 hidden w-0 lg:flex lg:w-72 xl:w-96 h-full">
            <div className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-lg shadow-md cursor-pointer" style={{backgroundImage: "url(./thumb.jpeg)"}}>
              <div className="absolute z-10 h-16 z-10 p-2 w-full border-t-2 bg-black opacity-70 border-custom-blue-sky text-white font-bold text-xl md:text-xs rounded-lg"></div>  
              <div className="h-16 z-20 p-2 border-t-2 border-custom-blue-sky w-full text-white font-bold lg:text-xs xl:text-sm rounded-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et sapien orci.</p>
              </div>  
            </div>
            <div className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-lg shadow-md cursor-pointer" style={{backgroundImage: "url(./thumb.jpeg)"}}>
              <div className="absolute z-10 h-16 z-10 p-2 w-full border-t-2 bg-black opacity-70 border-custom-blue-sky text-white font-bold text-xl md:text-xs rounded-lg"></div>  
              <div className="h-16 z-20 p-2 border-t-2 border-custom-blue-sky w-full text-white font-bold lg:text-xs xl:text-sm rounded-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et sapien orci.</p>
              </div>  
            </div>
            <div className="flex-1 flex flex-col relative flex justify-end bg-center bg-cover rounded-lg shadow-md cursor-pointer" style={{backgroundImage: "url(./thumb.jpeg)"}}>
              <div className="absolute z-10 h-16 z-10 p-2 w-full border-t-2 bg-black opacity-70 border-custom-blue-sky text-white font-bold text-xl md:text-xs rounded-lg"></div>  
              <div className="h-16 z-20 p-2 border-t-2 border-custom-blue-sky w-full.
              3 text-white font-bold lg:text-xs xl:text-sm rounded-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et sapien orci.</p>
              </div>  
            </div>
          </div>
        </div>
      </div>
    </>
}

export default BigNews;