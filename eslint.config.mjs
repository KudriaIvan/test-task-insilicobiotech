import baseConfig from './eslint.base.config.mjs';
import nx from '@nx/eslint-plugin';

export default [
  ...baseConfig,
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-array-constructor': 'error',
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-implied-eval': 'error',
      'no-new-wrappers': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'one-var': ['error', 'never'],
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          enforceBuildableLibDependency: true,
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:feature'],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:data-access',
                'type:ui',
                'type:utils',
                'type:models',
                'type:constants',
              ],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:utils',
                'type:models',
                'type:constants',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:utils',
                'type:models',
                'type:constants',
              ],
            },
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: [
                'type:utils',
                'type:models',
                'type:constants',
              ],
            },
            {
              sourceTag: 'type:models',
              onlyDependOnLibsWithTags: ['type:models', 'type:constants'],
            },
            {
              sourceTag: 'type:constants',
              onlyDependOnLibsWithTags: ['type:constants'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.ts', 'libs/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      'no-restricted-syntax': [
        'error',
        {
          message:
            'Use named exports so imports have canonical, refactor-friendly names.',
          selector: 'ExportDefaultDeclaration',
        },
        {
          message:
            'Avoid mutable exports. Export a readonly value or an explicit getter instead.',
          selector: 'ExportNamedDeclaration > VariableDeclaration[kind="let"]',
        },
      ],
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/no-attribute-decorator': 'error',
      '@angular-eslint/no-duplicates-in-metadata-arrays': 'error',
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-host-metadata-property': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'warn',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/prefer-signals': [
        'warn',
        {
          preferInputSignals: true,
          preferQuerySignals: true,
          preferReadonlySignalProperties: true,
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/no-inline-styles': [
        'error',
        {
          allowBindToStyle: true,
          allowNgStyle: false,
        },
      ],
      '@angular-eslint/template/prefer-class-binding': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
];
