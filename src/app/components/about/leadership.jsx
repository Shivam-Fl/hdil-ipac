import React from 'react';
import Heading from '../heading';

const LeadershipTeam = () => {
  const teamMembers = [
    {
      name: "Jocelyn Schleifer",
      role: "Lead Architect",
      background: "bg-blue-50"
    },
    {
      name: "Jocelyn Schleifer",
      role: "Lead Architect",
      background: "bg-red-50"
    },
    {
      name: "Jocelyn Schleifer",
      role: "Lead Architect",
      background: "bg-yellow-50"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="flex ">

        <Heading heading="Leadership team" route="/about" />
      </div>

      {/* Description */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="flex flex-wrap justify-center items-center gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center  ">
            <div className={`w-full aspect-square mb-4 rounded-lg overflow-hidden min-h-64 ${member.background}`}>
              <img
                src="/api/placeholder/400/400"
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipTeam;