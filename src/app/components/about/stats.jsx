import { Fragment } from "react";
import Heading from "../heading";

const Stats = () => {
  return (
    <Fragment>
      <div className="flex justify-between items-end px-4 max-w-6xl">
        <div className="w-[95%] "></div> {/* Spacer for left alignment */}
        <Heading heading="Vision" route="/about" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 flex lg:gap-10 flex-col sm:flex-row justify-center items-center">
        <div className="basis-1/2">
          <h1 className="space-grotesk flex flex-col gap-1 max-md:text-center">
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold">Driven by</span>
            <span className="text-4xl md:text-6xl lg:text-7xl">Innovation</span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold">United for</span>
            <span className="text-5xl md:text-6xl lg:text-7xl">Growth</span>
          </h1>
        </div>
        <div className="basis-1/2 max-md:mt-10 max-sm:text-xs">
          <div className="mx-auto">
            {/* Card 1 */}
            <div className="shadow-lg ml-24 md:ml-48 p-4 w-32 md:w-48 rounded-md relative">
              <img
                className="absolute h-10 w-10 sm:h-16 sm:w-16 -top-2 sm:-top-10 -right-5"
                src="/about/illus1.svg"
                alt=""
              />
              <p className="text-5xl font-bold">84</p>
              <span className="w-2 h-1 md:w-4 md:h-2 bg-orange-400 text-orange-400 mr-1 ml-2 md:mr-2 md:ml-4">
                ..
              </span>
              <span>Lorem ipsum</span>
            </div>
            {/* Card 2 */}
            <div className="shadow-lg ml-5 md:ml-10 p-4 w-32 md:w-48 rounded-md relative -mt-4">
              <img
                className="absolute -top-2 sm:-top-10 -left-3 sm:-left-5 w-9 h-9 sm:h-14 sm:w-14"
                src="/about/illus4.svg"
                alt=""
              />
              <p className="text-5xl font-bold">84</p>
              <span className="w-2 h-1 md:w-4 md:h-2 bg-orange-400 text-orange-400 mr-1 ml-2 md:mr-2 md:ml-4">
                ..
              </span>
              <span>Lorem ipsum</span>
            </div>
            {/* Card 3 */}
            <div className="shadow-lg ml-20 md:ml-40 p-4 w-32 md:w-48 rounded-md relative -mt-2">
              <img
                className="absolute h-10 w-10 -top-2 sm:h-16 sm:w-16 sm:-top-10 -right-5"
                src="/about/illus2.svg"
                alt=""
              />
              <p className="text-5xl font-bold">84</p>
              <span className="w-2 h-1 md:w-4 md:h-2 bg-orange-400 text-orange-400 mr-1 ml-2 md:mr-2 md:ml-4">
                ..
              </span>
              <span>Lorem ipsum</span>
            </div>
            {/* Card 4 */}
            <div className="shadow-lg ml-8 md:ml-16 p-4 w-32 md:w-48 rounded-md relative -mt-2">
              <img
                className="absolute h-9 w-9 -bottom-3 sm:-bottom-5 -right-5 sm:h-14 sm:w-14"
                src="/about/illus3.svg"
                alt=""
              />
              <p className="text-5xl font-bold">84</p>
              <span className="w-2 h-1 md:w-4 md:h-2 bg-orange-400 text-orange-400 mr-1 ml-2 md:mr-2 md:ml-4">
                ..
              </span>
              <span>Lorem ipsum</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Stats;
