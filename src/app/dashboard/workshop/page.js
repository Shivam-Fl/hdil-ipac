import React from 'react';
import { Bell, User, MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WorkshopCard = ({ 
  date, 
  title, 
  location, 
  applicationDeadline, 
  seatsAvailable,
  status = 'register' // can be 'register', 'invite', 'registered'
}) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="text-red-500 mb-2">{date}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Apply by {applicationDeadline}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>{seatsAvailable} seats available</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {status === 'invite' && (
          <button className="px-4 py-1 border rounded-md flex items-center space-x-1">
            <span>Invite</span>
          </button>
        )}
        <button 
          className={`px-4 py-1 rounded-md ${
            status === 'registered' 
              ? 'bg-gray-100 text-gray-600' 
              : 'bg-red-200 text-red-600'
          }`}
        >
          {status === 'registered' ? 'Registered' : 'Register'}
        </button>
      </div>
    </CardContent>
  </Card>
);

const WorkshopListing = () => {
  const workshops = [
    {
      date: 'Jan 15, 2025',
      title: 'Lorem Ipsum Dolor Sit Color',
      location: 'Grant Road, Mumbai, Maharashtra',
      applicationDeadline: '23/11/2025',
      seatsAvailable: '24/50',
      status: 'register'
    },
    {
      date: 'Jan 15, 2025',
      title: 'Lorem Ipsum Dolor Sit Color',
      location: 'Grant Road, Mumbai, Maharashtra',
      applicationDeadline: '23/11/2025',
      seatsAvailable: '24/50',
      status: 'invite'
    },
    {
      date: 'Jan 15, 2025',
      title: 'Lorem Ipsum Dolor Sit Color',
      location: 'Grant Road, Mumbai, Maharashtra',
      applicationDeadline: '23/11/2025',
      seatsAvailable: '24/50',
      status: 'registered'
    }
  ];

  return (
    <div className="w-full mx-auto p-2">
      {/* Header */}
      

      {/* Workshop Section Title */}
      <div className="bg-white p-4 mb-4">
        <h2 className="text-xl font-bold">Workshop</h2>
      </div>

      {/* Workshop Cards */}
      <div className="space-y-4">
        {workshops.map((workshop, index) => (
          <WorkshopCard key={index} {...workshop} />
        ))}
      </div>
    </div>
  );
};

export default WorkshopListing;