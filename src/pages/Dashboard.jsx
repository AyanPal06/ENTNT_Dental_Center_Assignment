import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, Clock } from 'lucide-react';
import { getTotalStats, getUpcomingAppointments, getPatientName } from '@/utils/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const stats = getTotalStats();
  const upcomingAppointments = getUpcomingAppointments();

  const StatCard = ({ title, value, icon: Icon, description, color }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );

  if (user?.role === 'Patient') {
    const patientAppointments = upcomingAppointments.filter(a => a.patientId === user.patientId);
    
    return (
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 mt-1">Here's your appointment overview</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Your Appointments"
            value={patientAppointments.length}
            icon={Calendar}
            description="Upcoming appointments"
            color="text-blue-600"
          />
        </div>

        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Your Upcoming Appointments
            </CardTitle>
            <CardDescription>Your scheduled dental appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientAppointments.length > 0 ? (
                patientAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{appointment.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{appointment.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming appointments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your dental center</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          description="Registered patients"
          color="text-blue-600"
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          icon={Calendar}
          description="All appointments"
          color="text-green-600"
        />
        <StatCard
          title="Pending Appointments"
          value={stats.pendingAppointments}
          icon={Clock}
          description="Awaiting treatment"
          color="text-yellow-600"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={DollarSign}
          description="Completed treatments"
          color="text-purple-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Recent Appointments
            </CardTitle>
            <CardDescription>Latest scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900">{appointment.title}</h3>
                    <p className="text-sm text-gray-600">{getPatientName(appointment.patientId)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="flex items-center w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900">Add New Patient</span>
                  <p className="text-sm text-gray-500">Register a new patient</p>
                </div>
              </button>
              <button className="flex items-center w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900">Schedule Appointment</span>
                  <p className="text-sm text-gray-500">Book a new appointment</p>
                </div>
              </button>
              <button className="flex items-center w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900">View Pending Cases</span>
                  <p className="text-sm text-gray-500">Review pending appointments</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
