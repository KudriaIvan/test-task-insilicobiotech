import type { Medium } from '@test-task-insilicobiotech/medium-dashboard/models';

export const MOCK_MEDIUM: Medium = {
  name: 'Basal Medium',
  components: [
    { name: 'Glucose', unit: 'g/L', ref_value: 4.0, opt_value: 4.8 },
    { name: 'NaCl', unit: 'g/L', ref_value: 8.0, opt_value: 7.2 },
    { name: 'Glutamine', unit: 'mmol/L', ref_value: 2.5, opt_value: 3.2 },
    { name: 'MgSO4', unit: 'g/L', ref_value: 0.5, opt_value: 0.65 },
  ],
};
