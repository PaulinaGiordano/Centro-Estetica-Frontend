import { inject } from '@angular/core';
import { Router } from '@angular/router';

function usuarioActual() {
  return JSON.parse(localStorage.getItem('usuario') || 'null');
}

export const adminGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('token') && usuarioActual()?.rol === 'admin') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const clienteGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('token') && usuarioActual()?.rol === 'cliente') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
