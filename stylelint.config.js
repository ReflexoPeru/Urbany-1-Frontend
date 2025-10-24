/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-clean-order/error',
    ],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
        // Permite vacíos en archivos de entrada compuestos (opcional)
        'no-empty-source': null,
    },
};
  