import { useEffect, useState } from "react";
import { withAlert } from "react-alert";
import DocumentCard from "../document-cards";
import Loader from "../loader";
import SearchInput from "../search-input";
import { getAllSharedDocuments } from "../../api";
import classes from "../my-documents/styles.module.css";
import { Typography } from "@material-ui/core";

const MyDocuments = ({ value, index, alert }) => {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllSharedDocuments()
      .then((res) => {
        setDocuments(res?.data || []);
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
        <>
          {(documents?.editor.length > 0 || documents?.viewer.length > 0) && (
            <div className={classes.docQuery}>
              <SearchInput />
            </div>
          )}
          <div className={classes.myDocumentsContainer}>
            {documents?.editor &&
              documents["editor"].map((document) => {
                return (
                  <DocumentCard
                    key={document._id}
                    accessText="You have editor access"
                    {...document}
                  />
                );
              })}
            {documents?.viewer &&
              documents["viewer"].map((document) => {
                return (
                  <DocumentCard
                    key={document._id}
                    accessText="You have viewer access"
                    {...document}
                  />
                );
              })}
          </div>
          {documents?.editor?.length <= 0 && documents?.viewer?.length <= 0 && (
            <Typography variant="h6">
              Seems like you don't have any documents shared with you
            </Typography>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withAlert()(MyDocuments);
