import React from 'react';
import { MoveUpRight } from 'lucide-react';
import Heading from '../heading';

const History = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* About Us Header */}
      <Heading heading="About Us" route="/about" />

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Federation History Section */}
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">Federation history</h3>
          <p className="text-gray-700 mb-6 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">28</span>
            <span className="text-xl">%</span>
            <span className="text-gray-600 ml-2">Lorem ipsum dolor sit</span>
          </div>
        </div>

        {/* Founded Card Section */}
        <div className="flex-1 bg-[#EA9282] rounded-lg overflow-hidden">
          <div className="p-4">
            <h4 className="text-2xl font-bold mb-2">Founded in 1985</h4>
            <p className="flex items-center gap-2 mb-4">
              <span>740 industries</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 21V8l9-7 9 7v13h-7v-6h-4v6H3z"/>
              </svg>
            </p>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/about/historysec.png"
                alt="Modern dining room"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">Mission</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                <MoveUpRight  className='w-4 h-4'/>
                  <h4 className="text-lg font-semibold ">Lorem Ipsum</h4>
                </div>
                <p className="text-gray-700 text-xl">Lorem ipsum dolor sit amet, consectetur</p>
                {item !== 3 && <hr className="border-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;