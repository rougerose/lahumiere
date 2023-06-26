import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";

const output_plugins = [process.env.NODE_ENV === "production" && terser()];

export default [
  {
    input: "_src/js/app.js",
    output: [
      {
        file: "js/app.js",
        format: "iife",
        plugins: output_plugins,
      },
    ],
  },
];
