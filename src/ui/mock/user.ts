export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: "student" | "coach";
  university: string;
  sport: string;
  city: string;
};

export const mockUser: MockUser = {
  id: "usr-001",
  name: "Ana Morales",
  email: "ana.morales@correo.edu",
  role: "student",
  university: "Universidad del Norte",
  sport: "Futbol",
  city: "Monterrey",
};
