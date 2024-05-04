export interface IPersonalDetails {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?:string;
  mobileNumber?: string;
  profilePicture?: {
    fileName : string | null,
    fileSrc : string | null,
  } | null;
  dateOfBirth?: string;
  permenantAddress?: string;
  presentAddress?: string;

}
