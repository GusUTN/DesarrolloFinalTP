import { Component, OnInit } from '@angular/core';
import { CursoService } from '../Services/curso.service';
import { DocenteService } from '../Services/docente.service';
import { AlumnoService } from '../Services/alumno.service';
import { TemaService } from '../Services/tema.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Curso } from '../Models/curso.model';
import { Docente } from '../Models/docente.model';
import { Alumno } from '../Models/alumno.model';
import { Tema } from '../Models/tema.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './curso.component.html',
  standalone: true,
  styleUrls: ['./curso.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  temas: Tema[] = [];
  nuevoCurso: Curso = {
    fechaInicio: '',
    fechaFin: '',
    precio: 0,
    docente: { id: 0 },
    tema: { id: 0 },
    alumnos: []
  };

  alumnosSeleccionados: number[] = [];
  modoEdicion: boolean = false;
  cursoEditando: Curso | null = null;
  fechaFinBusqueda: string = '';

  constructor(
    private cursoService: CursoService,
    private docenteService: DocenteService,
    private alumnoService: AlumnoService,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.getCursoById(id);
      } else {
        this.cargarCursos();
      }
    });
    this.cargarDocentes();
    this.cargarAlumnos();
    this.cargarTemas();
  }

  cargarCursos(): void {
    this.cursoService.getAllCursos().subscribe(data => {
      this.cursos = data;
    });
    this.fechaFinBusqueda = '';
  }


  cargarDocentes(): void {
    this.docenteService.getAllDocentes().subscribe(data => {
      this.docentes = data;
      this.cursos.forEach(curso => {
        this.docenteService.getDocenteById(curso.docente.id).subscribe(docente => {
        curso.docente['nombre'] = docente.nombre; }); 
      });
    });
  }

  cargarAlumnos(): void {
    this.alumnoService.getAllAlumnos().subscribe(data => {
      this.alumnos = data;
      this.cursos.forEach(curso => { 
        curso.alumnos.forEach((alumno, index) => { 
            this.alumnoService.getAlumnoById(alumno.id).subscribe(alumno => {
               curso.alumnos[index].nombre = alumno.nombre; 
            });
        });
      });
    });
  }

  cargarTemas(): void {
    this.temaService.getAllTemas().subscribe(data => {
      this.temas = data;
      this.cursos.forEach(curso => { 
        this.temaService.getTemaById(curso.tema.id).subscribe(tema => {
           curso.tema['nombre'] = tema.nombre; 
        });
      }); 
    });
  }

  getCursoById(id: number): void {
    this.cursoService.getCursoById(id).subscribe(
      (data: Curso) => {
        this.nuevoCurso = { ...data };
        this.cursoEditando = data;
        this.modoEdicion = true;
        this.alumnosSeleccionados = data.alumnos.map(a => a.id);
        this.router.navigate(['cursos', id]);
      },
      (error) => {
        console.error('Error obteniendo curso por ID:', error);
      }
    );
  }

  buscarCursosPorFechaFin(): void {
     this.cursoService.getCursosByFechaFin(this.fechaFinBusqueda).subscribe(
       data => {
         this.cursos = data; 
        }, error => {
           console.error('Error buscando cursos por fecha de fin:', error); 
          } 
      ); 
  }

  createOrUpdateCurso(): void {
    const cursoData: Curso = {
       ...this.nuevoCurso, 
       alumnos: this.alumnosSeleccionados.map(id => ({ id })) 
      };

    if (this.modoEdicion && this.cursoEditando) {
      cursoData.id = this.cursoEditando.id;
      this.cursoService.updateCurso(cursoData).subscribe(
        (updatedCurso) => {
          const index = this.cursos.findIndex(c => c.id === updatedCurso.id);
          if (index !== -1) {
            this.cursos[index] = updatedCurso;
          }
          this.cancelEdit();
          this.cargarCursos();
        },
        (error) => {
          console.error('Error actualizando curso:', error);
        }
      );
    } else {
      this.cursoService.createCurso(cursoData).subscribe(
        (curso) => {
          this.cursos.push(curso);
          this.resetForm();
          this.cargarCursos();
        },
        (error) => {
          console.error('Error creando curso:', error);
        }
      );
    }
  }

  editarCurso(curso: Curso): void {
    this.nuevoCurso = { ...curso };
    this.cursoEditando = curso;
    this.modoEdicion = true;
    this.alumnosSeleccionados = curso.alumnos.map(a => a.id);
    this.router.navigate(['cursos', curso.id]);
  }

  cancelEdit(): void {
    this.modoEdicion = false;
    this.cursoEditando = null;
    this.resetForm();
    this.router.navigate(['/cursos']);
  }

  eliminarCurso(id: number | undefined): void {
    if (id) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.cursos = this.cursos.filter(c => c.id !== id);
      });
    }
  }

  resetForm(): void {
    this.nuevoCurso = {
      fechaInicio: '',
      fechaFin: '',
      precio: 0,
      docente: { id: 0 },
      tema: { id: 0 },
      alumnos: []
    };
    this.alumnosSeleccionados = [];
    this.modoEdicion = false;
    this.cursoEditando = null;
  }

  toggleAlumnoSeleccion(alumnoId: number): void {
    const index = this.alumnosSeleccionados.indexOf(alumnoId);
    if (index > -1) {
      this.alumnosSeleccionados.splice(index, 1);
    } else {
      this.alumnosSeleccionados.push(alumnoId);
    }
  }

  isAlumnoSeleccionado(alumnoId: number): boolean {
    return this.alumnosSeleccionados.includes(alumnoId);
  }
}
