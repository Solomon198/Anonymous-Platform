module.exports = {
    createOldCatalogs: false,
    indentation: 2,
    lexers: {
        js: ['JsxLexer'],
        ts: ['JsxLexer'],
        jsx: ['JsxLexer'],
        tsx: ['JsxLexer'],
        default: ['JsxLexer'],
    },
    locales: ['fr', 'en'],
    output: 'public/locales/$LOCALE/$NAMESPACE.json',
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    verbose: false,
    lineEnding: 'lf',
}
