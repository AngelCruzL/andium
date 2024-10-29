export interface Profile {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

export type Author = Profile;