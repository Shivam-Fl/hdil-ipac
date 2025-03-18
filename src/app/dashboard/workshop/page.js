"use client"
import React, { useState, useEffect } from 'react';
import { Bell, User, MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import axios from '@/utils/axiosInstance'; // Adjust path as needed
import { formatDate } from '@/utils/dateUtils'; // Optional, create if needed

const WorkshopCard = ({ 
  createdAt, 
  title, 
  content,
  redirectUrl,
  location,
  date,
  seatsAvailable = '0/0',
  status = 'register' // can be 'register', 'invite', 'registered'
}) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="text-red-500 mb-2">{formatDate(createdAt)}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <p className="text-gray-600 mb-3">{content}</p>
      
      <div className="space-y-2 mb-4">
        {location && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
        )}
        {date && (
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Workshop date: {date}</span>
          </div>
        )}
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>{seatsAvailable} seats available</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        {redirectUrl && (
          <a 
            href={redirectUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-1 border rounded-md flex items-center space-x-1 hover:bg-gray-50"
          >
            <span>Details</span>
          </a>
        )}
        <button 
          className="px-4 py-1 rounded-md bg-red-200 text-red-600 hover:bg-red-300"
        >
          Register
        </button>
      </div>
    </CardContent>
  </Card>
);

const WorkshopListing = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/updates/privateupdates');
        // Filter for workshops only
        const workshopsData = response.data.filter(item => item.type === 'workshop');
        setWorkshops(workshopsData);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="w-full mx-auto p-2">
      {/* Workshop Section Title */}
      <div className="bg-white p-4 mb-4">
        <h2 className="text-xl font-bold">Workshop</h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p>Loading workshops...</p>
        </div>
      )}

      {/* Workshop Cards */}
      {!loading && (
        <div className="space-y-4">
          {workshops.map((workshop) => (
            <WorkshopCard 
              key={workshop._id}
              title={workshop.title}
              content={workshop.content}
              createdAt={workshop.createdAt}
              redirectUrl={workshop.redirectUrl}
              date={workshop.date}
              // Extract location from content or use default if not available
              location={workshop.location || "Location not specified"}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && workshops.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No workshops available</p>
        </div>
      )}
    </div>
  );
};

export default WorkshopListing;