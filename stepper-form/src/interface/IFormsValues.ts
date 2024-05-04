import { IPersonalDetails } from "./IPersonalDetails";
import { IProfessionalDetails } from "./IProfessionalDetails";
import { IBankDetails } from "./IBankDetails";
import { IEducationDetails } from "./IEducationDetails";
import { IExperienceDetails } from "./IExperienceDetails";
import { ICurrentOrganization } from "./ICurrentOrganization";

export interface IFormValues {
  employeeId:string;
  personalDetails: IPersonalDetails;
  bankDetails: IBankDetails;
  proffessionalDetails: IProfessionalDetails;
  educationDetails: IEducationDetails[];
  experienceDetails: IExperienceDetails[];
  currentOrganizationDetails: ICurrentOrganization;
}
