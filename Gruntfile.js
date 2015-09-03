// Generated on 2014-01-27 using generator-angular 0.7.1
'use strict';
module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define a global variable
    var globalConfig = {};

    // Define the configuration for all the tasks
    grunt.initConfig({

        globalConfig : globalConfig,

        yeoman: {

            app: require('./bower.json').appPath || 'app',
            cdn : 'https://jsuol.com.br/bk/sac/default/',
            cdnImg : 'https://imguol.com/p/sac/uol/',
            cdnSameDomain : 'https://jsuol.com.br/bk/sac/default/',
            cdnVersion : '0.0.3',

            tmpBase : '.tmp',
            cameleonRepositoryPlace: '../meta-templates-prod/sac.uol.com.br/sac-metatemplate<%= globalConfig.target %>',
            metaTemporaryPlace: '<%= yeoman.tmpBase %>/.tmpMeta<%= globalConfig.target %>',
            htdocsSymLinkPlace: '<%= yeoman.tmpBase %>/.tmpReady<%= globalConfig.target %>',

            fileList : [
                '*.{ico,png,txt,html,inc,xml,js,json,css}',
                'scripts/**/*',
                'styles/*.css',
                '!styles/main.css',
                'views/**/*',
                'bower_components/**/*',
                'images/**/*',
                'fonts/**/*',
                'favicons/**/*'
            ],

            fileDistList : [
                'scripts/**/*'
            ],

            fileMetaList : [
                '*.{txt,html,xml}',
                'images/**/*',
                'setup.json',
                'config.json',
                'indexSamedomain.html',
                'camaleonBridge.js',
                'views/**/*'
            ]
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {

            js: {
                files: [
                    '<%= yeoman.app %>/scripts/**/*.{json,js}'
                ],
                tasks: ['buildJs:<%= globalConfig.target %>']
            },

            setups: {
                files: [
                    '<%= yeoman.app %>/setup*'
                ],
                tasks: ['buildSetups:<%= globalConfig.target %>']
            },

            jsTest: {
                files: ['test/spec/**/*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },

            images: {
                files: ['<%= yeoman.app %>/images/**/*.*'],
                tasks: ['buildImg:<%= globalConfig.target %>' ]
            },

            compass: {
                files: ['<%= yeoman.app %>/styles/**/*.{css,scss,sass}'],
                tasks: ['buildCompass:<%= globalConfig.target %>' ]
            },

            views: {
                tasks: [ 'buildView:<%= globalConfig.target %>' ],
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/views/{,*/}*.{html,inc}',
                    '<%= yeoman.app %>/views/includes/{,*/}*.inc'
                ]
            },

            bridges: {
                tasks: [ 'buildBridge:<%= globalConfig.target %>' ],
                files: [
                    '<%= yeoman.app %>/camaleonBridge.js'
                ]
            }

        },

        connect: {

            options: {
                port: 9005,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'sac.uol.com.br',
                livereload: 35729
            },

            test: {
                options: {
                    port: 9006,
                    hostname: 'localhost',
                    base: [
                        '<%= yeoman.htdocsSymLinkPlace %>',
                        'test'
                    ]
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
                //,reporter: require('jshint-stylish')
            },
            all: [
                '!Gruntfile.js',
                '<%= yeoman.app %>/scripts/**/*.js',
                '!<%= yeoman.app %>/scripts/uol-bootstrap.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {

            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.tmpBase %>/*',
                        '<%= yeoman.cameleonRepositoryPlace %>/*',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            meta: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.cameleonRepositoryPlace %>/scripts',
                        '<%= yeoman.cameleonRepositoryPlace %>/styles',
                        '<%= yeoman.cameleonRepositoryPlace %>/images',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            server: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.htdocsSymLinkPlace %>',
                        '<%= yeoman.metaTemporaryPlace %>/*',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            js: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.htdocsSymLinkPlace %>/scripts/*',
                        '<%= yeoman.metaTemporaryPlace %>/scripts/*',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            setups: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.htdocsSymLinkPlace %>/*.json',
                        '<%= yeoman.metaTemporaryPlace %>/*.json',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            img: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.htdocsSymLinkPlace %>/images/*',
                        '<%= yeoman.metaTemporaryPlace %>/images/*',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            compass: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.htdocsSymLinkPlace %>/styles/*',
                        '<%= yeoman.metaTemporaryPlace %>/styles/*',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            },

            views: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.htdocsSymLinkPlace %>/views/*',
                        '<%= yeoman.metaTemporaryPlace %>/views/*',
                        '!<%= yeoman.cameleonRepositoryPlace %>/.git*'
                    ]
                }],
                options : {
                    force: true
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.metaTemporaryPlace %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%= yeoman.metaTemporaryPlace %>/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep : {
            target: {
                src: [
                    '<%= yeoman.app %>/*.html'
                ]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                specify : '<%= yeoman.app %>/styles/main.scss',
                cssDir: '<%= yeoman.htdocsSymLinkPlace %>/styles',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                cacheDir : '<%= yeoman.tmpBase %>/.sass-cache',
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    debugInfo: false,
                    cacheDir : '<%= yeoman.tmpBase %>/.sass-cache',
                    cssDir: '<%= yeoman.app %>/styles'
                }
            },
            server: {
                options: {
                    debugInfo: false,
                    cacheDir : '<%= yeoman.tmpBase %>/.sass-cache',
                    cssDir : '<%= yeoman.metaTemporaryPlace %>/styles'
                }
            },

            server_fast : {

                options: {
                    debugInfo: false,
                    cacheDir : '<%= yeoman.tmpBase %>/.sass-cache',
                    cssDir : '<%= yeoman.htdocsSymLinkPlace %>/sac-metatemplate/styles'
                }

            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.cameleonRepositoryPlace %>/scripts/{,*/}*.js',
                        '<%= yeoman.cameleonRepositoryPlace %>/styles/{,*/}*.css',
                        '<%= yeoman.cameleonRepositoryPlace %>/images/*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/*.{html,inc}',
            options: {
                dest: '<%= yeoman.cameleonRepositoryPlace %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.cameleonRepositoryPlace %>/**/*.{html,inc}'],
            css:  ['<%= yeoman.cameleonRepositoryPlace %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= yeoman.cameleonRepositoryPlace %>/images',
                    '<%= yeoman.cameleonRepositoryPlace %>/',
                    '<%= yeoman.cameleonRepositoryPlace %>/views'
                ]
            }
        },

        // Minifies all HTML files
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.cameleonRepositoryPlace %>',
                    src: ['views/**/*.{html,inc}', '!views/includes/dynamicalyAddStaticFilesOnBottom.inc', '!views/includes/dynamicalyAddStaticFilesOnTop.inc' ],
                    dest: '<%= yeoman.cameleonRepositoryPlace %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        appendit: {

            options: {
                cdn: '<%= yeoman.cdn %>',
                flatten: true
            },

            html: {
                options: {
                    cdn: '<%= yeoman.cdn %>',
                    appender: '?debug=true&version=<%= yeoman.cdnVersion %>',
                    flatten: true
                },
                src: [
                        '<%= yeoman.cameleonRepositoryPlace %>/*.html'
                     ]
            },

            img: {
                options: {
                    cdn: '<%= yeoman.cdnImg %>',
                    flatten: true
                },
                src: [
                        '<%= yeoman.htdocsSymLinkPlace %>/sac-metatemplate/styles/*.styles.css',
                        '<%= yeoman.htdocsSymLinkPlace %>/sac-metatemplate/views/**/*.{html,inc}',
                        '<%= yeoman.cameleonRepositoryPlace %>/views/**/*.{html,inc}'
                    ]
            }
        },

        // Copies remaining files to places that other tasks can use
        copy: {

            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd:  '<%= yeoman.app %>',
                        dest: '<%= yeoman.cameleonRepositoryPlace %>',
                        src:  '<%= yeoman.fileDistList %>'
                    }
                ]
            },

            meta: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest:'<%= yeoman.cameleonRepositoryPlace %><%= globalConfig.target %>',
                        src: '<%= yeoman.fileMetaList %>'
                    }
                ]
            },

            serve: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.metaTemporaryPlace %>',
                        src: '<%= yeoman.fileList %>'
                    }
                ]
            },

            js: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.metaTemporaryPlace %>',
                        src: 'scripts/**/*.{js,json}'
                    }
                ]
            },

            setups: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.metaTemporaryPlace %>',
                        src: '*.json'
                    }
                ]
            },

            img: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.metaTemporaryPlace %>',
                        src: 'images/**/*'
                    }
                ]
            },

            views: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.metaTemporaryPlace %>',
                        src: ['*.html', 'views/**/*']
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Run jar to parse mustache tags (camaleao)
        shell: {
            MetaTemplateParse: {
                command: function () {
                    return 'java -jar  -Dfile.encoding=ISO-8859-1 -Dtemplate=<%= yeoman.metaTemporaryPlace %> -Djson=<%= yeoman.metaTemporaryPlace %>/setup<%= globalConfig.target %>.json -Dskin=<%= yeoman.htdocsSymLinkPlace %> install/fscommand/cam-skin-engine.jar';
                }
            },

            MetaTemplateParseDist: {
                command: function () {
                    return 'java -jar  -Dfile.encoding=ISO-8859-1 -Dtemplate=<%= yeoman.cameleonRepositoryPlace %> -Djson=<%= yeoman.cameleonRepositoryPlace %><%= globalConfig.target %>/setup<%= globalConfig.target %>.json -Dskin=<%= yeoman.htdocsSymLinkPlace %> install/fscommand/cam-skin-engine.jar';
                }
            }
        },


        jsdoc : {
            dist : {
                src: ['<%= yeoman.app %>/scripts'],
                options: {
                    destination: 'doc/jsDoc'
                }
            }
        },

        cssmin: {
            options: {
                banner: '/** UOL - Todos os direitos reservados */'
            }
        },

        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "SAC", // defaults to the name in package.json, or will use project directory's name
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },

        notify: {

            watch: {
                options: {
                    title: 'Task Complete',
                    message: 'SASS and Uglify finished running'
                }
            },

            server: {
                options: {
                    message: 'Server is ready!'
                }
            },

            compass: {
                options: {
                    message: 'CSS Ready!'
                }
            }
        }

    });




    /**
     * SERVE ===========================
     *  ================================
     */
    grunt.registerTask('serve', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run('buildServe:' + globalConfig.target );
    });

    grunt.registerTask('server', function() {
        grunt.log.warn('A task "server" nao esta mais em uso. Use `grunt serve` para iniciar um Node Server.');
        grunt.log.warn('Cheque a pasta Install desse projeto, ela contem um controlador de instalacoes e atalhos de grunt para Windows');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('buildServe', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'clean:server',
            'wiredep',
            'compass:server',
            //'autoprefixer',
            'copy:serve',
            'shell:MetaTemplateParse',
            'notify:server',
            'watch'
        ]);
    });

    grunt.registerTask('serveUOL', [
        'serve:uol'
    ]);

    grunt.registerTask('serveBOL', [
        'serve:bol'
    ]);

    grunt.registerTask('buildJs', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'newer:jshint:all',
            'clean:js',
            'copy:js',
            'shell:MetaTemplateParse'
        ]);
    });

    grunt.registerTask('buildSetups', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'clean:setups',
            'copy:setups',
            'shell:MetaTemplateParse'
        ]);
    });

    grunt.registerTask('buildBridge', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'copy:serve',
            'shell:MetaTemplateParse'
        ]);
    });

    grunt.registerTask('buildImg', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'clean:img',
            'copy:img',
            'shell:MetaTemplateParse'
        ]);
    });

    grunt.registerTask('buildCompass', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'clean:compass',
            'compass:server_fast',
            'notify:compass'
        ]);
    });

    grunt.registerTask('buildView', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run([
            'clean:views',
            'copy:views',
            'shell:MetaTemplateParse'
        ]);
    });








    /**
     * DIST JSUOL ===========================
     *  =====================================
     */
    grunt.registerTask('dist', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run('build:' + globalConfig.target );
    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'compass:dist',
        //'autoprefixer',
        'concat',
        'ngmin',
        'copy:meta',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin',
        'appendit:html',
        'shell:MetaTemplateParseDist',
        'appendit:img',
        'clean:meta'
        //,'jsdoc'
    ]);









    /**
     * DIST LOCAL =======================
     *  =================================
     */
    grunt.registerTask('distlocal', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run('buildlocal:' + globalConfig.target );
    });

    grunt.registerTask('buildlocal', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'compass:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:meta',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin',
        'shell:MetaTemplateParseDist'
    ]);








    /**
     * TEST ================================
     *  ====================================
     */
    grunt.registerTask('test', function(target) {
        globalConfig.target = target === 'uol' || target === undefined ? '' : target;
        grunt.task.run('buildTest:' + globalConfig.target );
    });

    grunt.registerTask('buildTest', [
        'clean:server',
        'wiredep',
        'copy:serve',
        'shell:MetaTemplateParse',
        'connect:test',
        'karma'
    ]);









    /**
     * DEFAULT ===========================
     *  ==================================
     */
    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'dist:uol'
    ]);



};
