export default (grunt, config) => {
    return {
        build: {
            options: {
                atBegin: true
            },
            files: [ 'src/**/*', 'index.html' ],
            tasks: [ 'build' ]
        },
        dist: {
            options: {
                atBegin: true
            },
            files: [ 'src/**/*', 'index.html' ],
            tasks: [ 'dist' ]
        }
    };
};
