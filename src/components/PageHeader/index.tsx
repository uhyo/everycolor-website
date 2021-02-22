import { ColorInput } from "../ColorInput";
import classes from "./PageHeader.module.css";

export const PageHeader: React.VFC = () => {
  return (
    <div>
      <header className={classes.wrapper}>
        <h1 className={classes.title}>Everycolor</h1>
        <p className={classes.description}>Gives name to every color.</p>
      </header>
      <div className={classes.colorInput}>
        <ColorInput />
      </div>
    </div>
  );
};
