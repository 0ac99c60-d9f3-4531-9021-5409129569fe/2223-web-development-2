module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2018,
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: [
        "vue",
        "@typescript-eslint",
    ],
    rules: {
        indent: "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ["PropertyDefinition"],
            },
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        quotes: [
            "error",
            "double",
        ],
        semi: "off",
        "@typescript-eslint/semi": [
            "error",
            "always",
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
    },
};