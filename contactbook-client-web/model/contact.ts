export interface Contact {
  id: number;
  title: string;
  surname: string;
  forename: string;
  dateOfBirth: string;
  street: string;
  houseNumber: number;
  district: string;
  city: string;
  postCode: number;
  country: string;
  telephoneNumber: string;
  iban: string;
  age?: number | null;
}
