/**
 * @description Material UI styles for custom button
 */
const ButtonBaseStyle = {
  borderRadius: 8,
  height: 42,
  padding: "0 30px",
  minWidth: 180,
  textTransform: "capitalize",
};

export const CustomButtonStyle = {
  root: { ...ButtonBaseStyle },
};

export const CustomGoogleButtonStyle = {
  root: {
    ...ButtonBaseStyle,
    background: "linear-gradient(45deg, #4285f4 30%, #4285f4 90%)",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
};
