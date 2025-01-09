"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight, ExternalLink, MapPin, Phone, Mail, Clock } from 'lucide-react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Heading from '../components/heading';
import industries from './data';
import Header from '../components/header';

const BusinessDirectory = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const DetailView = ({ industry, onClose }) => {
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    return (
      <div className="bg-gray-50 p-4">
        <div className="max-w-[1200px] mx-auto p-4 sm:p-6">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              Back to Directory
            </button>
          </div>

          {/* Image Carousel */}
          <div className="relative h-[500px] mb-8">
            <img
              src={industry.images[currentImageIndex]}
              alt={industry.name}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-xl" />
            <button
              onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : industry.images.length - 1)}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentImageIndex(prev => prev < industry.images.length - 1 ? prev + 1 : 0)}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
            >
              <ArrowRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {industry.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold">{industry.name}</h1>
                  {industry.vacancy.available && (
                    <span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-sm font-medium">
                      Now Hiring
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">{industry.description}</p>
              </div>

              {/* Materials Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Materials Used</h2>
                <div className="flex flex-wrap gap-2">
                  {industry.materials.map((material, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">{industry.contactNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{industry.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400" size={20} />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">{industry.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Products Section */}
        <div className="mt-4 max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Products</h3>
            <div className="flex gap-2">
              <button
                className="p-2 bg-orange-300 rounded-full hover:bg-orange-400"
                id="product-prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-orange-300 rounded-full hover:bg-orange-400"
                id="product-next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              prevEl: "#product-prev",
              nextEl: "#product-next",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="relative mt-4"
          >
            {industry.products?.map((product, index) => (
              <SwiperSlide key={index}>
                <div onClick={() => handleProductClick(product)} className="relative group cursor-pointer">
                  <img
                    src={product.images[0]}  
                    alt={product.name}
                    className="w-full h-64 object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center h-full text-white text-lg font-semibold">
                      {product.name}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {showProductModal && selectedProduct && (
          <div className="fixed w-full inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg mx-auto relative">
              <button 
                onClick={closeModal}  
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedProduct.images[0]} 
                alt={selectedProduct.name} 
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{selectedProduct.name}</h3>
              <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
              <p className="text-gray-800 font-medium mt-2">Price: ₹{selectedProduct.price}</p>
            </div>
          </div>
        )}

        {/* GST & Legal Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm max-w-4xl mx-auto my-8">
          <h2 className="text-xl font-semibold mb-4">Business Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-medium text-gray-700">GST Number</h3>
              <p className="text-gray-600 mt-1">{industry.gstInfo}</p>
            </div>
            {industry.vacancy.available && (
              <div>
                <h3 className="font-medium text-gray-700">Current Openings</h3>
                <p className="text-gray-600 mt-1">{industry.vacancy.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {!selectedIndustry ? (
        <>
        <Header description={"United Diverse Industries to Propel India's Growth and Prosperity"} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-20">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedIndustry(industry)}
                className="group cursor-pointer"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <img
                    src={industry.images[0]}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium group-hover:text-red-500 transition-colors">
                  {industry.name}
                </h3>
              </div>
            ))}
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
