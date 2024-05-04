import { useState } from "react";
import { Stack, Snackbar, Alert, AlertColor } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetMessage } from "../../Store/slice/employeeReducer";

const AlertMessage = (props: {
  onCloseAlert: any;
  message: string;
  messageType: AlertColor | undefined;
}): any => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { onCloseAlert, message, messageType } = props;
  const handleClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    if (onCloseAlert === "success") {
      dispatch(resetMessage());
    } else {
      onCloseAlert(false);
    }
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default AlertMessage;
