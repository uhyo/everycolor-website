import classes from "./Page.module.css";

export const Page: React.FC = ({ children }) => {
  return <div className={classes.page}>{children}</div>;
};
