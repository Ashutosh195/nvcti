import React, { useEffect, lazy, Fragment,  Suspense } from "react";
import Loading from "../components/common/Loading";
import FlagshipMain from "../components/events-page/flagship-events/FlagshipMain";

const NavbarComponent = lazy(() => import("../components/common/navbar"));
const Footer = lazy(() => import("../components/common/footer"));
const SingleEventCover = lazy(() => import("../components/events-page/single-event-cover"));
const FlagshipInfo = lazy(() => import("../components/events-page/flagship-events/info"));

function FlagshipEvents(){
  
  useEffect(() => {
    const func = () => {
      document.title = "Flagship Events | NVCTI";
    };
    func();
  }, []);

    return (
      <Fragment>
        <Suspense fallback={<Loading/>}>
          <NavbarComponent variant="transparent" />
          <SingleEventCover keyword="flagship" title="Flagship Events" />
          <FlagshipInfo />
          <FlagshipMain />
          <Footer extraStyle={{ marginTop: "0" }} />
        </ Suspense>
      </Fragment >
    );
}

export default FlagshipEvents; 
