export default {
    src: {
        options: {
            sourceMap: false,
            sourceMapIn: 'build/<%= package.name %>.js.map',
            enclose: {
                window: 'window'
            }
        },
        src: [ 'build/<%= package.name %>.js' ],
        dest: 'dist/<%= package.name %>.js'
    }
};
