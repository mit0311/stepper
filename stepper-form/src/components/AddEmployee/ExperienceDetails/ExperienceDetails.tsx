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
import { Field, FieldArray, FormikTouched } from "formik";
import { IFormValues } from "../../../interface/IFormsValues";
import { IErrors } from "../../../interface/IErrors";
import AlertMessage from "../../alert-component/AlertMessage";
import "../../../assests/css/commonStyle.scss";

const ExperienceDetails = (props: {
  values: IFormValues;
  errors: any;
  isTouched: FormikTouched<IErrors>;
  setTouched: CallableFunction;
  setExperienceDetailsError: CallableFunction;
  isExperienceDetailsError: Boolean;
}) => {
  const {
    values,
    errors,
    isTouched,
    setTouched,
    isExperienceDetailsError,
    setExperienceDetailsError,
  } = props;
  const [isAddExperinceClicked, setisAddExperinceClicked] = useState(false);
  const [enabledRowIndex, setEnabledRowIndex] = useState<number>(-1);
  const headersOfEducationTable = [
    "Company Name",
    "Position Name",
    "Total Year",
    "Last Ctc",
    "Action",
  ];
  const enableFieldsHandler = (length: number) => {
    setEnabledRowIndex(length);
  };
  const editHandler = (index: number) => {
    setEnabledRowIndex(index);
  };
  const formSubmitHandler = (index: number) => {
    const newTouched = isTouched?.experienceDetails
      ? isTouched?.experienceDetails
      : [];
    newTouched[index] = {
      companyName: true,
      position: true,
      totalYear: true,
      lastCtc: true,
    };
    setTouched({
      ...isTouched,
      experienceDetails: newTouched,
    });
    if (
      values.experienceDetails?.[index]?.companyName?.length > 0 &&
      values?.experienceDetails?.[index]?.position?.length > 0 &&
      values?.experienceDetails?.[index]?.totalYear?.length > 0 &&
      values?.experienceDetails?.[index]?.lastCtc > 0
    ) {
      enableFieldsHandler(values?.experienceDetails?.length);
      setisAddExperinceClicked(false);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <h3 className="mainHeader">Experience Details</h3>
        <div>
          <FieldArray
            name="experienceDetails"
            render={(arrayHelpers) => (
              <div className="tableStyle">
                {isExperienceDetailsError && (
                  <AlertMessage
                    onCloseAlert={setExperienceDetailsError}
                    message="Add atleast one record!"
                    messageType="warning"
                  />
                )}
                <div className="educationContainer">
                  <Button
                    onClick={() => {
                      const newValue = {
                        companyName: "",
                        position: "",
                        totalYear: "",
                        lastCtc: "",
                      };
                      arrayHelpers?.push(newValue);
                      setEnabledRowIndex(values?.experienceDetails?.length);
                      setisAddExperinceClicked(true);
                    }}
                    disabled={isAddExperinceClicked}
                    variant="contained"
                  >
                    <AddIcon /> Add Experience
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
                      {values?.experienceDetails?.length > 0 ? (
                        values?.experienceDetails?.map((_, index: number) => (
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
                                label="Company Name *"
                                variant="standard"
                                component={FormikTextField}
                                name={`experienceDetails[${index}].companyName`}
                                disabled={index !== enabledRowIndex}
                                error={
                                  isTouched?.experienceDetails?.[index]
                                    ?.companyName &&
                                  errors?.experienceDetails?.[index]
                                    ?.companyName
                                }
                              />
                            </TableCell>
                            <TableCell className="educationCell">
                              <Field
                                label="Position*"
                                variant="standard"
                                type="string"
                                component={FormikTextField}
                                name={`experienceDetails[${index}].position`}
                                disabled={index !== enabledRowIndex}
                                error={
                                  isTouched?.experienceDetails?.[index]
                                    ?.position &&
                                  errors?.experienceDetails?.[index]?.position
                                }
                              />
                            </TableCell>
                            <TableCell className="educationCell">
                              <Field
                                label="Total Year*"
                                variant="standard"
                                type="string"
                                component={FormikTextField}
                                name={`experienceDetails[${index}].totalYear`}
                                disabled={index !== enabledRowIndex}
                                error={
                                  isTouched?.experienceDetails?.[index]
                                    ?.totalYear &&
                                  errors?.experienceDetails?.[index]?.totalYear
                                }
                              />
                            </TableCell>
                            <TableCell className="educationCell">
                              <Field
                                label="Last Ctc*"
                                variant="standard"
                                type="number"
                                component={FormikTextField}
                                name={`experienceDetails[${index}].lastCtc`}
                                disabled={index !== enabledRowIndex}
                                error={
                                  isTouched?.experienceDetails?.[index]
                                    ?.lastCtc &&
                                  errors?.experienceDetails?.[index]?.lastCtc
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
                                        companyName: "",
                                        position: "",
                                        totalYear: "",
                                        lastCtc: "",
                                      })
                                    }
                                  />
                                  <DeleteIcon
                                    className="deleteIcon"
                                    type="submit"
                                    onClick={() => arrayHelpers?.remove(index)}
                                  />
                                </div>
                              ) : (
                                <div>
                                  <ModeEditOutlineIcon
                                    type="submit"
                                    className="editIcon"
                                    onClick={() => {
                                      editHandler(index);
                                    }}
                                  />
                                  <DeleteIcon
                                    type="submit"
                                    className="deleteIcon"
                                    onClick={() => arrayHelpers?.remove(index)}
                                  />
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
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

export default ExperienceDetails;
