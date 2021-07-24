import withNetwork from "../../utils/with-network";
const ErrorChip = ({ isDisconnected }) => {
  return (
    <div
      style={{
        display: isDisconnected ? "block" : "none",
        position: "fixed",
        top: 16,
        zIndex: "999999",
        left: "50%",
        padding: "4px 12px 6px 12px",
        borderRadius: 6,
        textAlign: "center",
        backgroundColor: "red",
        color: "white",
        transform: "translateX(-50%)",
        fontSize: 13,
        fontWeight: "600",
      }}
    >
      You seem to be offline.{" "}
      <a href={window.location.href} style={{ color: "white" }}>
        Refresh
      </a>
    </div>
  );
};

export default withNetwork(ErrorChip);
