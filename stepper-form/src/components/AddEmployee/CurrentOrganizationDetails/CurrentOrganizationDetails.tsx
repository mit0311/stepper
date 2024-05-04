import { useEffect } from "react";
import { Container, Grid, TextField } from "@mui/material";
import { FormikErrors, FormikTouched, useField } from "formik";
import { IErrors } from "../../../interface/IErrors";
import "../../../assests/css/commonStyle.scss";

const CurrentOrganizationDetails = (props: {
  errors: FormikErrors<IErrors>;
  isTouched: FormikTouched<IErrors>;
  setTouched: CallableFunction;
}) => {
  const { errors, isTouched, setTouched } = props;
  const [joiningDateField] = useField("currentOrganizationDetails.joiningDate");
  const [appraisalDateField] = useField(
    "currentOrganizationDetails.nextAppraisalDate"
  );
  const [currentCtcField] = useField("currentOrganizationDetails.currentCtc");
  useEffect(() => {
    let newTouched = isTouched?.currentOrganizationDetails
      ? isTouched?.currentOrganizationDetails
      : {};
    newTouched = {
      joiningDate: false,
      nextAppraisalDate: false,
      currentCtc: false,
    };
    setTouched({
      ...isTouched,
      currentOrganizationDetails: newTouched,
    });
  }, []);

  return (
    <>
      <h3 className="mainHeader">Current organization details</h3>
      <Container maxWidth="xl">
        <Grid container spacing={7}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Joining Date*"
              variant="standard"
              type="date"
              className="fieldOfCurrentOrganization"
              InputLabelProps={{ shrink: true }}
              error={Boolean(
                isTouched?.currentOrganizationDetails?.joiningDate &&
                  errors?.currentOrganizationDetails?.joiningDate
              )}
              {...joiningDateField}
            />
            {isTouched?.currentOrganizationDetails?.joiningDate &&
              errors?.currentOrganizationDetails?.joiningDate && (
                <span className="errorMsg">
                  {errors?.currentOrganizationDetails?.joiningDate}
                </span>
              )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Next Appraisal Date*"
              variant="standard"
              type="date"
              className="fieldOfCurrentOrganization"
              InputLabelProps={{ shrink: true }}
              error={Boolean(
                isTouched?.currentOrganizationDetails?.nextAppraisalDate &&
                  errors?.currentOrganizationDetails?.nextAppraisalDate
              )}
              {...appraisalDateField}
            />
            {isTouched?.currentOrganizationDetails?.nextAppraisalDate &&
              errors?.currentOrganizationDetails?.nextAppraisalDate && (
                <span className="errorMsg">
                  {errors?.currentOrganizationDetails?.nextAppraisalDate}
                </span>
              )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Current CTC*"
              variant="standard"
              className="fieldOfCurrentOrganization"
              error={Boolean(
                isTouched?.currentOrganizationDetails?.currentCtc &&
                  errors?.currentOrganizationDetails?.currentCtc
              )}
              {...currentCtcField}
            />
            {isTouched?.currentOrganizationDetails?.currentCtc &&
              errors?.currentOrganizationDetails?.currentCtc && (
                <span className="errorMsg">
                  {errors?.currentOrganizationDetails?.currentCtc}
                </span>
              )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CurrentOrganizationDetails;
