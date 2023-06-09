import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import typescript2 from "rollup-plugin-typescript2";
import image from "@rollup/plugin-image";
import multiInput from "rollup-plugin-multi-input";
import { babel } from "@rollup/plugin-babel";

import pkg from "./package.json";

export default [
  {
    input: [
      { [path.parse(pkg.module).name]: "src/libs/index.ts"},
      {
        "defaultIconImport.unicorn":
        "src/libs/components/Icon/defaultIconImport.unicorn.ts"
      }
    ],
    external: id =>
      [...Object.keys(pkg.dependencies),"@mui",'tslib'].some(name =>
        id.startsWith(name),
      ),
    plugins: [
      multiInput(),
      resolve(),

      typescript2({ tsconfig: path.resolve(__dirname,"src/libs/tsconfig.json")}),
      babel({
        babelHelpers: "bundled",
        plugins: ["annotate-pure-calls"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      json(),
      image(),
    ],
    output: [
      {
        dir: path.dirname(pkg.module),
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src/libs",
      },
    ],
  },
];
