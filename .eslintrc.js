module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: 'vue-eslint-parser',
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'@typescript-eslint/ban-ts-comment': 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/ban-types': 'off',
		'vue/no-mutating-props': 'off',
	},
}
