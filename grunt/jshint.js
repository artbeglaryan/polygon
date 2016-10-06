export default (grunt, config) => {
    return {
        options: {
            globals: {
                window: true,
                document: true
            },
            globalstrict: true,
            strict: true,
            esnext: false
        },
        src: [
            'src/**/*.js'
        ]
    };
};
