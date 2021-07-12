const goBack = (history) => {
  history.length > 2 ? history.goBack() : history.replace("/dashboard");
};

export default goBack;
