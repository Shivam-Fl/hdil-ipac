"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';



const PollContent = () => (
  <div className="space-y-6">
    <div className="border rounded-lg p-4">
      <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="space-y-2">
        {['A', 'B', 'C', 'D'].map((option) => (
          <div key={option} className="flex items-center p-2 bg-gray-50 rounded">
            <label className="flex items-center w-full cursor-pointer">
              <input type="radio" name="poll1" className="mr-2" />
              <span className="text-gray-600">Lorem ipsum dolor sit</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        <span>Poll will expire by 27 December 2025</span>
        <button className="bg-orange-100 px-4 py-1 rounded text-orange-600">Submit</button>
      </div>
    </div>
  </div>
);

const FeedbackContent = () => (
  <div className="space-y-6">
    <div className="border rounded-lg p-4">
      <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <textarea 
        className="w-full border rounded-lg p-3 min-h-32" 
        placeholder="Write your opinion"
      />
      <div className="flex justify-end mt-4">
        <button className="bg-orange-100 px-4 py-1 rounded text-orange-600">Submit</button>
      </div>
    </div>
  </div>
);

const EngagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('poll');

  return (
    <div className=" bg-gray-100">
      
      
      <div className=" ">
      <Card className=" mx-auto w-full my-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between ">
              
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeTab === 'poll' ? 'bg-red-200' : 'bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('poll')}
                >
                  Poll
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeTab === 'feedback' ? 'bg-red-200' : 'bg-gray-200'
                  }`}
                  onClick={() => setActiveTab('feedback')}
                >
                  Feedback
                </button>
              </div>
            </div>

          </CardContent>
        </Card>
        <Card className="w-full mx-auto">
          <CardContent className="p-6">

            {activeTab === 'poll' ? <PollContent /> : <FeedbackContent />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementDashboard;