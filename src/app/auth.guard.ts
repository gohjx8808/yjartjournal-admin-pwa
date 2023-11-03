import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = new Router();

  if (localStorage.getItem('TOKEN')) {
    return true;
  }
  router.navigateByUrl('');
  return false;
};
