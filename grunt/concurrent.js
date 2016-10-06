export default{
    dev: {
        tasks: [ 'nodemon:dev', 'watch:build' ],
        options: {
            logConcurrentOutput: true
        }
    },

    prod: {
        tasks: [ 'nodemon:prod', 'watch:dist' ],
        options: {
            logConcurrentOutput: true
        }
    }
};
