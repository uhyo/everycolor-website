import { ColorInput } from "../ColorInput";
import classes from "./PageHeader.module.css";

type Props = {
  initialColor?: string;
};

export const PageHeader: React.VFC<Props> = ({ initialColor }) => {
  return (
    <div>
      <header className={classes.wrapper}>
        <h1 className={classes.title}>Everycolor</h1>
        <p className={classes.description}>Gives name to every color.</p>
      </header>
      <div className={classes.colorInput}>
        <ColorInput initialColor={initialColor} />
      </div>
    </div>
  );
};
