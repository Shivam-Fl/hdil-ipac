import React from 'react';
import { Bell, User, Search, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const NoticeCard = ({ date, title, content }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="text-red-500 text-sm mb-1">Posted on: {date}</div>
      <h3 className="text-lg font-bold mb-2 break-words">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm sm:text-base break-words">{content}</p>
      <button className="flex items-center space-x-2 border rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors">
        <Download className="w-4 h-4" />
        <span>Attachment</span>
      </button>
    </CardContent>
  </Card>
);

const NoticeListing = () => {
  const notices = [
    {
      date: 'Jan 15, 2025',
      title: 'Lorem Ipsum Dolor Sit Color',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor sit lor doloreee dolore magna aliqua.'
    },
    {
      date: 'Jan 15, 2025',
      title: 'Lorem Ipsum Dolor Sit Color',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor sit lor doloreee dolore magna aliqua.'
    },
    {
      date: 'Jan 15, 2025',
      title: 'Lorem Ipsum Dolor Sit Color',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor sit lor doloreee dolore magna aliqua.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4">
      {/* Notice Section with Search */}
      <div className="bg-white p-3 sm:p-4 mb-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center rounded-lg">
        <h2 className="text-lg sm:text-xl font-bold">Notice</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search notices..."
            className="w-full bg-gray-100 rounded-md pl-8 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Notice Cards */}
      <div className="grid gap-4 grid-cols-1 ">
        {notices.map((notice, index) => (
          <NoticeCard key={index} {...notice} />
        ))}
      </div>

      {/* Empty State */}
      {notices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No notices found</p>
        </div>
      )}
    </div>
  );
};

export default NoticeListing;