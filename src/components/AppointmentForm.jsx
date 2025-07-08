import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/utils/mockData';

const AppointmentForm = ({ incident, setIncident, onSubmit, submitText, handleFileUpload }) => (
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
        onChange={(e) => handleFileUpload(e, setIncident, incident)}
        className="cursor-pointer"
      />
      {incident.files && incident.files.length > 0 && (
        <div className="space-y-1">
          {incident.files.map((file, index) => (
            <div key={index} className="text-sm text-gray-600">
              📎 {file.name}
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

export default AppointmentForm;