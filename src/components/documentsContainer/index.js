import { useContext } from "react";
import { Typography } from "@material-ui/core";
import { DocumentContext } from "../../context/DocumentContext";
import DocumentCard from "../document-cards";
import classes from "./styles.module.css";

const DocumentContainer = () => {
  const { documents, docLoading } = useContext(DocumentContext);
  return (
    <div className={classes.docContainer}>
      <Typography>Filters</Typography>
      <div className={classes.cardsCotainer}>
        {!docLoading &&
          documents?.length > 0 &&
          documents.map((document) => {
            return <DocumentCard key={document._id} {...document} />;
          })}
      </div>
    </div>
  );
};

export default DocumentContainer;
