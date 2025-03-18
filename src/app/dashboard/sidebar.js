import Link from "next/link";

const DashboardLayout = ({ children }) => {
  const menuItems = [
    { icon: "🔄", label: "Engagement", href: "/dashboard" },
    { icon: "📢", label: "Notice", href: "/dashboard/notice" },
    { icon: "🔧", label: "Workshop", href: "/dashboard/workshop" },
    { icon: "📚", label: "Business Directory", href: "/dashboard/directory" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white shadow-md flex-col z-20">
          <div className="p-4 border-b">
            <Link href="/" className="text-xl font-bold text-red-700">
              IPCA
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t">
            <Link 
              href="/logout"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-3">🚪</span>
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="flex justify-between items-center px-4 lg:px-8 py-4">
              <h1 className="text-xl font-semibold">Welcome Member</h1>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
                <button className="p-2 hover:bg-gray-100 rounded-full">👤</button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-8 bg-gray-100 pb-16 lg:pb-8">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-10">
          <div className="flex justify-around py-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
                title={item.label}
              >
                <span className="text-xl">{item.icon}</span>
              </Link>
            ))}
            <Link
              href="/logout"
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-full"
              title="Logout"
            >
              <span className="text-xl">🚪</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;