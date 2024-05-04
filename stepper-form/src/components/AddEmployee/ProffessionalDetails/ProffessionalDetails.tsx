import { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
} from "@mui/material";
import { FormikErrors, FormikTouched, useField } from "formik";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { IFormValues } from "../../../interface/IFormsValues";
import { IErrors } from "../../../interface/IErrors";
import "../../../assests/css/commonStyle.scss";
import "./ProffessionalDetails.scss";

const ProffessionalDetails = (props: {
  errors: FormikErrors<IErrors>;
  values: IFormValues;
  isTouched: FormikTouched<IErrors>;
  setTouched: CallableFunction;
  setValues: CallableFunction;
}) => {
  const { errors, values, isTouched, setTouched, setValues } = props;
  const [designationField] = useField("proffessionalDetails.designation");
  const [departmentField] = useField("proffessionalDetails.department");
  const [currentLocationField] = useField(
    "proffessionalDetails.currentLocation"
  );
  const [skillsField] = useField("proffessionalDetails.skills");
  const [monthField] = useField("proffessionalDetails.month");
  const [yearField] = useField("proffessionalDetails.year");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const years = [0, 1, 2, 3, 4, 5, 6, 7];
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    let newTouched = isTouched?.proffessionalDetails
      ? isTouched?.proffessionalDetails
      : {};
    newTouched = {
      designation: false,
      department: false,
      year: false,
      month: false,
      skills: false,
      currentLocation: false,
    };
    setTouched({
      ...isTouched,
      proffessionalDetails: newTouched,
    });
  }, []);

  const resumeUpload = (e: any) => {
    if (e?.target?.files) {
      const fileObj = {
        fileName: e?.target?.files[0]?.name,
        fileSrc: URL.createObjectURL(e?.target?.files[0]),
      };
      setValues({
        ...values,
        proffessionalDetails: {
          ...values?.proffessionalDetails,
          resume: fileObj,
        },
      });
    }
  };
  const cancelImageHandler = () => {
    setValues({
      ...values,
      proffessionalDetails: {
        ...values?.proffessionalDetails,
        resume: null,
      },
    });
  };
  return (
    <>
      <h3 className="mainHeader">Professional Details</h3>
      <Container maxWidth="xl">
        <Grid container spacing={7}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              type="string"
              label="Desiganation *"
              variant="standard"
              className="fieldForProfessionalDetails"
              error={Boolean(
                isTouched?.proffessionalDetails?.designation &&
                  errors?.proffessionalDetails?.designation
              )}
              {...designationField}
            />
            {isTouched?.proffessionalDetails?.designation &&
              errors?.proffessionalDetails?.designation && (
                <span className="errorMsg">
                  {errors?.proffessionalDetails?.designation}
                </span>
              )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              type="string"
              label="Department *"
              variant="standard"
              className="fieldForProfessionalDetails"
              error={Boolean(
                isTouched?.proffessionalDetails?.department &&
                  errors?.proffessionalDetails?.department
              )}
              {...departmentField}
            />
            {isTouched?.proffessionalDetails?.department &&
              errors?.proffessionalDetails?.department && (
                <span className="errorMsg">
                  {errors?.proffessionalDetails?.department}
                </span>
              )}
          </Grid>
          <Grid item xs={6}>
            <div className="experienceField">
              <p>Experience</p>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className="experinceSelect"
                error={Boolean(
                  isTouched?.proffessionalDetails?.designation &&
                    errors?.proffessionalDetails?.year
                )}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                  error={Boolean(
                    isTouched?.proffessionalDetails?.year &&
                      errors?.proffessionalDetails?.year
                  )}
                  {...yearField}
                >
                  {years?.map((year, index) => {
                    return (
                      <MenuItem key={index} value={year}>
                        {year} years
                      </MenuItem>
                    );
                  })}
                </Select>
                {isTouched?.proffessionalDetails?.year &&
                  errors?.proffessionalDetails?.year && (
                    <span className="errorMsg">
                      {errors?.proffessionalDetails?.year}
                    </span>
                  )}
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className="experinceSelect"
                error={Boolean(
                  isTouched?.proffessionalDetails?.month &&
                    errors?.proffessionalDetails?.month
                )}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Age"
                  error={Boolean(
                    isTouched?.proffessionalDetails?.month &&
                      errors?.proffessionalDetails?.month
                  )}
                  {...monthField}
                >
                  {months?.map((month, index) => {
                    return (
                      <MenuItem key={index} value={month}>
                        {month} months
                      </MenuItem>
                    );
                  })}
                </Select>
                {isTouched?.proffessionalDetails?.month &&
                  errors?.proffessionalDetails?.month && (
                    <span className="errorMsg">
                      {errors?.proffessionalDetails?.month}
                    </span>
                  )}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              type="string"
              label="Current Location *"
              variant="standard"
              className="fieldForProfessionalDetails"
              error={Boolean(
                isTouched?.proffessionalDetails?.currentLocation &&
                  errors?.proffessionalDetails?.currentLocation
              )}
              {...currentLocationField}
            />
            {isTouched?.proffessionalDetails?.currentLocation &&
              errors?.proffessionalDetails?.currentLocation && (
                <span className="errorMsg">
                  {errors?.proffessionalDetails?.currentLocation}
                </span>
              )}
          </Grid>
          <Grid item xs={6}>
            <FormControl
              variant="standard"
              sx={{ m: 1 }}
              className="fieldForProfessionalDetails"
              error={Boolean(
                isTouched?.proffessionalDetails?.skills &&
                  errors?.proffessionalDetails?.skills
              )}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Skills
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
                type="string"
                error={Boolean(
                  isTouched?.proffessionalDetails?.skills &&
                    errors?.proffessionalDetails?.skills
                )}
                multiple={true}
                renderValue={(selected: string[]): string => {
                  return selected.toString();
                }}
                {...skillsField}
              >
                <MenuItem value="React">
                  <Checkbox
                    {...label}
                    checked={values?.proffessionalDetails?.skills?.includes(
                      "React"
                    )}
                  />{" "}
                  React
                </MenuItem>
                <MenuItem value="Angular">
                  {" "}
                  <Checkbox
                    {...label}
                    checked={values?.proffessionalDetails?.skills?.includes(
                      "Angular"
                    )}
                  />
                  Angular
                </MenuItem>
                <MenuItem value="View">
                  {" "}
                  <Checkbox
                    {...label}
                    checked={values?.proffessionalDetails?.skills?.includes(
                      "Vue"
                    )}
                  />
                  View
                </MenuItem>
              </Select>

              <span className="errorMsg">
                {isTouched?.proffessionalDetails?.skills &&
                  errors?.proffessionalDetails?.skills &&
                  errors?.proffessionalDetails?.skills}
              </span>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <div className="resumeButtonContainer">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={resumeUpload}
              />
              <div className="imageContainer">
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    className="resumeButton"
                  >
                    Upload Resume
                  </Button>
                </label>
                {values?.proffessionalDetails?.resume && (
                  <div className="imageName">
                    {values?.proffessionalDetails?.resume?.fileName}
                    <CancelRoundedIcon
                      className="cancelIcon"
                      onClick={cancelImageHandler}
                    />
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProffessionalDetails;
