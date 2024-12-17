import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function Gallery() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-8">
          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight">
            Driving<br />growth together
          </h1>

          {/* Stats Grid */}
          <div className="flex flex-wrap gap-4 mx-auto font-[20px] max-w-[47em] ">
            {/* Industries Card */}
            <Card className="p-6 flex flex-col justify-between h-[13em] w-[8em] bg-white">
              <p className="text-gray-600">Industries associated</p>
              <p className="text-4xl font-bold mt-2">100+</p>
            </Card>

            

            {/* Sustainability Card */}
            <Card className="p-6 relative overflow-hidden h-[13em] w-[11em]" style={{backgroundImage: "url('/home/sustan.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
              <p className="text-gray-600">Sustainability initiatives</p>
             
             
            </Card>

            {/* Members Card */}
            <Card className="p-6 flex flex-col w-[7em] h-[15em] justify-between bg-white">
              <p className="text-gray-600">Members associated</p>
              <p className="text-4xl font-bold mt-2">950+</p>
            </Card>

            <Image
                src="/home/Rectangle 46.jpg"
                alt="Kitchen interior"
                width={400}
                height={300}
                className="rounded-2xl relative bottom-9 w-[8em] h-[8em]"
              />

            {/* Engagement Card */}
            <Card className="p-6 relative bottom-9 w-[11em] h-[8em] flex flex-col justify-between bg-white">
              <p className="text-gray-600">Engagement programs</p>
              <p className="text-4xl font-bold mt-2">{'>'}90</p>
            </Card>
            <Image
                src="/home/Rectangle 46.jpg"
                alt="Kitchen interior"
                width={400}
                height={300}
                className="rounded-2xl  w-[7em] h-[9em]"
              />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap relative bottom-16 gap-4">
            <Button variant="outline" className="rounded-full">
              View gallery
            </Button>
            <Button className="rounded-full bg-black text-white hover:bg-gray-800">
              Know more about us
            </Button>
          </div>
        </div>

        {/* Right Section - Gallery */}
        <div className="relative">
            
          <div className="absolute flex gap-x-4 top-0 right-0 text-[#340FE0] font-medium">
          <div className=" w-10 md:w-16 border-t-2 border-[#340FE0] mt-3 pointer-events-none"></div>
            Gallery & Insights
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12  font-[20px] ">
            
              <Image
                src="/home/Rectangle 44.png"
                alt="Kitchen interior"
                width={400}
                height={300}
                className="rounded-2xl object-cover w-full h-[10em]"
              />
              
              <Image
                src="/home/Rectangle 43.png"
                alt="Bedroom interior"
                width={400}
                height={300}
                className="rounded-2xl object-cover w-full h-[10em]"
              />
            
            <Image
                src="/home/Rectangle 38.png"
                alt="Workspace setup"
                width={600}
                height={400}
                className="rounded-2xl object-cover w-full h-[15em] col-span-2"
              />
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

