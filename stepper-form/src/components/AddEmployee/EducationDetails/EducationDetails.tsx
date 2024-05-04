import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  ModeEditOutline as ModeEditOutlineIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

import { TextField as FormikTextField } from "formik-mui";
import { IFormValues } from "../../../interface/IFormsValues";
import { v4 as uuid } from "uuid";
import { IErrors } from "../../../interface/IErrors";
import AlertMessage from "../../alert-component/AlertMessage";
import { Field, FieldArray, FormikTouched } from "formik";
import "../../../assests/css/commonStyle.scss";
import "./Education.scss";

const EducationDetails = (props: {
  values: IFormValues;
  errors: any;
  isTouched: FormikTouched<IErrors>;
  setTouched: CallableFunction;
  isEducationDetailsError: boolean;
  setEducationDetailsError: CallableFunction;
}) => {
  const {
    values,
    errors,
    isTouched,
    setTouched,
    isEducationDetailsError,
    setEducationDetailsError,
  } = props;
  const [isAddEducationClicked, setIsAddEducationClicked] = useState(false);
  const [enabledRowIndex, setEnabledRowIndex] = useState<number>(-1);
  const addEducationDetailsHandler = () => {
    setIsAddEducationClicked(true);
  };
  const headersOfEducationTable = [
    "Education Name",
    "University Name",
    "Result",
    "Year Of Passing",
    "Action",
  ];
  const enableFieldsHandler = (length: number) => {
    setEnabledRowIndex(length);
  };
  const editHandler = (index: number) => {
    setEnabledRowIndex(index);
  };
  const formSubmitHandler = (index: number) => {
    const newTouched = isTouched?.educationDetails
      ? isTouched?.educationDetails
      : [];
    newTouched[index] = {
      educationName: true,
      universityName: true,
      result: true,
      yearOfPassing: true,
    };
    setTouched({
      ...isTouched,
      educationDetails: newTouched,
    });
    if (
      values.educationDetails?.[index]?.educationName?.length > 0 &&
      values?.educationDetails?.[index]?.universityName?.length > 0 &&
      values?.educationDetails?.[index]?.result?.length > 0 &&
      values?.educationDetails?.[index]?.yearOfPassing > 0
    ) {
      enableFieldsHandler(values?.educationDetails?.length);
      setIsAddEducationClicked(false);
      setEducationDetailsError(false);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <h3 className="mainHeader">Education Details</h3>
        <div>
          <FieldArray
            name="educationDetails"
            render={(arrayHelpers) => (
              <div className="tableStyle">
                {isEducationDetailsError && (
                  <AlertMessage
                    onCloseAlert={setEducationDetailsError}
                    message="Add atleast one record!"
                    messageType="warning"
                  />
                )}
                <div className="educationContainer">
                  <Button
                    onClick={() => {
                      const uniqueId = uuid();
                      const newValue = {
                        id: uniqueId,
                        educationName: "",
                        universityName: "",
                        result: "",
                        yearOfPassing: "",
                      };
                      arrayHelpers?.push(newValue);
                      setEnabledRowIndex(values?.educationDetails?.length);
                      addEducationDetailsHandler();
                    }}
                    disabled={isAddEducationClicked}
                    variant="contained"
                    className="addEducationButton"
                  >
                    <AddIcon /> Add Education
                  </Button>
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow className="educationHeader">
                        {headersOfEducationTable?.map((header, index) => {
                          return <TableCell key={index}>{header}</TableCell>;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values?.educationDetails?.length > 0 ? (
                        values?.educationDetails?.map(
                          (educationDetails, index: number) => (
                            <>
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                className="educationCell"
                                key={index}
                              >
                                <TableCell className="educationCell">
                                  <Field
                                    label="Education Name *"
                                    variant="standard"
                                    component={FormikTextField}
                                    name={`educationDetails[${index}].educationName`}
                                    disabled={index !== enabledRowIndex}
                                    error={
                                      isTouched?.educationDetails?.[index]
                                        ?.educationName &&
                                      errors?.educationDetails?.[index]
                                        ?.educationName
                                    }
                                  />
                                </TableCell>
                                <TableCell className="educationCell">
                                  <Field
                                    label="University Name*"
                                    variant="standard"
                                    type="string"
                                    component={FormikTextField}
                                    name={`educationDetails[${index}].universityName`}
                                    disabled={index !== enabledRowIndex}
                                    error={
                                      isTouched?.educationDetails?.[index]
                                        ?.universityName &&
                                      errors?.educationDetails?.[index]
                                        ?.universityName
                                    }
                                  />
                                </TableCell>
                                <TableCell className="educationCell">
                                  <Field
                                    label="Result*"
                                    variant="standard"
                                    type="string"
                                    component={FormikTextField}
                                    name={`educationDetails[${index}].result`}
                                    disabled={index !== enabledRowIndex}
                                    error={
                                      isTouched?.educationDetails?.[index]
                                        ?.result &&
                                      errors?.educationDetails?.[index]?.result
                                    }
                                  />
                                </TableCell>
                                <TableCell className="educationCell">
                                  <Field
                                    label="Year Of Passing*"
                                    variant="standard"
                                    type="number"
                                    component={FormikTextField}
                                    name={`educationDetails[${index}].yearOfPassing`}
                                    disabled={index !== enabledRowIndex}
                                    error={
                                      isTouched?.educationDetails?.[index]
                                        ?.yearOfPassing &&
                                      errors?.educationDetails?.[index]
                                        ?.yearOfPassing
                                    }
                                  />
                                </TableCell>
                                <TableCell className="educationCell">
                                  {index === enabledRowIndex ? (
                                    <div className="actionOfEduForm">
                                      <CheckIcon
                                        className="submitIcon"
                                        type="submit"
                                        onClick={() => formSubmitHandler(index)}
                                      />
                                      <ClearIcon
                                        className="clearIcon"
                                        type="submit"
                                        onClick={() =>
                                          arrayHelpers?.replace(index, {
                                            educationName: "",
                                            universityName: "",
                                            result: "",
                                            yearOfPassing: "",
                                          })
                                        }
                                      />
                                      <DeleteIcon
                                        className="deleteIcon"
                                        type="submit"
                                        onClick={() => {
                                          arrayHelpers?.remove(index);
                                          setIsAddEducationClicked(false);
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      <ModeEditOutlineIcon
                                        type="submit"
                                        onClick={() => {
                                          editHandler(index);
                                        }}
                                        className="editIcon"
                                      />
                                      <DeleteIcon
                                        type="submit"
                                        onClick={() =>
                                          arrayHelpers?.remove(index)
                                        }
                                        className="deleteIcon"
                                      />
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            </>
                          )
                        )
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            style={{ textAlign: "center" }}
                          >
                            No records found!
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          />
        </div>
      </Container>
    </>
  );
};

export default EducationDetails;
