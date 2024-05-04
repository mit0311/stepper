import { useEffect } from "react";
import { FormikErrors, FormikTouched, useField } from "formik";
import { Container, Grid, TextField } from "@mui/material";
import { IErrors } from "../../../interface/IErrors";
import "../../../assests/css/commonStyle.scss";

const BankDetails = (props: {
  errors: FormikErrors<IErrors>;
  isTouched: FormikTouched<IErrors>;
  setTouched: CallableFunction;
}) => {
  const { errors, isTouched, setTouched } = props;
  const [bankNameField] = useField("bankDetails.bankName");
  const [accountNameField] = useField("bankDetails.accountName");
  const [bankAccountNumberField] = useField("bankDetails.bankAccountNumber");
  const [ifscCodeField] = useField("bankDetails.ifscCode");
  const [adharCardNumberField] = useField("bankDetails.adharCardNumber");
  const [panCardNumberField] = useField("bankDetails.panCardNumber");

  useEffect(() => {
    let newTouched = isTouched?.bankDetails ? isTouched?.bankDetails : {};
    newTouched = {
      bankName: false,
      accountName: false,
      bankAccountNumber: false,
      ifscCode: false,
      adharCardNumber: false,
      panCardNumber: false,
    };
    setTouched({
      ...isTouched,
      bankDetails: newTouched,
    });
  }, []);

  return (
    <>
      <h3 className="mainHeader">Bank Details</h3>
      <Container maxWidth="xl">
        <div className="bankDetailsContainer">
          <Grid container spacing={7}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                type="string"
                label="Bank Name *"
                variant="standard"
                className="bankDetailsFields"
                error={Boolean(
                  isTouched?.bankDetails?.bankName &&
                    errors?.bankDetails?.bankName
                )}
                {...bankNameField}
              />
              {isTouched?.bankDetails?.bankName &&
                errors?.bankDetails?.bankName && (
                  <span className="errorMsg">
                    {errors?.bankDetails?.bankName}
                  </span>
                )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                type="string"
                label="Account Name *"
                variant="standard"
                className="bankDetailsFields"
                error={Boolean(
                  isTouched?.bankDetails?.accountName &&
                    errors?.bankDetails?.accountName
                )}
                {...accountNameField}
              />
              {isTouched?.bankDetails?.accountName &&
                errors?.bankDetails?.accountName && (
                  <span className="errorMsg">
                    {errors?.bankDetails?.accountName}
                  </span>
                )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                type="number"
                label="Bank Account Number *"
                variant="standard"
                className="bankDetailsFields"
                error={Boolean(
                  isTouched?.bankDetails?.bankAccountNumber &&
                    errors?.bankDetails?.bankAccountNumber
                )}
                {...bankAccountNumberField}
              />
              {isTouched?.bankDetails?.bankAccountNumber &&
                errors?.bankDetails?.bankAccountNumber && (
                  <span className="errorMsg">
                    {errors?.bankDetails?.bankAccountNumber}
                  </span>
                )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                type="string"
                label="IFSC code *"
                variant="standard"
                className="bankDetailsFields"
                error={Boolean(
                  isTouched?.bankDetails?.ifscCode &&
                    errors?.bankDetails?.ifscCode
                )}
                {...ifscCodeField}
              />
              {isTouched?.bankDetails?.ifscCode &&
                errors?.bankDetails?.ifscCode && (
                  <span className="errorMsg">
                    {errors?.bankDetails?.ifscCode}
                  </span>
                )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                type="number"
                label="Aadhar Card Number*"
                variant="standard"
                className="bankDetailsFields"
                error={Boolean(
                  isTouched?.bankDetails?.adharCardNumber &&
                    errors?.bankDetails?.adharCardNumber
                )}
                {...adharCardNumberField}
              />
              {isTouched?.bankDetails?.adharCardNumber &&
                errors?.bankDetails?.adharCardNumber && (
                  <span className="errorMsg">
                    {errors?.bankDetails?.adharCardNumber}
                  </span>
                )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="standard-basic"
                type="string"
                label="Pan Card Number *"
                variant="standard"
                className="bankDetailsFields"
                error={Boolean(
                  isTouched?.bankDetails?.panCardNumber &&
                    errors?.bankDetails?.panCardNumber
                )}
                {...panCardNumberField}
              />
              {isTouched?.bankDetails?.panCardNumber &&
                errors?.bankDetails?.panCardNumber && (
                  <span className="errorMsg">
                    {errors?.bankDetails?.panCardNumber}
                  </span>
                )}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default BankDetails;
