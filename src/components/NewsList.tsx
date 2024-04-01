function NewsList() {
    return <>
        <div className="container px-5 flex w-full flex-col">
            <p className="font-bold mb-8">Berita</p>
            <div className="flex w-full">
                <div className="flex gap-x-6 max-w-full h-[300px]">
                    <div className="flex-1 cursor-pointer hover:mt-[-10px] transition-all">
                        <div className="bg-center bg-cover w-full h-36 rounded-lg shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                        <p className="font-bold text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et...</p>
                    </div>
                    <div className="flex-1 cursor-pointer hover:mt-[-10px] transition-all">
                        <div className="bg-center bg-cover w-full h-36 rounded-lg shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                        <p className="font-bold text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et...</p>
                    </div>
                    <div className="flex-1 hidden md:block cursor-pointer hover:mt-[-10px] transition-all ">
                        <div className="bg-center bg-cover w-full h-36 rounded lg shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                        <p className="font-bold text-md">Lorem ipsum dolor sit-amet, consectetur adipiscing elit.</p>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et...</p>
                    </div>
                    <div className="flex-1 hidden lg:block cursor-pointer hover:mt-[-10px] transition-all ">
                        <div className="bg-center bg-cover w-full h-36 rounded-lg shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                        <p className="font-bold text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et...</p>
                    </div>
                    <div className="flex-1 hidden xl:block cursor-pointer hover:mt-[-10px] transition-all ">
                        <div className="bg-center bg-cover w-full h-36 rounded-lg shadow-md mb-2" style={{ backgroundImage: "url(./thumb.jpeg)" }}></div>
                        <p className="font-bold text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget lacus congue, luctus tellus et...</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default NewsList;