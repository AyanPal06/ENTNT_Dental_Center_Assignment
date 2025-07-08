import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Plus, Search, Edit, Trash2, FileText, DollarSign } from 'lucide-react';
import { mockIncidents, getPatientName } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import AppointmentForm from '@/components/AppointmentForm';

const Appointments = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    status: 'Pending',
    files: []
  });
  const { toast } = useToast();

  const filteredIncidents = incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPatientName(incident.patientId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddIncident = () => {
    if (!newIncident.patientId || !newIncident.title || !newIncident.appointmentDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const incident = {
      ...newIncident,
      id: `i${Date.now()}`,
      cost: newIncident.cost ? parseFloat(newIncident.cost) : 0
    };

    setIncidents([...incidents, incident]);
    setNewIncident({
      patientId: '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      status: 'Pending',
      files: []
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Appointment created successfully.",
    });
  };

  const handleEditIncident = () => {
    const updatedIncident = {
      ...selectedIncident,
      cost: selectedIncident.cost ? parseFloat(selectedIncident.cost) : 0
    };
    
    setIncidents(incidents.map(i => 
      i.id === selectedIncident.id ? updatedIncident : i
    ));
    setIsEditDialogOpen(false);
    setSelectedIncident(null);
    
    toast({
      title: "Success",
      description: "Appointment updated successfully.",
    });
  };

  const handleDeleteIncident = (incidentId) => {
    setIncidents(incidents.filter(i => i.id !== incidentId));
    toast({
      title: "Success",
      description: "Appointment deleted successfully.",
    });
  };

  const handleFileUpload = (event, setIncident, incident) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    
    setIncident({
      ...incident,
      files: [...incident.files, ...newFiles]
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments and incidents</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>
                Schedule a new appointment for a patient.
              </DialogDescription>
            </DialogHeader>
            <AppointmentForm
              incident={newIncident}
              setIncident={setNewIncident}
              onSubmit={handleAddIncident}
              submitText="Create Appointment"
              handleFileUpload={handleFileUpload}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Appointment Records
          </CardTitle>
          <CardDescription>
            Total appointments: {incidents.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search appointments by title or patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">
                      {getPatientName(incident.patientId)}
                    </TableCell>
                    <TableCell>{incident.title}</TableCell>
                    <TableCell>
                      {new Date(incident.appointmentDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                        {incident.cost || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-gray-400" />
                        {incident.files?.length || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedIncident(incident);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteIncident(incident.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Update the appointment information below.
            </DialogDescription>
          </DialogHeader>
          {selectedIncident && (
            <AppointmentForm
              incident={selectedIncident}
              setIncident={setSelectedIncident}
              onSubmit={handleEditIncident}
              submitText="Update Appointment"
              handleFileUpload={handleFileUpload}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;