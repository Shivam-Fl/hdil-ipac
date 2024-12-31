import React from 'react';

const Header = ({description}) => {
 

  return (
    <div className="w-11/12 max-w-5xl mx-auto my-4 bg-[#EB9788] p-4 sm:p-6 md:p-6 rounded-xl relative ">
      {/* Title */}
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 montserrat-subrayada-bold">
        IPCA
      </h1>
      
      {/* Main text */}
      <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto font-sans px-2">
        {description}
      </p>
      
      
      {/* IPCA Logo */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img
            src="/ipcalogo.png"
            alt="IPCA Logo"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;