const BABEL_ENV = process.env.BABEL_ENV || 'umd';
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === "development";

export {
    BABEL_ENV,
    NODE_ENV,
    IS_DEV
}
