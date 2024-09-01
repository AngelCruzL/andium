export interface User {
  username: string;
  email: string;
  password: string;
}

export interface CurrentUser {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}
