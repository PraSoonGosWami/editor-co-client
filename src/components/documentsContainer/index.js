import { useContext } from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { DocumentContext } from "../../context/DocumentContext";
import DocumentCard from "../document-cards";
import classes from "./styles.module.css";

const DocumentContainer = () => {
  const { documents, docLoading } = useContext(DocumentContext);
  return (
    <div className={classes.docContainer}>
      <div className={classes.docQuery}>
        <section className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search documents"
            inputProps={{ "aria-label": "search" }}
            style={{ width: "100%" }}
          />
        </section>
        <section></section>
      </div>
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
