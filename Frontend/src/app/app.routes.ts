import { Routes } from '@angular/router';
import { AlumnosComponent } from './alumno/alumno.component';
import { DocentesComponent } from './docente/docente.component';
import { CursosComponent } from './curso/curso.component';
import { TemasComponent } from './temas/temas.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

export const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'alumnos/:id', component: AlumnosComponent },
  { path: 'docentes', component: DocentesComponent },
  { path: 'docentes/:id', component: DocentesComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'cursos/:id', component: CursosComponent },
  { path: 'temas', component: TemasComponent },
  { path: 'temas/:id', component: TemasComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}