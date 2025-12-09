export interface ContractorParameters {
  parent_id?: string;
  page: number;
  pageSize: number;
}
export interface User {
  id?: string;
  UserName?: string
  Email?: string;
  name?: string;
  ssid?: string;
  address?: string;
  phoneNumber?: string;
  status?: string;
  createDate?: Date;
}

export interface UserRole {
  role_id?: string;
  user_id?: string;
  user_name?: string;
  role_name?: string;
  isChecked?: boolean;
}

export interface UserWithPassword extends User {
  password: string;
  passwordConfirm: string;
}

export interface EmployeeParameters {
  parent_id?: string;
  page: number;
  pageSize: number;
}
export interface Employee extends User {
  department_id?: string;
  jobTitle_id?: string;
}

export interface EmployeeWithPassword extends User {
  password: string;
  passwordConfirm: string;
}

export interface ContractorParameters {
  parent_id?: string;
  page: number;
  pageSize: number;
}
export interface Contractor extends User {
  workType?: string;
}

export interface ContractorWithPassword extends Contractor {
  password: string;
  passwordConfirm: string;
}

export interface CustomerParameters {
  parent_id?: string;
  page: number;
  pageSize: number;
}
export interface Customer extends User {
  workType?: string;
}

export interface CustomerWithPassword extends Customer {
  password: string;
  passwordConfirm: string;
}