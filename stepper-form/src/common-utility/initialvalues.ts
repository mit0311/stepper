import { v4 as uuid } from "uuid";
export const newEmployee = {
    employeeId: uuid(),
    personalDetails: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      profilePicture: null,
      dateOfBirth: "",
      presentAddress: "",
      permenantAddress: "",
    },
    bankDetails: {
      bankName: "",
      accountName: "",
      bankAccountNumber: "",
      ifscCode: "",
      adharCardNumber: "",
      panCardNumber: "",
    },
    proffessionalDetails: {
      designation: "",
      department: "",
      month: "",
      year: "",
      currentLocation: "",
      resume: null,
      skills: [],
    },
    educationDetails: [],
    experienceDetails: [],
    currentOrganizationDetails: {
      joiningDate: "",
      nextAppraisalDate: "",
      currentCtc: "",
    },
  };