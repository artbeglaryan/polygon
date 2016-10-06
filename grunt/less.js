export default {
    build: {
        files: {
            'build/<%= package.name %>.css': [ 'src/app.less' ]
        }
    },
    dist: {
        options: {
            compress: true,
            sourceMap: true,
            outputSourceFiles: true,
            sourceMapURL: 'polygon.css.map',
            sourceMapIn: 'build/<%= package.name %>-.css.map'
        },
        files: {
            'dist/<%= package.name %>.css': [ 'src/app.less' ]
        }
    }
};
