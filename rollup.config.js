import fs from 'fs';
import path from 'path';
import filesize from 'rollup-plugin-filesize';
import { uglify } from "rollup-plugin-uglify";
import {terser} from 'rollup-plugin-terser';

import commonPlugins from "./scripts/commonPlugins";

const pkg = require("./package.json");

const IS_DEV = process.env.NODE_ENV === "development"
const BABEL_ENV = process.env.BABEL_ENV || 'umd';

const getFiles = (entry, extensions=[], excludeExtensions = []) => {
    let fileNames = [];
    const dirs = fs.readdirSync(entry);
    dirs.forEach((dir) => {
        const path = `${entry}/${dir}`;
        if (fs.lstatSync(path).isDirectory()) {
            fileNames = [
                ...fileNames,
                ...getFiles(path, extensions, excludeExtensions),
            ];

            return;
        }
        if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
            && extensions.some((ext) => dir.endsWith(ext))
        ) {
            fileNames.push(path);
        }
    });
    return fileNames;
}
const globals = {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'antd':"antd",
    'react-i18next':'reactI18next',
    "tiklab-core-ui":"tiklabCoreUi",
    "@ant-design/icons":"icons",
    'mobx-react':'mobxReact',
    'mobx':'mobx',
    "react-router-dom":"reactRouterDom"
};


const extensions = ['.js', '.jsx',]

const umdOutput = {
    format: 'umd',
    name: 'tiklab-arbess-ui',
    globals,
    assetFileNames: '[name].[ext]'
};
const esOutput = {
    globals,
    preserveModules: true,
    preserveModulesRoot: 'components',
    exports: 'named',
    assetFileNames: ({name}) => {
        console.log(name)
        const {ext, dir, base} = path.parse(name);
        if (ext !== '.css') return '[name].[ext]';
        // 规范 style 的输出格式
        return path.join(dir, 'style', base);
    },
}

const external = Object.keys(pkg.peerDependencies || {}).concat('react-dom')

export default () => {
    switch (BABEL_ENV) {
        case 'umd':
            console.log(BABEL_ENV, 'BABEL_ENV-umd')
            return [{
                input: 'src/ui.js',
                output: {...umdOutput, file: `dist/${pkg.name}.development.js`,sourcemap: true,},
                external,
                // 使用gulpfile 抽离css
                plugins: [ ...commonPlugins, filesize()]
            }, {
                input: 'src/ui.js',
                output: {...umdOutput, file: `dist/${pkg.name}.production.min.js`, plugins: [terser(), uglify()]},
                external,
                // 使用gulpfile 抽离css
                plugins: [ ...commonPlugins, filesize(), terser()]
            }];
        case "esm":
            return {
                input: [
                    'src/ui.js',
                    ...getFiles('./src', extensions),
                ],
                output: { ...esOutput, dir: 'es', format: 'es', sourcemap: IS_DEV},
                external,
                plugins: [ ...commonPlugins]
            };
        case 'cjs':
            return {
                input: [
                    'src/ui.js',
                    ...getFiles('./src', extensions),
                ],
                preserveModules: true, // rollup-plugin-styles 还是需要使用
                output: { ...esOutput, dir: 'lib', format: 'cjs', sourcemap: IS_DEV},
                external,
                // plugins: [styles(esStylePluginConfig), ...commonPlugins]

                plugins: [ ...commonPlugins]
            };
        default:
            return [];
    }
}
