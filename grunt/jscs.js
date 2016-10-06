export default (grunt, config) => {
    return {
        options: {
            config: 'grunt/.jscsrc'
        },
        src: [
            'src/app/**/*.js'
        ],
        meta: {
            src: [ 'grunt/*.js' ]
        }
    };
};
