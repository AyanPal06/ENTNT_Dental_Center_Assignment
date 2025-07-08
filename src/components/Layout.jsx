import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Users, 
  Calendar, 
  CalendarCheck, 
  LogOut, 
  Menu, 
  X,
  Stethoscope
} from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen && !isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminNavItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/patients', label: 'Patients', icon: Users },
    { path: '/appointments', label: 'Appointments', icon: CalendarCheck },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
  ];

  const patientNavItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/my-appointments', label: 'My Appointments', icon: CalendarCheck },
  ];

  const navItems = user?.role === 'Admin' ? adminNavItems : patientNavItems;

  const NavLink = ({ item, mobile = false, onClick }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        } ${mobile ? 'text-base' : 'text-sm'}`}
      >
        <Icon className={`${mobile ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <Card className="flex flex-col flex-1 rounded-none border-0 border-r shadow-sm">
          <div className="flex items-center h-16 px-6 border-b bg-white">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 truncate">Dental Center</h1>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1 bg-white">
            {navItems.map((item) => (
              <NavLink key={item.path} item={item} />
            ))}
          </nav>
          
          <div className="px-4 py-4 border-t bg-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-700">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900 text-sm"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign out
            </Button>
          </div>
        </Card>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Dental Center</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg z-30">
            <nav className="px-4 py-4 space-y-2 max-h-screen overflow-y-auto">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  item={item} 
                  mobile 
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>
            <div className="px-4 py-4 border-t bg-gray-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">
                    {user?.email}
                  </p>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign out
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="min-h-screen">
          <div className="py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;