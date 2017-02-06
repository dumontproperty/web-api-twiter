"use strict"

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-html2js');

    // Lib/souces files management.

    function genSourcePaths(cwdPath, sourcePaths) {
        return {
            cwd: cwdPath,
            scripts: cwdPath + sourcePaths.scripts,
            templates: cwdPath + sourcePaths.templates,
            assets: cwdPath + sourcePaths.assets,
            css: cwdPath + sourcePaths.css,
            fonts: cwdPath + sourcePaths.fonts
        };
    }


    function genDistPaths(cwdPath) {
        return {
            cwd: cwdPath,
            scripts: cwdPath + "/scripts",
            libScripts: cwdPath + "/scripts/lib",
            templates: cwdPath + "/templates",
            assets: cwdPath + "/assets",
            libAssets: cwdPath + "/assets/lib",
            css: cwdPath + "/css",
            libCss: cwdPath + "/css/lib",
            fonts: cwdPath + "/fonts"
        };
    }

    const pkg = grunt.file.readJSON("package.json");

    const paths = {
        dev: genSourcePaths(pkg.paths.dev.cwd, pkg.paths.dev),
        dist: genDistPaths(pkg.paths.dist)
    };

    const distPaths = genDistPaths(pkg.paths.dist);

    const libJsFiles = pkg.paths.lib.jsFiles;

    const libCssFiles = pkg.paths.lib.cssFiles;

    const libAssetFiles = pkg.paths.lib.assetFiles;

    //Grunt tasks config
    grunt.initConfig({
        pkg: pkg,
        paths: paths,
        index: {
            paths: paths
        },
        clean: {
            options: {
                force: true
            },
            scripts: [paths.dist.scripts],
            css: [paths.dist.css],
            assets: [paths.dist.assets],
            templates: [paths.dist.assets]
        },
        sass: {
            dist: {
                options: {
                    sourcemap: "none",
                    style: "compact"
                },
                files: [{
                    src: ["**/app.scss"],
                    expand: true,
                    dest: paths.dist.css,
                    cwd: paths.dev.css,
                    ext: ".css"
                }]
            }
        },
        copy: {
            fonts: {
                files: [{
                    src: ["*.*"],
                    expand: true,
                    dest: paths.dist.fonts,
                    cwd: paths.dev.fonts
                }]
            },
            css: {
                files: [{
                    src: libCssFiles,
                    expand: true,
                    dest: paths.dist.libCss
                }]
            },
            assets: {
                files: [{
                    src: ["**"],
                    expand: true,
                    dest: paths.dist.assets,
                    cwd: paths.dev.assets
                }, {
                    src: libAssetFiles,
                    expand: true,
                    dest: paths.dist.libCss
                }]
            },
            favicon: {
                src: paths.dev.cwd + "/favicon.ico",
                expand: false,
                dest: paths.dist.cwd+ "/favicon.ico"
            }
        },
        concat: {
            scripts: {
                src: [
                    paths.dev.scripts + "/**/*.js"
                ],
                dest: paths.dist.scripts + "/3_app.js"
            },
            lib: {
                src: libJsFiles,
                dest: paths.dist.scripts + "/1_lib.js"
            }
        },
        html2js: {
            options: {
                base: paths.dev.cwd,
                indentString: "",
                quoteChar: "\"",
                module: "app-templates",
                singleModule: true,
                htmlmin: {
                    collapseWhitespace: true,
                    removeComments: true
                }
            },
            main: {
                src: [
                    paths.dev.templates + "/**/*.html",
                    paths.dev.scripts + "/**/*.html"
                ],
                dest: paths.dist.scripts + "/2_templates.js"
            }
        },
        uglify: {
            files: {
                "<%= concat.dist.dest %>": "<%= concat.dist.dest %>"
            }
        },
        cssmin: {
            files: [{
                expand: true,
                cwd: paths.dist.assets,
                src: "style.css",
                dest: paths.dist.assets,
                ext: ".min.css"
            }]
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',// Change this to '0.0.0.0' to access the server from outside.
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [connect.static(paths.dist.cwd)];
                    }
                }
            }
        },
        watch: {
            options: {
                livereload: 35729
            },
            templates: {
                files: [
                    paths.dev.templates + "/**/*.html"
                ],
                tasks: ["html2js"]
            },
            scripts: {
                files: [
                    paths.dev.scripts + "/**/*.js"
                ],
                tasks: ["concat:scripts"]
            },
            index: {
                files: [paths.dev.cwd + "/index.html"],
                tasks: ["index"]
            },
            css: {
                files: [
                    paths.dev.css + "/**/*.scss"
                ],
                tasks: ["sass"]
            },
            fonts:{
                files: [paths.dev.fonts + "/**/*.*"],
                tasks: ["copy:fonts"]
            }
        }
    });

    grunt.registerMultiTask("index", "build and copy index.html", function(target) {
        const paths = this.data;
        var scriptsFiles = grunt.file.expand(paths.dist.scripts + "/**/*.js");
        var cssFiles = grunt.file.expand(paths.dist.css + "/**/*.css");

        scriptsFiles = scriptsFiles.map(function(jsPath) {
            return jsPath.replace(new RegExp("^(" + paths.dist.cwd + "/)"), "");
        });

        cssFiles = cssFiles.map(function(cssPath) {
            return cssPath.replace(new RegExp("^(" + paths.dist.cwd + "/)"), "");
        });

        grunt.file.copy(paths.dev.cwd + "/index.html", paths.dist.cwd + "/index.html", {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        jsPaths: scriptsFiles,
                        cssPaths: cssFiles,
                        gcmProjectID: process.env.GCM_PROJECT_ID
                    }
                });
            }
        });
    });

    grunt.registerTask("build", ["clean", "copy", "html2js", "concat", "sass", "index"]);
    grunt.registerTask("dev", ["copy", "html2js", "concat", "sass", "index", "connect:livereload", "watch"]);
    grunt.registerTask("default", ["build"]);
};
