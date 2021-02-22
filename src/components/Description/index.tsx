import classes from "./Description.module.css";

export const Description: React.VFC = () => {
  return (
    <main className={classes.description}>
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
          distinct names to all the 16,777,216 colors in the RGB namespace.
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
        <pre>
          <code>{`import { fromRGB, toRGB } from "everycolor";

console.log(fromRGB(255, 0, 0)); // "red"
console.log(fromRGB(255, 128, 128)); // "redhalfwhite"

console.log(toRGB("red")); // { r: 255, g: 0, b: 0 };
console.log(toRGB("readhalfwhite")); // { r: 255, g: 128, b: 128 }`}</code>
        </pre>
      </section>
      <section>
        <h1>PostCSS</h1>
        <p>
          We also provide a PostCSS plugin <code>everycolor/postcss</code>. With
          this plugin, you can use Everycolor names in your CSS.{" "}
          <a
            href="https://github.com/uhyo/everycolor-website/blob/main/src/styles/globals.css"
            target="_blank"
            rel="external noopener"
          >
            Check out how nice it looks
          </a>
          .
        </p>
      </section>
      <section>
        <h1>Resources</h1>
        <ul>
          <li>
            <a
              href="https://github.com/uhyo/everycolor"
              target="_blank"
              rel="external noopener"
            >
              GitHub (everycolor package)
            </a>
          </li>
          <li>
            <a
              href="https://github.com/uhyo/everycolor-website"
              target="_blank"
              rel="external noopener"
            >
              GitHub (this website)
            </a>
          </li>
        </ul>
        <p>
          All kinds of help, including bug reports, bug fixes and also name
          change suggestions, are welcome.
        </p>
      </section>
    </main>
  );
};
