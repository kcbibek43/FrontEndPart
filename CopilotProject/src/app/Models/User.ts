export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  userName: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
