import { Routes } from '@angular/router';
import { Nosotros } from './nosotros/nosotros';
import { Inicio } from './inicio/inicio';
import { Profesionales } from './profesionales/profesionales';
import { Preguntas } from './preguntas/preguntas';
import { Contacto } from './contacto/contacto';
import { Tratamientos } from './tratamientos/tratamientos';
import { Login } from './admin/login/login';
import { InicioAdmin } from './admin/inicio/inicio';
import { ProfesionalesAdmin } from './admin/profesionales/profesionales';
import { adminGuard } from './admin/guard';
import { ProfesionalForm } from './admin/prof-form/form';
import { TratamientosAdmin } from './admin/tratamientos/tratamientos';
import { TratamientoForm } from './admin/trat-form/tratform';

export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'nosotros', component: Nosotros },
    { path: 'profesionales', component: Profesionales },
    { path: 'preguntas', component: Preguntas },
    { path: 'contacto', component: Contacto },
    { path: 'tratamientos', component: Tratamientos },
    { path: 'admin/login', component: Login },
    { path: 'admin', component: InicioAdmin, canActivate: [adminGuard] },
    { path: 'admin/profesionales', component: ProfesionalesAdmin, canActivate: [adminGuard] },
    { path: 'admin/profesionales/nuevo', component: ProfesionalForm, canActivate: [adminGuard] },
    { path: 'admin/profesionales/editar/:id', component: ProfesionalForm, canActivate: [adminGuard] },
    { path: 'admin/tratamientos', component: TratamientosAdmin, canActivate: [adminGuard] },
    { path: 'admin/tratamientos/nuevo', component: TratamientoForm, canActivate: [adminGuard] },
    { path: 'admin/tratamientos/editar/:id', component: TratamientoForm, canActivate: [adminGuard] },
];
