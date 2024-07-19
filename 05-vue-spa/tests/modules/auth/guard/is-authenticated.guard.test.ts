import isAuthenticatedGuard from '@/modules/auth/guard/is-authenticated.guard';
import type { RouteLocationNormalizedGeneric } from 'vue-router';

describe('is-authticated.guard', () => {
  const to: RouteLocationNormalizedGeneric = {
    name: undefined,
    params: {},
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/home',
    meta: {},
  };

  const from: any = {};
  const next = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  test('should block if is not authenticated', async () => {
    await isAuthenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalledWith({
      name: 'login',
    });
  });

  test('should call localstorage set item lastPath', async () => {
    await isAuthenticatedGuard(to, from, next);

    const lastPath = localStorage.getItem('last-route');

    expect(lastPath).toBe(to.path);
  });

  test('should block if is not authenticated with spies', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    await isAuthenticatedGuard(to, from, next);

    expect(setItemSpy).toBeCalledWith('last-route', to.path);
  });

  test('should pass if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123');

    await isAuthenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });
});
