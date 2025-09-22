import React, { useEffect } from "react";
import BasaicModal from "./BasaicModal";

const Summary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BasaicModal />
      <h1 style={{ textAlign: "center", margin: "20px 0 250px" }}>
        Order Placed
      </h1>
    </div>
  );
};

export default Summary;
