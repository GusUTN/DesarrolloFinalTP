import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

type Section = "cursos" | "alumnos" | "docentes" | "temas" ;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})

export class MenuComponent {
  sections: Record<Section, boolean> = {
    cursos: false,
    alumnos: false,
    docentes: false,
    temas: false,
  };

  toggleSection(section: Section) {
    for (const key in this.sections) {
      if (key !== section) {
        this.sections[key as Section] = false; 
      }
    }
    this.sections[section] = !this.sections[section];
  }
}
