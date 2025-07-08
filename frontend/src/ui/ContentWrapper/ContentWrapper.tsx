import React from "react";
import styles from "./ContentWrapper.module.scss";

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ContentWrapper = ({ children, className }: ContentWrapperProps) => {
  return <div className={`${styles.wrapper} ${className || ""}`}>{children}</div>;
};

export default ContentWrapper;
