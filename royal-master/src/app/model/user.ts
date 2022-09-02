export interface User {
  isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isEdit: boolean;
}

export const UserColumns = [
 
  {
    key: 'index',
    label: 'ID',
    isVisible: false
  },
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
    required: true,
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
    required: true,
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    pattern: '.+@.+',
  },
  {
    key: 'phone',
    type: 'number',
    label: 'Phone',
    maxLength: 16,
    minLength:8,
    required: true,
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Action',
  },
];
