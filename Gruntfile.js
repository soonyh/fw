/*  http://www.cnblogs.com/hubcarl/p/4095122.html
    参考：
    uglify: 
    http://www.cnblogs.com/artwl/p/3449303.html
    http://blog.csdn.net/mazhimazh/article/details/42456329


    expand：如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
    cwd：需要处理的文件（input）所在的目录。
    src：表示需要处理的文件。如果采用数组形式，数组的每一项就是一个文件名，可以使用通配符。
    dest：表示处理后的文件名或所在目录。
    ext：表示处理后的文件后缀名。

    grunt-contrib-clean：删除文件。
    grunt-contrib-compass：使用compass编译sass文件。
    grunt-contrib-concat：合并文件。
    grunt-contrib-copy：复制文件。
    grunt-contrib-cssmin：压缩以及合并CSS文件。
    grunt-contrib-imagemin：图像压缩模块。
    grunt-contrib-jshint：检查JavaScript语法。
    grunt-contrib-uglify：压缩以及合并JavaScript文件。
    grunt-contrib-watch：监视文件变动，做出相应动作。
*/
module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    require("time-grunt")(grunt);
    config = {
        src: 'src',
        build: 'build'
    }
    grunt.initConfig({
        config: config,
        copy: {
            main: {
                expand: true,
                cwd: '<%= config.src %>/',
                src: '**/*',
                dest: '<%= config.build %>/'
            }
        },
        replace: {
            test: {
                options: {
                    //force: false, // Boolean类型，默认为true。为true时复制所有文件到dest，即使该文件没有任何匹配内容
                    patterns: [{
                        match: 'global-css',
                        replacement: '<%= grunt.file.read("build/resources/include/global-css.html") %>'
                    }, {
                        match: 'global-bar-tab',
                        replacement: '<%= grunt.file.read("build/resources/include/global-bar-tab.html") %>'
                    }, {
                        match: 'global-js',
                        replacement: '<%= grunt.file.read("build/resources/include/global-js.html") %>'
                    }, {
                        match: 'global-header',
                        replacement: '<%= grunt.file.read("build/resources/include/global-header.html") %>'
                    }, {
                        match: 'global-panel',
                        replacement: '<%= grunt.file.read("build/resources/include/global-panel.html") %>'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: '<%= config.src %>/',
                    src: ['**/*.html'],
                    dest: '<%= config.build %>/'
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    config: '<%= config.src %>/resources/css/config.rb'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/resources/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.build %>/resources/css',
                    ext: '.min.css'
                }]
            }
        },
        clean: ["<%= config.build %>/resources/include", "<%= config.build %>/resources/css/*.rb","<%= config.build %>/resources/css/*.scss"],
        watch: {
            scripts: {
                files: '<%= config.src %>/**/*',
                tasks: ['copy:main', 'replace', 'compass'],
                options: {
                    debounceDelay: 250,
                },
            },
            client: {
                files: '<%= config.src %>/**/*',
                options: {
                    livereload: true
                }
            }
        },
        processhtml: {
            main: {
                expand: true,
                cwd: '<%= config.build %>/resources/include/',
                src: ['global-js.html'],
                dest: '<%= config.build %>/resources/include/'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    '<%= config.build %>/resources/scripts/app.js': ['<%= config.src %>/resources/scripts/app.js']
                }
            }
        },
        htmlmin: { // Task 
            dist: { // Target 
                options: { // Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files 
                    '<%= config.build %>/syncProduct.jsp': '<%= config.src %>/syncProduct.jsp', // 'destination': 'source' 
                    '<%= config.build %>/syncOffer.jsp': '<%= config.build %>/syncOffer.jsp'
                }
            }
        }
    });
    // 默认任务
    grunt.registerTask('default', ['copy', 'replace:test', 'compass','clean', 'watch']);
    grunt.registerTask('release', ['copy', 'processhtml','replace:test', 'compass','clean']);
}
