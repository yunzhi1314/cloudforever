module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        'plugin:prettier/recommended',
        'plugin:prettier/recommended'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "parser": "vue-eslint-parser",
    "plugins": [
        "@typescript-eslint",
        "vue",
        "prettier"
    ],
    "rules": {
        '@typescript-eslint/no-var-requires': 0, //解决报错：Require statement not part of import statement.
        'vue/multi-word-component-names': 'off' //关闭组件命名规则娇艳
    },
    "root": true
}