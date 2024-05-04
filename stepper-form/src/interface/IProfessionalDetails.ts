export interface IProfessionalDetails {
  designation: string;
  department: string;
  month: string;
  year: string;
  currentLocation: string;
  skills: string[];
  resume:  {
    fileName : string | null,
    fileUrl : string | null,
  } | null;
}
