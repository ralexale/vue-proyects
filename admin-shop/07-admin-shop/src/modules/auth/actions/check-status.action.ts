import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  user: User;
  token: string;
}
export const checkStatusAction = async (): Promise<CheckError | CheckSuccess> => {
  const localToken = localStorage.getItem('token');
  if (localToken && localToken.length < 10) {
    return {
      ok: false,
    };
  }

  try {
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }
    throw new Error('No se pudo realizar la petición');
  }
};
