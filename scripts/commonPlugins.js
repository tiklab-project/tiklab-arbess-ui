import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
// rollup 的 babel 插件，ES6转ES5
import babel from '@rollup/plugin-babel';
// 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
import replace from '@rollup/plugin-replace'
// 将非ES6语法的包转为ES6可用
import commonjs from '@rollup/plugin-commonjs';
// 用于处理css
import postcss from "rollup-plugin-postcss";
// 可以将.json文件转为es6模块供rollup处理
import json from '@rollup/plugin-json';

import image from '@rollup/plugin-image';

import {NODE_ENV} from './constant';

const extensions = ['.js', '.jsx']

const commonPlugins = [
    peerDepsExternal(),
    nodeResolve({
        extensions
    }),
    babel({
        babelHelpers: 'inline',
        exclude: /^(.+\/)?node_modules\/.+$/
    }),
    commonjs(),
    json(),
    postcss(),
    replace({
        // exclude: 'node_modules/**',
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        preventAssignment:true,
    }),
    image({
        output: `dist/images`,
        extensions: /\.(png|jpg|jpeg|gif|svg)$/,
        limit: 8192
    })
];

export default commonPlugins;
