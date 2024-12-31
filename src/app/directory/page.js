"use client"
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BusinessDirectory = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const industries = Array(12).fill({
    title: 'Lorem Ipsum Dolor Sit',
    image: '/api/placeholder/400/300'
  });

  const DetailView = ({ industry, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const products = Array(4).fill({
      title: 'Lorem Ipsum Dolor Sit',
      image: '/api/placeholder/400/300'
    });

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-[1200px] mx-auto p-4 sm:p-6">
          {/* Top Image Section */}
          <div className="relative h-64 sm:h-[400px] md:h-[500px] mb-6">
            <img
              src="/api/placeholder/1200/500"
              alt="Featured Property"
              className="w-full h-full object-cover rounded"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-white rounded-full p-2 shadow-md">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button className="bg-white rounded-full p-2 shadow-md">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-2xl">Lorem Ipsum</h1>
                <span className="text-red-400">New listing</span>
              </div>

              <div>
                <h2 className="font-medium mb-2">Details</h2>
                <p className="text-gray-600 text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor sit lor doloreee.</p>
              </div>

              <div>
                <h2 className="font-medium mb-2">Lorem</h2>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-medium mb-2">GST:</h2>
                <p className="text-gray-600 text-sm md:text-base">Lorem ipsum</p>
              </div>

              <div>
                <h2 className="font-medium mb-4">Products</h2>
                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto">
                    {products.map((product, idx) => (
                      <div key={idx} className="flex-none w-1/3 sm:w-1/4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full aspect-square object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
                    <button className="bg-white rounded-full p-1 shadow-md">
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button className="bg-white rounded-full p-1 shadow-md">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-medium mb-2">Legal Information</h2>
                <p className="text-gray-600 text-sm md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor sit lor doloreee.</p>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white p-4 sm:p-6 rounded-lg h-fit shadow">
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <button className="w-full bg-red-400 text-white py-2 rounded">
                  Submit
                </button>
              </form>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Contact Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Phone:</span> +91 9539954039</p>
                  <p><span className="font-medium">Email:</span> ipca23hq@gmail.com</p>
                  <p><span className="font-medium">Address:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6">
      {!selectedIndustry ? (
        <>
          {/* Header */}
          <div className="bg-[#f0a9a1] rounded-lg p-4 sm:p-8 mb-6 sm:mb-12">
            <h1 className="text-lg sm:text-xl font-bold mb-1">IPCA</h1>
            <p className="text-sm sm:text-base">IPCA: United Diverse Industries to Propel India's Growth and Prosperity</p>
            <img src="/api/placeholder/100/50" alt="IPCA Logo" className="mt-4" />
          </div>

          {/* Directory Section */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl mb-2 sm:mb-0">Business Directory</h2>
              <div className="relative w-full sm:w-60">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full pl-3 pr-10 py-2 border rounded"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {industries.map((industry, idx) => (
                <div 
                  key={idx}
                  className="group cursor-pointer"
                  onClick={() => setSelectedIndustry(industry)}
                >
                  <div className="relative">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full aspect-square object-cover rounded"
                    />
                    <button className="absolute top-2 right-2 bg-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="mt-2 text-sm sm:text-base">{industry.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <DetailView 
          industry={selectedIndustry}
          onClose={() => setSelectedIndustry(null)}
        />
      )}
    </div>
  );
};

export default BusinessDirectory;
