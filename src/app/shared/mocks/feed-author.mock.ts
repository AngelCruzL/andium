import { Author } from '@shared/types';

export const mockAuthors: Author[] = [
  {
    username: 'john_doe',
    bio: 'A passionate writer and traveler.',
    image: 'https://example.com/images/john_doe.jpg',
    following: false,
  },
  {
    username: 'jane_smith',
    bio: 'Tech enthusiast and blogger.',
    image: 'https://example.com/images/jane_smith.jpg',
    following: true,
  },
  {
    username: 'alice_jones',
    bio: 'Food lover and recipe creator.',
    image: 'https://example.com/images/alice_jones.jpg',
    following: false,
  },
];
