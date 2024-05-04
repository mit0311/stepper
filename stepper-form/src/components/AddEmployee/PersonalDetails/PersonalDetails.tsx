import { useEffect } from "react";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { FormikErrors, FormikTouched, useField } from "formik";
import { IFormValues } from "../../../interface/IFormsValues";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { IErrors } from "../../../interface/IErrors";
import "../PersonalDetails/PersonalDetails.scss";
import ImagePreviewModal from "../../Home/Table/modals/ImagePreviewModal";

const PersonalDetails = (props: {
  errors: FormikErrors<IErrors>;
  values: IFormValues;
  setFieldValue: CallableFunction;
  isTouched: FormikTouched<IErrors>;
  setValues: CallableFunction;
}) => {
  const { errors, values, setFieldValue, isTouched, setValues } = props;
  const [firstNameField] = useField("personalDetails.firstName");
  const [middleNameField] = useField("personalDetails.middleName");
  const [lastNameField] = useField("personalDetails.lastName");
  const [emailField] = useField("personalDetails.email");
  const [mobileNumberField] = useField("personalDetails.mobileNumber");
  const [presentAddressField] = useField("personalDetails.presentAddress");
  const [permenantAddresField] = useField("personalDetails.permenantAddress");
  const [dateOfBirthField] = useField("personalDetails.dateOfBirth");
  const [isSimilarAddress, setIsSimilarAddress] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState({
    image: "",
    isImage: false,
  });

  useEffect(() => {
    if (isSimilarAddress) {
      setFieldValue(
        "personalDetails.permenantAddress",
        values?.personalDetails?.presentAddress
      );
    }
  }, [values?.personalDetails?.presentAddress]);

  const fileUploadHandler = (e: any) => {
    if (e?.target?.files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileObj = {
          fileName: e?.target?.files[0]?.name,
          fileSrc: reader.result,
        };
        setValues({
          ...values,
          personalDetails: {
            ...values?.personalDetails,
            profilePicture: fileObj,
          },
        });
      };
      reader.readAsDataURL(e.target?.files[0]);
    }
  };

  const similarAddressHanlder = () => {
    setIsSimilarAddress(!isSimilarAddress);
    setFieldValue(
      "personalDetails.permenantAddress",
      values?.personalDetails?.presentAddress
    );
  };

  const handleCancel = (values: IFormValues) => {
    setValues({
      ...values,
      personalDetails: {
        ...values?.personalDetails,
        profilePicture: "",
      },
    });
  };

  const profilePreviewHandller = (fileSrc: string) => {
    if (fileSrc) {
      setImageUrl({
        ...imageUrl,
        image: fileSrc,
        isImage: true,
      });
    }
  };

  return (
    <>
      <h3 className="mainHeader">Personal Details</h3>
      <Container maxWidth="xl">
        <>
          <ImagePreviewModal imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <Grid container spacing={7}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="string"
                label="First Name *"
                variant="standard"
                className="fieldForPersonalDetails"
                error={Boolean(
                  isTouched?.personalDetails?.firstName &&
                    errors?.personalDetails?.firstName
                )}
                {...firstNameField}
              />
              {isTouched?.personalDetails?.firstName &&
                errors?.personalDetails?.firstName && (
                  <span className="errorMsg">
                    {errors?.personalDetails?.firstName}
                  </span>
                )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-basic"
                type="string"
                label="Middle Name *"
                variant="standard"
                className="fieldForPersonalDetails"
                error={Boolean(
                  isTouched?.personalDetails?.middleName &&
                    errors?.personalDetails?.middleName
                )}
                {...middleNameField}
              />
              {isTouched?.personalDetails?.middleName &&
                errors?.personalDetails?.middleName && (
                  <span className="errorMsg">
                    {errors?.personalDetails?.middleName}
                  </span>
                )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-basic"
                type="string"
                label="Last Name *"
                variant="standard"
                className="fieldForPersonalDetails"
                error={Boolean(
                  isTouched?.personalDetails?.lastName &&
                    errors?.personalDetails?.lastName
                )}
                {...lastNameField}
              />
              {isTouched?.personalDetails?.lastName &&
                errors?.personalDetails?.lastName && (
                  <span className="errorMsg">
                    {errors?.personalDetails?.lastName}
                  </span>
                )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-basic"
                type="email"
                label="Email *"
                variant="standard"
                className="fieldForPersonalDetails"
                error={Boolean(
                  isTouched?.personalDetails?.email &&
                    errors?.personalDetails?.email
                )}
                {...emailField}
              />
              {isTouched?.personalDetails?.email &&
                errors?.personalDetails?.email && (
                  <span className="errorMsg">
                    {errors?.personalDetails?.email}
                  </span>
                )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Mobile Number *"
                variant="standard"
                type="number"
                className="fieldForPersonalDetails"
                error={Boolean(
                  isTouched?.personalDetails?.mobileNumber &&
                    errors?.personalDetails?.mobileNumber
                )}
                {...mobileNumberField}
              />
              {isTouched?.personalDetails?.mobileNumber &&
                errors?.personalDetails?.mobileNumber && (
                  <span className="errorMsg">
                    {errors?.personalDetails?.mobileNumber}
                  </span>
                )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Date Of Birth*"
                variant="standard"
                {...dateOfBirthField}
                className="fieldForPersonalDetails"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={Boolean(
                  isTouched?.personalDetails?.dateOfBirth &&
                    errors?.personalDetails?.dateOfBirth
                )}
              />
              {isTouched?.personalDetails?.dateOfBirth &&
                errors?.personalDetails?.dateOfBirth && (
                  <span className="errorMsg">
                    {errors?.personalDetails?.dateOfBirth}
                  </span>
                )}
            </Grid>
          </Grid>
          <div className="imageContainer">
            <Button
              variant="contained"
              component="label"
              className="profilePicture"
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => fileUploadHandler(e)}
              />
            </Button>
            {values?.personalDetails?.profilePicture?.fileName && (
              <div className="imageName">
                <span
                  onClick={() => {
                    profilePreviewHandller(
                      values?.personalDetails?.profilePicture?.fileSrc || ""
                    );
                  }}
                >
                  {values?.personalDetails?.profilePicture?.fileName}
                </span>
                <CancelRoundedIcon
                  className="cancelIcon"
                  onClick={() => {
                    handleCancel(values);
                  }}
                />
              </div>
            )}
          </div>
          <div className="textareaField">
            <Grid container spacing={7}>
              <Grid item xs={6}>
                <div className="textareaAddressContainer">
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Present Address"
                    variant="standard"
                    className="textArea"
                    minRows={4}
                    multiline
                    error={Boolean(
                      isTouched?.personalDetails?.presentAddress &&
                        errors?.personalDetails?.presentAddress
                    )}
                    {...presentAddressField}
                  />
                  {isTouched?.personalDetails?.presentAddress &&
                    errors?.personalDetails?.presentAddress && (
                      <span className="errorMsg">
                        {errors?.personalDetails?.presentAddress}
                      </span>
                    )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="textareaAddressContainer">
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Permenant Address"
                    variant="standard"
                    minRows={4}
                    className="textArea"
                    {...permenantAddresField}
                    multiline
                    error={Boolean(
                      isTouched?.personalDetails?.permenantAddress &&
                        errors?.personalDetails?.permenantAddress
                    )}
                  />
                  {isTouched?.personalDetails?.permenantAddress &&
                    errors?.personalDetails?.permenantAddress && (
                      <span className="errorMsg">
                        {errors?.personalDetails?.permenantAddress}
                      </span>
                    )}
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="checkboxForAddress">
            <Checkbox onClick={similarAddressHanlder} /> Copy to Permanent
            Address
          </div>
        </>
      </Container>
    </>
  );
};

export default PersonalDetails;
