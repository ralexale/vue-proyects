import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}

type RegisterResponse = RegisterError | RegisterSuccess;

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        ok: false,
        message: error.response.data?.message,
      };
    }
    console.log(error);
    throw new Error('No se pudo realizar la petición  ');
  }
};
