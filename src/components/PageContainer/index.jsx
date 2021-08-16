import React from "react";
import style from "./PageContainer.module.sass";

export default function PageWrapper({ children }) {
  return <div className={style.main}>{children}</div>;
}
