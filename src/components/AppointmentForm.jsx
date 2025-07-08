
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { mockPatients } from '@/utils/mockData';

const AppointmentForm = ({ incident, setIncident, onSubmit, submitText }) => {
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    try {
      const newFiles = await Promise.all(
        files.map(async (file) => {
          const base64 = await convertFileToBase64(file);
          return {
            name: file.name,
            size: file.size,
            type: file.type,
            base64: base64 // Store as base64 string
          };
        })
      );
      
      setIncident({
        ...incident,
        files: [...(incident.files || []), ...newFiles]
      });
    } catch (error) {
      console.error('Error converting files to base64:', error);
    }
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = incident.files.filter((_, index) => index !== indexToRemove);
    setIncident({
      ...incident,
      files: updatedFiles
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="patient">Patient *</Label>
        <Select value={incident.patientId} onValueChange={(value) => setIncident({ ...incident, patientId: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select a patient" />
          </SelectTrigger>
          <SelectContent>
            {mockPatients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={incident.title}
          onChange={(e) => setIncident({ ...incident, title: e.target.value })}
          placeholder="Enter appointment title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={incident.description}
          onChange={(e) => setIncident({ ...incident, description: e.target.value })}
          placeholder="Enter appointment description"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="appointmentDate">Appointment Date *</Label>
        <Input
          id="appointmentDate"
          type="date"
          value={incident.appointmentDate}
          onChange={(e) => setIncident({ ...incident, appointmentDate: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cost">Cost ($)</Label>
        <Input
          id="cost"
          type="number"
          value={incident.cost}
          onChange={(e) => setIncident({ ...incident, cost: e.target.value })}
          placeholder="Enter cost"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={incident.status} onValueChange={(value) => setIncident({ ...incident, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          value={incident.comments}
          onChange={(e) => setIncident({ ...incident, comments: e.target.value })}
          placeholder="Enter additional comments"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="files">Files</Label>
        <Input
          id="files"
          type="file"
          multiple
          onChange={handleFileUpload}
          className="cursor-pointer"
        />
        {incident.files && incident.files.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Files:</Label>
            {incident.files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">📎</span>
                  <div>
                    <div className="text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {file.size ? `${Math.round(file.size / 1024)} KB` : 'Unknown size'}
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Button onClick={onSubmit} className="w-full">
        {submitText}
      </Button>
    </div>
  );
};

export default AppointmentForm;