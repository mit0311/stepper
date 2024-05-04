import { IEducationDetails } from "./IEducationDetails";
import { IExperienceDetails } from "./IExperienceDetails";

export interface IErrors {
  personalDetails: {
    firstName?: string | boolean;
    middleName?: string | boolean;
    lastName?: string | boolean;
    email?: string | boolean;
    mobileNumber?: string | boolean;
    profilePicture?: {
      fileName: string | null;
      fileSrc: string | null;
    } | null;
    dateOfBirth?: string | boolean;
    presentAddress?: string | boolean;
    permenantAddress?: string | boolean;
  };
  proffessionalDetails: {
    designation?: string | boolean;
    department?: string | boolean;
    year?: string | boolean;
    month?: string | boolean;
    currentLocation?: string | boolean;
    skills?: string[] | boolean;
  };
  bankDetails: {
    bankName?: string | boolean;
    accountName?: string | boolean;
    bankAccountNumber?: string | boolean;
    ifscCode?: string | boolean;
    adharCardNumber?: string | boolean;
    panCardNumber?: string | boolean;
  };
  currentOrganizationDetails: {
    joiningDate?: string | boolean;
    nextAppraisalDate?: string | boolean;
    currentCtc?: string | boolean;
  };
  educationDetails: IEducationDetails[];
  experienceDetails: IExperienceDetails[];
}
