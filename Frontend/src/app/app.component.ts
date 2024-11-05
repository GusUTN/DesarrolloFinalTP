import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { AlumnosComponent } from './alumno/alumno.component';  
import { DocentesComponent } from './docente/docente.component';
import { CursosComponent } from './curso/curso.component'; 
import { TemasComponent } from './temas/temas.component';
import { MenuComponent } from "./menu/menu.component";  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [AlumnosComponent, DocentesComponent, CursosComponent, TemasComponent, RouterOutlet, MenuComponent] 
})

export class AppComponent {
  title = 'Sistema de cursos';
}

