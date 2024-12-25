import React from 'react';

const IPCASection = () => {
  const images = [
    { src: "/api/placeholder/80/80", alt: "Heart icon", className: "bg-red-100" },
    { src: "/api/placeholder/80/80", alt: "Light figure", className: "bg-yellow-100" },
    { src: "/api/placeholder/80/80", alt: "Galaxy figure", className: "bg-blue-100" },
    { src: "/api/placeholder/80/80", alt: "Lion image", className: "bg-gray-100" }
  ];

  return (
    <div className="w-11/12 max-w-5xl mx-auto my-4 bg-blue-200 p-4 sm:p-6 md:p-8 rounded-xl relative overflow-hidden">
      {/* Title */}
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 montserrat-subrayada-bold">
        IPCA
      </h1>
      
      {/* Main text */}
      <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto font-sans px-2">
        Transforms visions into reality, blending innovation with collaborative growth
      </p>
      
      {/* Image circles */}
      <div className="flex flex-wrap sm:flex-nowrap justify-around sm:justify-between items-center max-w-5xl mx-auto gap-4 sm:gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`w-16 h-16 sm:w-18 md:w-20 sm:h-18 md:h-20 rounded-full overflow-hidden transform 
            ${(index === 0 || index === 3) ? 'translate-y-6 sm:translate-y-8 md:translate-y-10' : '-translate-y-2'} 
            ${image.className}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* IPCA Logo */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img
            src="/api/placeholder/60/60"
            alt="IPCA Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default IPCASection;