import classes from "./Description.module.css";

export const Description: React.VFC = () => {
  return (
    <main className={classes.wrapper}>
      <section>
        <h1>What?</h1>
        <p>
          A Japanese engineer said,{" "}
          <i>
            <a
              href="https://twitter.com/the_uhooi/status/1361923940000489472"
              target="_blank"
              rel="external noopener"
            >
              what if all color codes are given their own names?
            </a>
          </i>{" "}
          Here it is! The <code>everycolor</code> package is here to give
          distinct names to all the 16,777,216 colors in the RGB namespace!
        </p>
      </section>
      <section>
        <h1>Usage</h1>
        <pre>
          <code>npm install everycolor</code>
        </pre>
        <p>
          The{" "}
          <a
            href="https://www.npmjs.com/package/everycolor"
            target="_blank"
            rel="external noopener"
          >
            everycolor
          </a>{" "}
          package provides two functions, <code>fromRGB</code> and{" "}
          <code>toRGB</code>. These functions are useful for conversion between
          RGB values and color names.
        </p>
      </section>
      <section>
        <h1>PostCSS</h1>
        <p>
          We also provide a PostCSS plugin <code>everycolor/postcss</code>. With
          this plugin, you can use Everycolor names in your CSS.
        </p>
      </section>
    </main>
  );
};
