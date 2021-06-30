const TopBarStyle = (theme) => {
  return {
    root: {
      flexGrow: 1,
      padding: "0 12px",
      minWidth: 250,
    },
    AppBar: {
      backgroundColor: "rgba(255,255,255,0.6)",
    },

    title: {
      flexGrow: 1,
      textTransform: "capitalize",
      letterSpacing: "1px",
      fontSize: 22,
    },
  };
};

export default TopBarStyle;
