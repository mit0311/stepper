export interface IShowEmployee {
  employeeId: string;
  profilePicture:{
    fileName:string | null,
    fileSrc :string | null
  } | null;
  firstName: string;
  lastName: string;
  department: string;
  designation: string;
  email: string;
  mobileNumber: number;
}
