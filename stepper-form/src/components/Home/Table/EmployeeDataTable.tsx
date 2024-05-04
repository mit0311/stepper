import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TableSortLabel,
  TableFooter,
  TablePagination,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IFormValues } from "../../../interface/IFormsValues";
import { useState, useEffect } from "react";
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  ModeEditOutline as ModeEditOutlineIcon,
  InsertDriveFile as InsertDriveFileIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

import {
  editEmployee,
  resetEditEmployee,
} from "../../../Store/slice/employeeReducer";
import { IShowEmployee } from "../../../interface/IShowEmployee";
import Stack from "@mui/material/Stack";
import AlertMessage from "../../alert-component/AlertMessage";
import "../Table/EmployeeDataTable.scss";
import ImagePreviewModal from "./modals/ImagePreviewModal";
import DeleteModal from "./modals/DeleteModal";

type Order = "asc" | "desc";
function EmployeeDataTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEmployees, setShowEmployees] = useState([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("Name");
  const [isDeleted, setIsDeleted] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [isDelete, setIsDelete] = useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [openModal, setOpenModal] = React.useState("");
  const [imageUrl, setImageUrl] = useState({
    image: "",
    isImage: false,
  });

  const headers = [
    {
      showName: "Profile Picture",
      passName: "profilePicture",
    },
    {
      showName: "Name",
      passName: "firstName",
    },
    {
      showName: "Department",
      passName: "department",
    },
    {
      showName: "Designation",
      passName: "designation",
    },
    {
      showName: "Email",
      passName: "email",
    },
    {
      showName: "Mobile Number",
      passName: "mobileNumber",
    },
    {
      showName: "Resume",
      passName: "Resume",
    },
    {
      showName: "Actions",
      passName: "Actions",
    },
  ];

  const isDataSubmitted = useSelector((state: any) => {
    return state?.employeeReducer.isDataSubmitted;
  });
  const isDataUpdated = useSelector((state: any) => {
    return state?.employeeReducer.isDataUpdated;
  });

  dispatch(resetEditEmployee());

  const employees = useSelector(
    (state: any) => state?.employeeReducer?.employeesData
  );

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event?.target?.value));
    setPage(0);
  };

  useEffect(() => {
    const employeesData = employees?.map((employee: IFormValues) => {
      return {
        employeeId: employee?.employeeId,
        profilePicture: employee?.personalDetails?.profilePicture,
        firstName:
          employee?.personalDetails?.firstName +
          " " +
          employee?.personalDetails?.lastName,

        department: employee?.proffessionalDetails?.department,
        designation: employee?.proffessionalDetails?.designation,
        email: employee?.personalDetails?.email,
        mobileNumber: employee?.personalDetails?.mobileNumber,
      };
    });

    const employeeDataPerPage = employeesData?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    setShowEmployees(employeeDataPerPage);
  }, [employees, rowsPerPage, page]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ): any => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    let sortedEmployees = [];

    if (order === "asc") {
      sortedEmployees = showEmployees?.sort(
        (employee1: any, employee2: any) => {
          return employee1[property] > employee2[property] ? 1 : -1;
        }
      );
    } else {
      sortedEmployees = showEmployees?.sort(
        (employee1: any, employee2: any) => {
          return employee1[property] > employee2[property] ? -1 : 1;
        }
      );
    }
    setShowEmployees(sortedEmployees);
  };

  const addEmployeeHandler = () => {
    navigate("addEmployee");
  };

  const editEmployeeDataHanlder = (employeeId: string) => {
    navigate(`editEmployee/${employeeId}`);
    dispatch(editEmployee(employeeId));
  };

  const deleteEmployeeDataHandler = (employeeId: string) => {
    setIsDeleted(false);
    setOpenModal(employeeId);
  };

  const imagePreviewHandler = (fileSrc: any) => {
    if (fileSrc === "no preview") {
      setImageUrl({
        ...imageUrl,
        image: fileSrc,
        isImage: false,
      });
    } else {
      setImageUrl({
        ...imageUrl,
        image: fileSrc,
        isImage: true,
      });
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        {isDataSubmitted && (
          <AlertMessage
            onCloseAlert="success"
            message="Successfully added employee"
            messageType="success"
          />
        )}
        {isDataUpdated && (
          <AlertMessage
            onCloseAlert={setIsSuccess}
            message="Successfully updated employee"
            messageType="success"
          />
        )}
        {isDeleted && (
          <AlertMessage
            onCloseAlert={setIsDelete}
            message="Successfully deleted employee"
            messageType="success"
          />
        )}
        <DeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setIsDeleted={setIsDeleted}
        />
        <ImagePreviewModal imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <div className="addEmployee">
          <Button variant="contained" onClick={addEmployeeHandler}>
            <PersonAddIcon /> Employee
          </Button>
        </div>
        <TableContainer component={Paper} className="tableContainer">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headers.map((headerName, index) => {
                  return (
                    <TableCell
                      className="tableHeaderBox"
                      key={index}
                      align="center"
                    >
                      <TableSortLabel
                        active={orderBy === headerName?.passName}
                        direction={
                          orderBy === headerName?.passName ? order : "asc"
                        }
                        onClick={(e) => {
                          handleRequestSort(e, headerName?.passName || "");
                        }}
                      >
                        {headerName?.showName}
                      </TableSortLabel>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {showEmployees.length > 0 ? (
                showEmployees?.map((employee: IShowEmployee, index: number) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell align="center">
                        {employee?.profilePicture?.fileSrc ? (
                          <img
                            src={`${employee?.profilePicture?.fileSrc}`}
                            className="profile"
                            onClick={() => {
                              imagePreviewHandler(
                                employee?.profilePicture?.fileSrc
                              );
                            }}
                          ></img>
                        ) : (
                          <AccountCircleIcon
                            onClick={() => {
                              imagePreviewHandler("no preview");
                            }}
                            className="profileIcon"
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {employee?.firstName}
                      </TableCell>
                      <TableCell align="center">
                        {employee?.department}
                      </TableCell>
                      <TableCell align="center">
                        {employee?.designation}
                      </TableCell>
                      <TableCell align="center">{employee?.email}</TableCell>
                      <TableCell align="center">
                        {employee?.mobileNumber}
                      </TableCell>
                      <TableCell align="center">
                        <InsertDriveFileIcon className="resumeIcon" />
                      </TableCell>
                      <TableCell align="center">
                        <ModeEditOutlineIcon
                          onClick={() => {
                            editEmployeeDataHanlder(employee?.employeeId);
                          }}
                          className="editIcon"
                        />
                        <DeleteIcon
                          onClick={() => {
                            deleteEmployeeDataHandler(employee?.employeeId);
                          }}
                          className="deleteIcon"
                        />{" "}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" colSpan={8}>
                    No records found!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableHead></TableHead>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8}>
                  <Stack spacing={2}>
                    <TablePagination
                      component="div"
                      count={employees?.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default EmployeeDataTable;
