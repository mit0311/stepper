import { Modal, Typography, Button, Box } from "@mui/material";
import "./Modal.scss";

const ImagePreviewModal = (props: {
  imageUrl: {
    image: string;
    isImage: boolean;
  };
  setImageUrl: CallableFunction;
}) => {
  const { imageUrl, setImageUrl } = props;
  return (
    <>
      <Modal
        open={imageUrl?.image?.length > 0}
        onClose={() =>
          setImageUrl({
            ...imageUrl,
            image: "",
          })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalStyle">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {imageUrl?.image && imageUrl?.isImage ? (
              <img src={`${imageUrl?.image}`} alt="" className="imgPreview" />
            ) : (
              <p>No Photo Added!</p>
            )}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              onClick={() => {
                setImageUrl({
                  ...imageUrl,
                  image: "",
                });
              }}
              variant="contained"
              className="cancelButton"
            >
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ImagePreviewModal;
