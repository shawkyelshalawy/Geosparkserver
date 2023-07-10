import { User } from '../../shared/types';

export interface UserDao {
  createUser(user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  DeactivateUser(id: string): Promise<void>;
  ActivateUser(id: string): Promise<void>;
}
