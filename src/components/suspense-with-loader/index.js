import { Suspense } from "react";
import Loader from "../loader";

const SuspenseWithLoader = ({ children, noFallback }) => {
  return (
    <Suspense fallback={noFallback ? "" : <Loader />}>{children}</Suspense>
  );
};

export default SuspenseWithLoader;
