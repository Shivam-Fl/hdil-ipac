import React from 'react';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Logo */}
      <div className="bg-navy-900 bg-[#00205B] text-white relative max-w-5xl mx-auto my-5 rounded-xl max-lg:m-4">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-20">
          <h1 className="text-3xl font-bold text-center mb-2 montserrat-subrayada-bold">IPCA</h1>
          <div className="text-center sm:text-left ml-4">
            <p className="text-lg">Want to reach us out?</p>
            <p className="text-lg">Fill the form or send us a direct email</p>
            <button className="mt-2 border border-white rounded-full px-6 py-1 text-sm">
              Send email
            </button>
          </div>
        </div>
        
        {/* Billboard Image */}
        <div className="absolute right-20 top-0">
          <img 
            src="/api/placeholder/200/150" 
            alt="IPCA Billboard" 
            className="h-48 object-contain"
          />
        </div>
        
        {/* Center Logo */}
        <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <img 
              src="/api/placeholder/80/80" 
              alt="IPCA Logo" 
              className="w-16 h-16"
            />
          </div>
        </div>
      </div>

      {/* Contact Us Title */}
      <div className="max-w-5xl mx-auto px-4 mt-20">
        <h2 className="text-red-500 text-xl font-medium border-b-2 border-red-500 inline-block">
          Contact Us
        </h2>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="space-y-6">
              <div>
                <p className="font-medium">Phone:</p>
                <p className="text-gray-600">+91 9034954039</p>
              </div>
              
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-600">ipca23hdil@gmail.com</p>
              </div>
              
              <div>
                <p className="font-medium">Address:</p>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form  className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 bg-gray-100 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-100 rounded"
                />
              </div>
              
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 bg-gray-100 rounded"
              />
              
              <textarea
                placeholder="Your Comment"
                rows={6}
                className="w-full p-3 bg-gray-100 rounded"
              />
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00205B] text-white rounded"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8 max-w-5xl">
          <iframe
            title="Location Map"
            className="w-full h-96 rounded"
            src="about:blank"
            frameBorder="0"
            style={{ background: '#f1f1f1' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;