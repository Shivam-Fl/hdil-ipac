const Heading = ({heading, route})=>{
    return(
        <div className="flex items-center space-x-2 mt-4 mb-2 max-w-5xl mx-auto">
                <div className=" w-10 md:w-16 border-t-2 border-black pointer-events-none"></div>
                <a
                    href={route}
                    className="text-black z-30  hover:text-blue-800 text-lg md:text-2xl font-medium transition duration-300"
                >
                    {heading}
                </a>
            </div>
    )
}

export default Heading;