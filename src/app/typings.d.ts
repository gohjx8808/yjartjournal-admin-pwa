declare namespace globalType {
  interface optionData {
    id: number;
    name: string;
  }

  interface stringOptionData {
    id: string;
    name: string;
  }

  interface checkboxOption extends optionData {
    checked: boolean;
  }
}
