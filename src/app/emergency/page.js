import React from 'react';
import { Card } from '@/components/ui/card';

const EmergencyServices = () => {
  const emergencyNumbers = [
    {
      icon: "🚒",
      title: "Firefighters",
      contact: "101",
      availability: "24/7",
      description: "Rapid response to fire emergencies.",
    },
    {
      icon: "🚑",
      title: "Ambulance",
      contact: "102",
      availability: "24/7",
      description: "Immediate medical transportation services.",
    },
    {
      icon: "👮‍♂️",
      title: "Police",
      contact: "100",
      availability: "24/7",
      description: "Ensuring law and order and public safety.",
    },
  ];

  const serviceProviders = [
    {
      icon: "🔧",
      title: "Roshan Plumber",
      contact: "1234-567-890",
      availability: "9:00 AM - 9:00 PM",
    },
    {
      icon: "💡",
      title: "Ketan Super Electrician",
      contact: "0987-654-321",
      availability: "24/7",
    },
    {
      icon: "🔨",
      title: "Sai Om Carpenter",
      contact: "1122-334-556",
      availability: "10:00 AM - 8:00 PM",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-[#075F98] text-white p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">IPCA</h1>
        <p className="text-xl">
          Prioritizing safety and comfort, blending care with responsibility
        </p>
      </div>

      <div className="text-purple-600 mb-4">Helpline</div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Emergency Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyNumbers.map((service) => (
            <Card key={service.title} className="p-6 bg-[#EAEAEF] flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <div className="mb-2">
                <span className="font-medium">Contact:</span> {service.contact}
              </div>
              <div className="mb-2">
                <span className="font-medium">Availability:</span> {service.availability}
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button className="bg-[#065890] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Call now
              </button>
            </Card>
          ))}
        </div>
        <p className="text-center mt-4 text-gray-700">
          For life-threatening emergencies, please call the listed numbers immediately. Stay safe and alert.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Service Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceProviders.map((provider) => (
            <Card key={provider.title} className="p-6 flex bg-[#EAEAEF]  flex-col items-center text-center">
              <div className="text-4xl mb-4">{provider.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{provider.title}</h3>
              <div className="mb-2">
                <span className="font-medium">Contact:</span> {provider.contact}
              </div>
              <div className="mb-2">
                <span className="font-medium">Availability:</span> {provider.availability}
              </div>
              <button className="bg-[#065890] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Call now
              </button>
            </Card>
          ))}
        </div>
        <p className="text-center mt-4 text-gray-700">
          For reliable and professional services, connect with our listed providers. We ensure quality and satisfaction.
        </p>
      </section>
    </div>
  );
};

export default EmergencyServices;