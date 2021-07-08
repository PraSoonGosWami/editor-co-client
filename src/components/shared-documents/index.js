import { useEffect, useState } from "react";
import DocumentCard from "../document-cards";
import SearchInput from "../search-input";
import { getAllSharedDocuments } from "../../api";
import classes from "../my-documents/styles.module.css";

const MyDocuments = ({ value, index }) => {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllSharedDocuments()
      .then((res) => {
        setDocuments(res?.data || []);
      })
      .catch((err) => {
        console.log(err);
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
      {!isLoading && (
        <div className={classes.docQuery}>
          <SearchInput />
          <section></section>
        </div>
      )}

      <div className={classes.myDocumentsContainer}>
        {!isLoading &&
          documents?.editor &&
          documents["editor"].map((document) => {
            return (
              <DocumentCard
                key={document._id}
                accessText="You have editor access"
                {...document}
              />
            );
          })}
        {!isLoading &&
          documents?.viewer &&
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
    </div>
  );
};

export default MyDocuments;
