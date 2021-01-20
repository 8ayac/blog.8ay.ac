module.exports = {
    "plugin": [
        "stylelint-scss"
    ],
    "extends": [
        "stylelint-config-prettier",
        "stylelint-config-recommended-scss",
        "stylelint-config-recess-order",
        "stylelint-prettier/recommended"
    ],
    "rules": {
        "at-rule-no-unknown": [
            true,
            {
                "ignoreAtRules": [
                    "each",
                    "extend",
                    "if",
                    "include",
                    "for",
                    "function",
                    "mixin",
                ]
            }
        ]
    }
}
