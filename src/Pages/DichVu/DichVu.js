import React, { useEffect } from "react";

const DichVu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>DichVu</div>;
};

export default DichVu;
