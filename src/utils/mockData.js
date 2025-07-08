export const mockPatients = [
  {
    id: "p1",
    name: "John Doe",
    dob: "1990-05-10",
    contact: "1234567890",
    healthInfo: "No allergies"
  },
  {
    id: "p2",
    name: "Jane Smith",
    dob: "1985-12-15",
    contact: "9876543210",
    healthInfo: "Allergic to penicillin"
  },
  {
    id: "p3",
    name: "Mike Johnson",
    dob: "1992-03-22",
    contact: "5551234567",
    healthInfo: "Diabetes, High blood pressure"
  }
];

export const mockIncidents = [
  {
    id: "i1",
    patientId: "p1",
    title: "Dental Cleaning",
    description: "Regular dental cleaning and checkup",
    comments: "Patient has good oral hygiene",
    appointmentDate: "2024-01-15",
    cost: 120,
    status: "Completed",
    files: []
  },
  {
    id: "i2",
    patientId: "p2",
    title: "Tooth Extraction",
    description: "Wisdom tooth extraction procedure",
    comments: "Patient needs follow-up in 1 week",
    appointmentDate: "2024-01-20",
    cost: 300,
    status: "Completed",
    files: [
      { name: "xray.jpg", url: "/placeholder-xray.jpg" }
    ]
  },
  {
    id: "i3",
    patientId: "p1",
    title: "Root Canal",
    description: "Root canal treatment for tooth #18",
    comments: "Treatment in progress",
    appointmentDate: "2024-01-25",
    cost: 800,
    status: "Pending",
    files: []
  }
];

export const getPatientName = (patientId) => {
  const patient = mockPatients.find(p => p.id === patientId);
  return patient ? patient.name : "Unknown Patient";
};

export const getPatientIncidents = (patientId) => {
  return mockIncidents.filter(incident => incident.patientId === patientId);
};

export const getUpcomingAppointments = () => {
  const today = new Date();
  return mockIncidents.filter(incident => {
    const appointmentDate = new Date(incident.appointmentDate);
    return appointmentDate >= today && incident.status === "Pending";
  });
};

export const getTotalStats = () => {
  const totalPatients = mockPatients.length;
  const totalAppointments = mockIncidents.length;
  const pendingAppointments = mockIncidents.filter(i => i.status === "Pending").length;
  const totalRevenue = mockIncidents
    .filter(i => i.status === "Completed")
    .reduce((sum, i) => sum + (i.cost || 0), 0);
  
  return {
    totalPatients,
    totalAppointments,
    pendingAppointments,
    totalRevenue
  };
};