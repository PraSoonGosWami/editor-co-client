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
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getAllSharedDocuments()
      .then((res) => {
        setData(res?.data || {});
        setDocuments(res?.data || {});
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
    if (!value || value?.length === 0) setDocuments({ ...data });
    const filterdEditor = data.editor.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    const filterdViewer = data.viewer.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    setDocuments({ editor: [...filterdEditor], viewer: [...filterdViewer] });
  };

  return (
    <div
      className={classes.myDocuments}
      role="tabpanel"
      hidden={value !== index}
    >
      {!isLoading ? (
        <>
          {(data?.editor.length > 0 || data?.viewer.length > 0) && (
            <div className={classes.docQuery}>
              <SearchInput onChange={searchHandler} />
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
          {documents?.editor?.length <= 0 &&
            documents?.viewer?.length <= 0 &&
            data?.editor?.length > 0 &&
            data?.viewer?.length > 0 && (
              <Typography variant="h6">
                No results found for your query
              </Typography>
            )}
          {data?.editor?.length <= 0 && data?.viewer?.length <= 0 && (
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
