import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../../interface/IState";
let employeesList = [];
if (localStorage.getItem("employees")) {
  employeesList = JSON.parse(localStorage.getItem("employees") || "");
}

const initialState = {
  employeesData: employeesList || [],
  editEmployeeData: {},
  editEmployeeId: null,
  isDataSubmitted: false,
  isDataUpdated: false,
};

const employeeSlice = createSlice({
  name: "employeeReducer",
  initialState: initialState,
  reducers: {
    addEmployeeData(state: IState, action) {
      if (state?.employeesData) {
        state?.employeesData?.push(action?.payload);
        localStorage.setItem("employees", JSON.stringify(state?.employeesData));
        state.isDataSubmitted = true;
      }
    },
    deleteEmployee(state: IState, action) {
      const employees = state?.employeesData;
      const matchedEmployeeIndex = employees?.findIndex(
        (employee) => employee?.employeeId === action.payload
      );
      if (state?.employeesData && matchedEmployeeIndex !== -1) {
        state?.employeesData?.splice(matchedEmployeeIndex, 1);
        localStorage.setItem("employees", JSON.stringify(state?.employeesData));
      }
    },
    editEmployee(state: IState, action) {
      const employees = state.employeesData.find((employee) => {
        return employee.employeeId === action.payload;
      });
      if (employees) {
        state.editEmployeeData = employees;
      }
      state.editEmployeeId = action.payload;
      state.isDataUpdated = false;
      state.isDataSubmitted=false
    },
    resetEditEmployee(state: IState) {
      state.editEmployeeData = {};
      state.editEmployeeId = null;
    },
    updateEmployee(state: IState, action) {
      const employees = state?.employeesData || [];
      const matchedEmployeeIndex = employees?.findIndex(
        (employee) => employee?.employeeId === action.payload?.employeeId
      );
      if (matchedEmployeeIndex !== -1) {
        employees[matchedEmployeeIndex] = action.payload;
        state.employeesData = employees;
        localStorage.setItem("employees", JSON.stringify(state?.employeesData));
        state.isDataUpdated = true;
      }
    },
    resetMessage(state: IState) {
      state.isDataSubmitted = false;
      state.isDataUpdated = false;
    },
  },
});

export default employeeSlice;

export const {
  addEmployeeData,
  deleteEmployee,
  editEmployee,
  resetEditEmployee,
  updateEmployee,
  resetMessage,
} = employeeSlice?.actions;
