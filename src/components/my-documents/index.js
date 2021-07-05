import { useEffect, useState } from "react";
import DocumentCard from "../document-cards";
import SearchInput from "../search-input";
import { getAllDocuments } from "../../api";
import classes from "./styles.module.css";

const MyDocuments = () => {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments()
      .then((res) => {
        setDocuments(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={classes.myDocuments}>
      <div className={classes.docQuery}>
        <SearchInput />
        <section></section>
      </div>
      <div className={classes.myDocumentsContainer}>
        {!isLoading &&
          documents?.length > 0 &&
          documents.map((document) => {
            return <DocumentCard key={document._id} {...document} />;
          })}
      </div>
    </div>
  );
};

export default MyDocuments;
