import React, { useEffect, Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
const LabinchargeHeader = lazy(() => import("../components/Admin/LabInchargeDashboard/header"));
const LabinchargeMain = lazy(() => import("../components/Admin/LabInchargeDashboard/main"));


const LabInchargeDashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | NVCTI";
    document.body.style.backgroundColor = "#eef5f9";
    return () => (document.body.style.backgroundColor = null);
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <LabinchargeHeader />
      <LabinchargeMain />
    </Suspense>
  )
};

export default LabInchargeDashboard;
