const Contactus = () => {
    return(
        <>
         
        <div className="flex items-center space-x-2 mt-4 max-w-5xl mb-2 mx-auto">
                <div className="w-10 md:w-16 border-t-2 border-[#038860] pointer-events-none"></div>
                <a
                    href="/contact"
                    className="text-[#038860] z-30  hover:text-green-800 text-lg md:text-2xl font-medium transition duration-300"
                >
                    Contact Us
                </a>
            </div>
        <div className="relative rounded-lg max-w-5xl bg-[#61C4FC] mx-4 sm:mx-6 xl:mx-auto mb-10 flex flex-col items-center justify-center min-h-64" style={{backgroundImage: "url('/home/wavybg.svg')"}}>
            {/* <img className="w-full h-full" src="/home/wavybg.svg" alt="" /> */}
            
            <h2 className="absolute top-10 text-black text-lg sm:text-2xl lg:text-5xl  text-center font-bold">
                UNITED INDUSTRIES <br /> EMPOWERING PROGRESS
            </h2>
        <button className="absolute flex top-44 gap-x-2 bg-white rounded-lg p-1 text-black">Get in Touch <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
  <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="black"/>
</svg></button>
        </div>
        </>
    )
}

export default Contactus;