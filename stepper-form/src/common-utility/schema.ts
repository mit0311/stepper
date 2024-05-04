import * as Yup from "yup";

export const personalDetailsSchema = Yup.object().shape({
    personalDetails: Yup.object().shape({
      firstName: Yup.string().required("Fisrt Name is required"),
      middleName: Yup.string().required("Middle Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobileNumber: Yup.string()
        .required("Mobile Number is required")
        .min(10, "Mobile Number should be of 10 numbers"),
      dateOfBirth: Yup.string().required("Date Of Birth is required"),
      presentAddress: Yup.string().required("Present Address is required"),
      permenantAddress: Yup.string().required("Permenant Address is required"),
    }),
  });
 export  const proffessionalDetailsSchema = Yup.object().shape({
    proffessionalDetails: Yup.object().shape({
      designation: Yup.string().required("Designation is required"),
      department: Yup.string().required("Department is required"),
      year: Yup.string().required("Year is required"),
      month: Yup.string().required("Month is required"),
      currentLocation: Yup.string().required("Current Location is required"),
      skills: Yup.array()
        .min(1, "Skills is reuired")
        .required("Skills is reuired"),
    }),
  });
  export const bankDetailsSchema = Yup.object().shape({
    bankDetails: Yup.object().shape({
      bankName: Yup.string().required("Bank Name is required"),
      accountName: Yup.string().required("Account Name is required"),
      bankAccountNumber: Yup.string()
        ?.min(9, "Bank Account Number must be of 9-18 digits.")
        ?.max(18, "Bank Account Number must be of 9-18 digits.")
        ?.required("Bank Account Number is required"),
      ifscCode: Yup.string()
        .required("IFSC Code is required")
        .matches(
          /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
          "IFSC Code must be of format AAAA0111111."
        ),
      adharCardNumber: Yup.number().required("AdharCard Number is required"),
      panCardNumber: Yup.string().required("PanCard Number is required"),
    }),
  });
 export  const educationDetailsSchema = Yup.object().shape({
    educationDetails: Yup.array().of(
      Yup.object().shape({
        educationName: Yup.string().required("Education Name is required"),
        universityName: Yup.string().required("University Name is required"),
        result: Yup.string().required("Result is required"),
        yearOfPassing: Yup.string().required("Year Of Passing is required"),
      })
    ),
  });
  export const experienceDetailsSchema = Yup.object().shape({
    experienceDetails: Yup.array().of(
      Yup.object().shape({
        companyName: Yup.string().required("Company Name is required"),
        position: Yup.string().required("Position is required"),
        totalYear: Yup.string().required("Total Year is required"),
        lastCtc: Yup.string().required("Last Ctc is required"),
      })
    ),
  });
  export const currentOrganizationDetailsSchema = Yup.object().shape({
    currentOrganizationDetails: Yup.object().shape({
      joiningDate: Yup.string().required("Joining Date is required"),
      nextAppraisalDate: Yup.string().required(
        "Next Appraisal Date is required"
      ),
      currentCtc: Yup.string().required("Current Ctc is required"),
    }),
  });