
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
        modulesDirectories: ['node_modules', './app'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            // ES6 & up
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            // LESS
            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less"
            },
        ]
    },
    watch: true
};

module.exports = config;