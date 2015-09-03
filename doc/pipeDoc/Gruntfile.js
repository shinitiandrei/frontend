'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    // Define the configuration for all the tasks
    grunt.initConfig({


        pipeLineDoc: {
            app: 'app'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {

            js: {
                files: ['<%= pipeLineDoc.app %>/scripts/{,*/}*.js', '<%= pipeLineDoc.app %>/{,*/}*.json'],
                tasks: ['jshint:all'],
                options: {
                    livereload: true
                }
            },

            compass: {
                files: ['<%= pipeLineDoc.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                tasks: [],
                files: [
                    '<%= pipeLineDoc.app %>/{,*/}*.html',
                    '<%= pipeLineDoc.app %>/styles/{,*/}*.css',
                    '<%= pipeLineDoc.app %>/styles/{,*/}*.scss',
                    '<%= pipeLineDoc.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9005,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729,
            },
            livereload: {
                options: {
                    open: true,
                    base: ['<%= pipeLineDoc.app %>']
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= pipeLineDoc.app %>/scripts/main*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },


        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= pipeLineDoc.app %>/styles',
                cssDir:  '<%= pipeLineDoc.app %>/styles',
                generatedImagesDir: '<%= pipeLineDoc.app %>/images/generated',
                imagesDir: '<%= pipeLineDoc.app %>/images',
                javascriptsDir: '<%= pipeLineDoc.app %>/scripts',
                fontsDir: '<%= pipeLineDoc.app %>/styles/fonts',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },

            server: {
                options: {
                    debugInfo: false,
                    cssDir: '<%= pipeLineDoc.app %>/styles',
                }
            }
        },

        cdn: {
            options: {
                cdn: '<%= metaConfig.cdn %>',
                flatten: true
            },
            dist: {
                src: ['<%= metaConfig.metaPath %><%= metaConfig.metaTemplate %>/*.html']
            }
        }

    });

    grunt.registerTask('serve', function() {
        grunt.task.run([
            'compass:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('default', [
        'serve'
    ]);

};