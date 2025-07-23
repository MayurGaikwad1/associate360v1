import { Link, useLocation } from 'react-router-dom';
import { Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-primary">
                  Associate 360
                </Link>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                Asset Management Platform
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-red-500">3</Badge>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">John Manager</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                isActive('/') 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/jobs" 
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                location.pathname.startsWith('/jobs') 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Management
            </Link>
            <Link 
              to="/procurement" 
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                location.pathname.startsWith('/procurement') 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Procurement
            </Link>
            <Link 
              to="/assets" 
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                location.pathname.startsWith('/assets') 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Asset Management
            </Link>
            <Link 
              to="/clearance" 
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                location.pathname.startsWith('/clearance') 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Clearance
            </Link>
            <Link 
              to="/reports" 
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                location.pathname.startsWith('/reports') 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}
