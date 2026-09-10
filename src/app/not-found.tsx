import Spline from "@splinetool/react-spline";
import React, { Suspense } from "react";

const NotFoundPage = () => {
  return (
    <main id="main-content" tabIndex={-1}>
      <h1 className="sr-only">Page not found</h1>
      <Suspense fallback={null}>
        <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
      </Suspense>
    </main>
  );
};

export default NotFoundPage;
