import { IFormValues } from "./IFormsValues";

export interface IState {
  employeesData: IFormValues [];
  editEmployeeData: IFormValues | {};
  editEmployeeId: string | null;
  isDataSubmitted :boolean;
  isDataUpdated:boolean
}
