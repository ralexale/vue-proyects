import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { checkStatusAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>(undefined);
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, passowrd: string) => {
    try {
      const loginResponse = await loginAction(email, passowrd);
      if (!loginResponse.ok) {
        logout();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ): Promise<{ ok: boolean; message: string }> => {
    try {
      const registerResponse = await registerAction(fullName, email, password);

      if (!registerResponse.ok) {
        logout();
        return {
          ok: false,
          message: registerResponse.message,
        };
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token!;
      authStatus.value = AuthStatus.Authenticated;
      return {
        ok: true,
        message: 'Registrado correctamente',
      };
    } catch (error) {
      console.log(error);
      logout();
      return {
        ok: false,
        message: error as string,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusRes = await checkStatusAction();

      if (!statusRes.ok) {
        logout();
        return false;
      }

      user.value = statusRes.user;
      token.value = statusRes.token!;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isUnauthenticated: computed(() => authStatus.value === AuthStatus.UnAuthenticated),
    username: computed(() => user.value?.fullName),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),

    // actions
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
