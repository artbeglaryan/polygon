export default (grunt, options) => {
    return {
        all: {
            options: {
                archive: '/tmp/<%= package.name %>.tgz'
            },
            files: [
                { src: [].concat(options.src), dest: './' }
            ]
        }
    };
};
