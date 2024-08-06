module.exports = {
  extends: ['turbo', 'standard'],
  ignorePatterns: ['**/dist/**/*.js', '**/dist/**/*.ts'],
  rules: {
    'react/jsx-key': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'import/no-anonymous-default-export': 'off'
  }
}
