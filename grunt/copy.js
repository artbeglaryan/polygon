export default {
    build: {
        files: [
            {
                expand: true,
                src: 'index.html',
                dest: 'build/'
            }
        ]
    },
    dist: {
        files: [
            {
                expand: true,
                src: 'index.html',
                dest: 'dist/'
            }
        ]
    }
};
