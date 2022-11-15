
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// const requireContext = require.context("./images", true, /^\.\/.*\.png$/);
// const images = requireContext.keys().map(requireContext);


