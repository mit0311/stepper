import React from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import PersonalDetails from "../AddEmployee/PersonalDetails/PersonalDetails";
import BankDetails from "../AddEmployee/BankDetails/BankDetails";
import ProffessionalDetails from "../AddEmployee/ProffessionalDetails/ProffessionalDetails";
import EducationDetails from "../AddEmployee/EducationDetails/EducationDetails";
import ExperienceDetails from "../AddEmployee/ExperienceDetails/ExperienceDetails";
import CurrentOrganizationDetails from "../AddEmployee/CurrentOrganizationDetails/CurrentOrganizationDetails";
import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import {
  personalDetailsSchema,
  proffessionalDetailsSchema,
  bankDetailsSchema,
  educationDetailsSchema,
  experienceDetailsSchema,
  currentOrganizationDetailsSchema,
} from "../../common-utility/schema";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeData,
  resetMessage,
  updateEmployee,
} from "../../Store/slice/employeeReducer";
import { IErrors } from "../../interface/IErrors";
import { IFormValues } from "../../interface/IFormsValues";
import { newEmployee } from "../../common-utility/initialvalues";
import "../Stepper/StepperForEmployee.scss";

const steps = [
  "Personal Details",
  "Bank Details",
  "Proffessional Details",
  "Education Details",
  "Experience Details",
  "Current Organization Details",
];
const StepperForEmployee = () => {
  const { editEmployeeData, editEmployeeId } = useSelector(
    (state: any) => state?.employeeReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { employeesData } = useSelector((state: any) => state?.employeeReducer);
  const [initialValuesState, setInitialState] = useState(newEmployee);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isEducationDetailsError, setEducationDetailsError] = useState(false);
  const [isExperienceDetailsError, setExperienceDetailsError] = useState(false);

  useEffect(() => {
    if (activeStep === steps?.length) {
      navigate("/");
    }
  }, [activeStep]);

  useEffect(() => {
    const editEmployee = employeesData.find((employee: any) => {
      return employee?.employeeId === params.id;
    });
    if (editEmployee) {
      setInitialState(editEmployee);
    }
  }, [params.id, editEmployeeData]);

  useEffect(() => {
    dispatch(resetMessage());
  }, []);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSubmit = (values: IFormValues) => {
    if (activeStep === 5) {
      editEmployeeId
        ? dispatch(updateEmployee(values))
        : dispatch(addEmployeeData(values));
    }
    if (
      activeStep === 0 ||
      activeStep === 1 ||
      activeStep === 2 ||
      activeStep === 5
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 3 && values?.educationDetails?.length === 0) {
      setEducationDetailsError(true);
    } else if (activeStep === 3 && values?.educationDetails?.length !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setEducationDetailsError(false);
    }
    if (activeStep === 4 && values?.experienceDetails?.length === 0) {
      setExperienceDetailsError(true);
    } else if (activeStep === 4 && values?.experienceDetails?.length !== 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setExperienceDetailsError(false);
    }
  };

  const schema = () => {
    switch (activeStep) {
      case 0:
        return personalDetailsSchema;
      case 1:
        return bankDetailsSchema;
      case 2:
        return proffessionalDetailsSchema;
      case 3:
        return educationDetailsSchema;
      case 4:
        return experienceDetailsSchema;
      case 5:
        return currentOrganizationDetailsSchema;
      default:
        break;
    }
  };
  const renderSteps = (
    errors: FormikErrors<IErrors>,
    values: IFormValues,
    setFieldValue: CallableFunction,
    touched: FormikTouched<IErrors>,
    setTouched: CallableFunction,
    setValues: CallableFunction
  ) => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalDetails
            errors={errors}
            values={values}
            setFieldValue={setFieldValue}
            isTouched={touched}
            setValues={setValues}
          />
        );
      case 1:
        return (
          <BankDetails
            errors={errors}
            isTouched={touched}
            setTouched={setTouched}
          />
        );
      case 2:
        return (
          <ProffessionalDetails
            errors={errors}
            values={values}
            isTouched={touched}
            setTouched={setTouched}
            setValues={setValues}
          />
        );
      case 3:
        return (
          <EducationDetails
            values={values}
            errors={errors}
            isTouched={touched}
            setTouched={setTouched}
            isEducationDetailsError={isEducationDetailsError}
            setEducationDetailsError={setEducationDetailsError}
          />
        );
      case 4:
        return (
          <ExperienceDetails
            values={values}
            errors={errors}
            isTouched={touched}
            setTouched={setTouched}
            isExperienceDetailsError={isExperienceDetailsError}
            setExperienceDetailsError={setExperienceDetailsError}
          />
        );
      case 5:
        return (
          <CurrentOrganizationDetails
            errors={errors}
            isTouched={touched}
            setTouched={setTouched}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} className="stepperComponent">
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Formik
            enableReinitialize
            initialValues={initialValuesState}
            validationSchema={schema()}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({
              errors,
              values,
              setFieldValue,
              touched,
              setTouched,
              setValues,
            }) => {
              return (
                <Form>
                  {renderSteps(
                    errors,
                    values,
                    setFieldValue,
                    touched,
                    setTouched,
                    setValues
                  )}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      variant="contained"
                      className="back-to-list-button"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Back to list
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      className="backButton"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      className="nextButton"
                    >
                      {activeStep === steps?.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </React.Fragment>
      </Box>
    </>
  );
};

export default StepperForEmployee;
