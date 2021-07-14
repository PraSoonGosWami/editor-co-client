import CustomDialog from "../custom-dialog";

const TutorialDialog = ({ open, onClose }) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Welcome to Editor-Co"
      primaryCTA={onClose}
      primaryText={"Got it"}
      onlyPrimaryCTA
    >
      <ul style={{ paddingRight: 12 }}>
        <li>
          Now edit your documents with your friends and colleagues in realtime
        </li>
        <li>Just create a document</li>
        <li>Click on share button on the top right corner</li>
        <li>
          Add emails of your friends and colleagues and share them the link
        </li>
        <li>And thats it. Enjoy your collaborative editing </li>
      </ul>
    </CustomDialog>
  );
};

export default TutorialDialog;
