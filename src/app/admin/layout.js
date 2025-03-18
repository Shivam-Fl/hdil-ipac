"use client"
import React from 'react';
import { Home, Building2, NewspaperIcon, PhoneCall, Users, PieChart, MessageCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin' },
    { icon: Building2, label: 'Industries', href: '/admin/industries' },
    { icon: NewspaperIcon, label: 'Updates', href: '/admin/updates' },
    { icon: PhoneCall, label: 'Emergency Contacts', href: '/admin/emergency' },
    { icon: Users, label: 'Members', href: '/admin/members' },
    { icon: PieChart, label: 'Polls', href: '/admin/polls' },
    { icon: MessageCircle, label: 'Feedback', href: '/admin/feedback' } // New Feedback button
];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="ml-4 text-xl font-semibold">Federation Admin</h1>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <span className="sr-only">Profile</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 h-full w-64 bg-white shadow-sm transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "pt-16 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-64" : "ml-0"
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={5000} />

    </div>
  );
};

export default Layout;