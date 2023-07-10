import { User } from '../../shared/types';

export const SEED_USERS: User[] = [
  {
    email: 'user-bel-gebna@mail.com',
    id: 'user-bel-gebna',
    password: '123456',
    firstName: 'User',
    lastName: 'Bel-Gebna',
    isAdmin: true,
    subscribed: true,
  },
  {
    email: '7amada-elgenn@mail.com',
    id: '7amada-elgenn-id',
    password: '123456',
    firstName: 'Hamada',
    lastName: 'Elgenn',
    isAdmin: false,
    subscribed: true,
  },
  {
    email: 'bolbol@mail.com',
    id: 'bolbol-7ayran',
    password: '123456',
    firstName: 'Bolbol',
    lastName: 'Hayran',
    isAdmin: true,
    subscribed: true,
  },
  {
    email: 'bororom@mail.com',
    id: 'isma3een-yaseen',
    password: '123456',
    firstName: 'Isma3een',
    lastName: 'Yaseen',
    isAdmin: false,
    subscribed: true,
  },
];
