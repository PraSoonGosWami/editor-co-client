const TopBarStyle = (theme, showBackButton) => {
  return {
    root: {
      flexGrow: 1,
      minWidth: 250,
    },

    AppBar: {
      backgroundColor: "#f9f9f9",
    },

    AppBarHeader: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
    },

    BackButton: {
      padding: 0,
      marginRight: 8,
    },

    title: {
      textTransform: "capitalize",
      letterSpacing: "1px",
      fontSize: 22,
      [theme.breakpoints.down("sm")]: {
        display: showBackButton ? "none" : "block",
      },
    },
    subTitle: {
      textTransform: "capitalize",
      fontSize: 18,
      fontWeight: "bolder",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      maxWidth: 320,
      [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        marginRight: 20,
        marginLeft: 20,
      },
    },
    avatar: {
      cursor: "pointer",
      width: "35px",
      height: "35px",
      marginLeft: "12px",
    },
  };
};

export default TopBarStyle;
