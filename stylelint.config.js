/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-clean-order',
    ],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
        // Permite vacíos en archivos de entrada compuestos (opcional)
        'no-empty-source': null,
        // Permite propiedades personalizadas
        'custom-property-pattern': null,
        // Permite selectores con :global
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ],
        // Permite nombres de clases en camelCase (para CSS Modules)
        'selector-class-pattern': null,
        // Permite nombres de keyframes en camelCase
        'keyframes-name-pattern': null,
        // Permite declaraciones en una sola línea
        'declaration-block-single-line-max-declarations': null,
        // Permite selectores duplicados
        'no-duplicate-selectors': null,
        // Permite especificidad descendente
        'no-descending-specificity': null,
    },
};
