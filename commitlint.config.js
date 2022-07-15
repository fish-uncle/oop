const types = ['fix', 'refactor', 'feature', 'prune', 'ui', 'docs', 'init', 'release', 'config', 'merge', 'test']

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [2, 'always', types],
	},
}
