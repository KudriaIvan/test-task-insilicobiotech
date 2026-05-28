export interface MediumComponent {
  name: string;
  unit: string;
  ref_value: number;
  opt_value: number;
}

export interface Medium {
  name: string;
  components: MediumComponent[];
}

