const Hero = () => {
    return (
        <div className=" hero   text-black" style={{backgroundImage: "url('/home/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="flex justify-center items-center flex-col montserrat pb-[13rem] sm:pb-[19rem] lg:pb-[21rem]">
            <h1 className="text-center montserrat-subrayada-bold text-[5rem] sm:text-[8rem] md:text-[12rem] mt-8 font-bold leading-none">IPCA</h1>
            <p className="text-center px-2 text-lg sm:text-xl md:text-2xl">A Hub of Excellence, Crafting Tomorrow’s Success</p>
            <button className="flex p-1 px-2 mt-2 border border-black rounded-full">Explore Projects <span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
  <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="black"/>
</svg></span></button>
            </div>
           
        </div>
    );
}

export default Hero;