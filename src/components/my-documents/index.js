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
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllDocuments()
      .then((res) => {
        setData(res?.data?.data || []);
        setDocuments(res?.data?.data || []);
      })
      .catch((err) => {
        alert.error(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const searchHandler = (event) => {
    const value = event.target.value;
    if (!value || value?.length === 0) setDocuments([...data]);
    const filterdData = data.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );

    setDocuments([...filterdData]);
  };

  return (
    <div
      className={classes.myDocuments}
      role="tabpanel"
      hidden={value !== index}
    >
      {!isLoading ? (
        <>
          {data?.length > 0 ? (
            <div className={classes.docQuery}>
              <SearchInput onChange={searchHandler} />
            </div>
          ) : (
            <Typography variant="h6">
              Seems like you have not created any document yet
            </Typography>
          )}
          {documents?.length > 0 && (
            <div className={classes.myDocumentsContainer}>
              {documents.map((document) => {
                return <DocumentCard key={document._id} {...document} />;
              })}
            </div>
          )}
          {documents?.length <= 0 && data?.length > 0 && (
            <Typography variant="h6">
              No results found for your query
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
