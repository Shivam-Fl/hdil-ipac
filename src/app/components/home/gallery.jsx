import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Heading from "../heading"

export default function Gallery() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-6 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 ">
        {/* Left Section */}
        <div className="space-y-4 sm:space-y-8 mt-10">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Driving<br />growth together
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-4 max-w-full">
            {/* First Row */}
            {/* Industries Card */}
            <Card className="p-2 sm:p-4 flex flex-col justify-between text-center bg-white col-span-1 row-span-1">
              <p className="text-xs sm:text-sm text-gray-600">Industries</p>
              <p className="text-xl sm:text-3xl md:text-4xl font-bold mt-1">100+</p>
            </Card>

            {/* Sustainability Card */}
            <Card className="p-2 sm:p-4 relative overflow-hidden text-center col-span-1 row-span-1" 
              style={{backgroundImage: "url('/home/sustan.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
              <p className="text-xs sm:text-sm text-gray-600">Sustainability</p>
            </Card>

            {/* Members Card - Spanning 2 rows */}
            <Card className="p-2 sm:p-4 flex flex-col justify-between text-center bg-white col-span-1 row-span-2">
              <p className="text-xs sm:text-sm text-gray-600">Members</p>
              <p className="text-xl sm:text-3xl md:text-4xl font-bold mt-1">950+</p>
            </Card>

            {/* Second Row */}
            {/* Image 1 */}
            <Image
              src="/home/Rectangle 46.jpg"
              alt="Kitchen interior"
              width={400}
              height={300}
              className="rounded-xl object-cover w-full h-full col-span-1 row-span-1"
            />

            {/* Engagement Card */}
            <Card className="p-2 sm:p-4 flex flex-col justify-between text-center bg-white col-span-1 row-span-1">
              <p className="text-xs sm:text-sm text-gray-600">Engagement</p>
              <p className="text-xl sm:text-3xl md:text-4xl font-bold mt-1">{'>'}90</p>
            </Card>

            <div className="col-span-2 row-span-1 flex justify-start items-center gap-2 sm:gap-4">
              <Button variant="outline" className="rounded-full  max-sm:px-2 text-[0.7rem] sm:text-sm">
                View gallery
              </Button>
              <Button className="rounded-full bg-black text-white hover:bg-gray-800  max-sm:px-3 text-xs sm:text-sm">
                Know more <span className="max-sm:hidden">about us</span>
              </Button>
            </div>

            {/* Third Row */}
            {/* Image 2 - Starting at col 3 */}
            <Image
              src="/home/Rectangle 46.jpg"
              alt="Kitchen interior"
              width={400}
              height={300}
              className="rounded-xl object-cover w-full h-full col-start-3 col-end-4 row-span-1"
            />

            {/* Buttons - Occupying first two columns of third row */}
            
          </div>
        </div>

        {/* Right Section - Gallery */}
        <div className="relative mt-4 sm:mt-0">
          <div className="absolute flex items-center gap-x-2 sm:gap-x-4 top-0 right-0 text-[#340FE0] font-medium text-xs sm:text-base">
          <Heading heading={"Gallery and insights"} route={"/gallery"}/>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-12 sm:mt-16">
            <Image
              src="/home/Rectangle 44.png"
              alt="Kitchen interior"
              width={400}
              height={300}
              className="rounded-xl object-cover w-full h-24 sm:h-40 md:h-48"
            />
            
            <Image
              src="/home/Rectangle 43.png"
              alt="Bedroom interior"
              width={400}
              height={300}
              className="rounded-xl object-cover w-full h-24 sm:h-40 md:h-48"
            />
            
            <Image
              src="/home/Rectangle 38.png"
              alt="Workspace setup"
              width={600}
              height={400}
              className="rounded-xl object-cover w-full h-36 sm:h-56 md:h-64 col-span-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}