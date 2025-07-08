import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const PatientForm = ({ patient, setPatient, onSubmit, submitText }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name *</Label>
      <Input
        id="name"
        value={patient.name}
        onChange={(e) => setPatient({ ...patient, name: e.target.value })}
        placeholder="Enter patient name"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="dob">Date of Birth *</Label>
      <Input
        id="dob"
        type="date"
        value={patient.dob}
        onChange={(e) => setPatient({ ...patient, dob: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="contact">Contact *</Label>
      <Input
        id="contact"
        value={patient.contact}
        onChange={(e) => setPatient({ ...patient, contact: e.target.value })}
        placeholder="Enter phone number"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="healthInfo">Health Information</Label>
      <Textarea
        id="healthInfo"
        value={patient.healthInfo}
        onChange={(e) => setPatient({ ...patient, healthInfo: e.target.value })}
        placeholder="Enter health information, allergies, etc."
      />
    </div>
    <Button onClick={onSubmit} className="w-full">
      {submitText}
    </Button>
  </div>
);

export default PatientForm;