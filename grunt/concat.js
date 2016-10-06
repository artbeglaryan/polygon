export default (grunt, config) => {
    return {
        src: {
            options: {
                // replace all 'use strict' statements with a single one at the top
                banner: '\'use strict\';\n',
                process (src, filepath) {
                    return '// ' + filepath + '\n\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                },
                sourceMap: false
            },
            src: config.src,
            dest: 'build/<%= package.name %>.js',
            nonull: true
        }
    };
};
