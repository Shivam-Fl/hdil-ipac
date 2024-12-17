const IPAC = () => {
    return (
        <>
            <div className="flex items-center space-x-2 mt-4 mb-2 max-w-5xl mx-auto">
                <div className=" w-10 md:w-16 border-t-2 border-[#3D9AD6] pointer-events-none"></div>
                <a
                    href="/about"
                    className="text-[#3D9AD6] z-30  hover:text-blue-800 text-lg md:text-2xl font-medium transition duration-300"
                >
                    About Us
                </a>
            </div>
            <div className="relative w-full  bg-[#075F98]">

                {/* Background Image */}
                <div className="max-w-5xl relative mx-auto flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://api.placeholder.com/1920x1080')",
                            opacity: 0.7,
                        }}
                    ></div>

                    {/* Overlay Text */}
                    <div className="relative flex flex-col w-full px-4 gap-y-0 text-white">
                        {/* Top Section */}
                        <div className="flex justify-between font-[Montserrat] text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold  sm:px-4 md:px-8 pt-6">
                            <span>HDIL</span>
                            <span>VIRAR</span>
                        </div>

                        {/* Center Text with Mask */}
                        <div className="relative flex justify-center font-bold uppercase w-full">
                            <div
                                className="text-transparent font-bevan bg-clip-text text-[6rem] sm:text-[12rem] md:text-[15rem] lg:text-[18rem] xl:text-[20em] leading-none"
                                style={{
                                    backgroundImage: "url('/home/about.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                IPCA
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="p-4 sm:p-6 md:p-8 bg-white max-w-5xl mx-auto mt-4">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-baseline text-black space-grotesk">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl text-center sm:text-left sm:basis-3/5 font-bold mb-4 sm:mb-0">
          CRAFTING UNIQUE SPACES
        </h1>
        <h2 className="sm:text-sm md:text-lg sm:basis-2/5 font-light sm:relative sm:top-10 lg:top-16 text-center sm:text-left">
          Fostering Collaborative Growth
        </h2> 
      </div>

      <p className="mt-4 text-gray-700 text-justify text-base sm:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et dictum suscipit, lectus nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div></>

    )
}

export default IPAC;