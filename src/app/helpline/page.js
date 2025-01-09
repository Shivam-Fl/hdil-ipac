"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Header from "../components/header";
import Heading from "../components/heading";
import axiosInstance from "@/utils/axiosInstance"; // Adjust the import path if necessary

const EmergencyServices = () => {
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get("/emergency");
        const data = response.data;

        const emergencies = data.filter((item) => item.category === "Emergency");
        const providers = data.filter((item) => item.category === "Service Provider");

        setEmergencyNumbers(
          emergencies.map((item) => ({
            icon: getIcon(item.name),
            title: item.name,
            contact: item.number,
            availability: "24/7", // Customize this based on data or API
            description: "Description not provided.", // Customize this based on data or API
          }))
        );

        setServiceProviders(
          providers.map((item) => ({
            icon: getIcon(item.name),
            title: item.name,
            contact: item.number,
            availability: "Availability not provided.", // Customize this based on data or API
          }))
        );
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const getIcon = (name) => {
    // Customize this mapping for better icons
    if (name.toLowerCase().includes("fire")) return "🚒";
    if (name.toLowerCase().includes("ambulance")) return "🚑";
    if (name.toLowerCase().includes("police")) return "👮‍♂️";
    if (name.toLowerCase().includes("plumber")) return "🔧";
    if (name.toLowerCase().includes("electrician")) return "💡";
    if (name.toLowerCase().includes("carpenter")) return "🔨";
    return "❓";
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Header description={"Prioritizing safety and comfort, blending care with responsibility"} />

      <section className="mt-14">
        <Heading heading="Helpline" route={"/helpline"} />
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
              {/* <p className="text-gray-600 mb-4">{service.description}</p> */}
              <button className="bg-[#B7472A] text-white px-6 py-2 rounded-md hover:bg-[#953e29] transition-colors">
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
            <Card key={provider.title} className="p-6 flex bg-[#EAEAEF] flex-col items-center text-center">
              <div className="text-4xl mb-4">{provider.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{provider.title}</h3>
              <div className="mb-2">
                <span className="font-medium">Contact:</span> {provider.contact}
              </div>
              <div className="mb-2">
                <span className="font-medium">Availability:</span> {provider.availability}
              </div>
              <button className="bg-[#B7472A] text-white px-6 py-2 rounded-md hover:bg-[#953e29] transition-colors">
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
