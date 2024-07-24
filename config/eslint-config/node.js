/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ['@rocketseat/eslint-config/node'],
	plugins: ['simple-import-sort', 'unused-imports'],
	rules: {
		'simple-import-sort/imports': 'error',
		'no-useless-constructor': 'off',
		semi: 'off',
		'unused-imports/no-unused-imports': 'error',
		'prettier/prettier': [
			'error',
			{
				semi: true,
			},
		],
	},
}
