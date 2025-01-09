import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  const statistics = [
    { title: 'Total Industries', value: '156' },
    { title: 'Active Members', value: '143' },
    { title: 'Recent Updates', value: '24' },
    { title: 'Active Polls', value: '3' }
  ];

  const recentActivities = [
    { type: 'Industry Update', details: 'Steel Manufacturing Co. updated their profile', time: '2 hours ago' },
    { type: 'New Member', details: 'Glass Works Inc. joined the federation', time: '5 hours ago' },
    { type: 'Poll Created', details: 'New poll: Annual Meeting Schedule', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      
      {/* Statistics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 border-b last:border-0 pb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium">Add New Industry</h3>
              <p className="text-sm text-gray-500">Register a new industry member</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium">Create Poll</h3>
              <p className="text-sm text-gray-500">Start a new federation poll</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50">
              <h3 className="font-medium">Post Update</h3>
              <p className="text-sm text-gray-500">Share news or announcements</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;