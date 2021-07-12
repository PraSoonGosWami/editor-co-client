import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { withAlert } from "react-alert";
import DocumentCard from "../document-cards";
import Loader from "../loader";
import SearchInput from "../search-input";
import { getAllDocuments } from "../../api";
import classes from "./styles.module.css";

const MyDocuments = ({ value, index, alert }) => {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments()
      .then((res) => {
        setDocuments(res?.data?.data || []);
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className={classes.myDocuments}
      role="tabpanel"
      hidden={value !== index}
    >
      {!isLoading ? (
        documents?.length > 0 ? (
          <>
            <div className={classes.docQuery}>
              <SearchInput />
              <section></section>
            </div>
            <div className={classes.myDocumentsContainer}>
              {documents.map((document) => {
                return <DocumentCard key={document._id} {...document} />;
              })}
            </div>
          </>
        ) : (
          <Typography variant="h6">
            Seems like you have not created any document yet
          </Typography>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withAlert()(MyDocuments);
