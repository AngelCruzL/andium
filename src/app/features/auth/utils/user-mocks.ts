import { SignInPayload, SignInResponse, SignUpPayload } from '../types';
import { CurrentUser } from '@shared/types';

export const signUpPayloadMock: SignUpPayload = {
  user: {
    username: 'testuser',
    password: 'password123',
    email: 'test@test.com',
  },
};

export const signInPayloadMock: SignInPayload = {
  user: {
    email: 'test@test.com',
    password: 'password',
  },
};

export const currentUserMock: CurrentUser = {
  bio: null,
  image: null,
  username: 'testuser',
  token: 'some-token',
  email: 'test@test.com',
};

export const signInResponseMock: SignInResponse = {
  user: currentUserMock,
};
