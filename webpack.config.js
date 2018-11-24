
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "appSrc");

var config = {
    entry: [
        SRC_DIR + "/app/index.js",
        SRC_DIR + "/style/main.less",
    ],
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    resolve: {
        modules: ['node_modules', './app'],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            // ES6 & up
            {
                test: /\.js?/,
                include: SRC_DIR,
                use: "babel-loader"
            },
            // LESS
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"]
            },
        ]
    },
    watch: true
};

module.exports = config;