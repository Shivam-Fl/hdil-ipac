"use client"
import React, { useState, useEffect } from 'react';
import { Bell, User, Search, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import axios from '@/utils/axiosInstance'; // Adjust path as needed
import { formatDate } from '@/utils/dateUtils'; // Optional, create if needed

const NoticeCard = ({ createdAt, title, content, redirectUrl }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="text-red-500 text-sm mb-1">Posted on: {formatDate(createdAt)}</div>
      <h3 className="text-lg font-bold mb-2 break-words">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm sm:text-base break-words">{content}</p>
      {redirectUrl && (
        <a 
          href={redirectUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 border rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Attachment</span>
        </a>
      )}
    </CardContent>
  </Card>
);

const NoticeListing = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/updates/privateupdates');
        // Filter for notices only
        const noticesData = response.data.filter(item => item.type === 'notices');
        setNotices(noticesData);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Filter notices based on search term
  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4">
      {/* Notice Section with Search */}
      <div className="bg-white p-3 sm:p-4 mb-4 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center rounded-lg">
        <h2 className="text-lg sm:text-xl font-bold">Notice</h2>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 rounded-md pl-8 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p>Loading notices...</p>
        </div>
      )}

      {/* Notice Cards */}
      {!loading && (
        <div className="grid gap-4 grid-cols-1">
          {filteredNotices.map((notice) => (
            <NoticeCard 
              key={notice._id} 
              title={notice.title}
              content={notice.content}
              createdAt={notice.createdAt}
              redirectUrl={notice.redirectUrl}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredNotices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No notices match your search' : 'No notices found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default NoticeListing;