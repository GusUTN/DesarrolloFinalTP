import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../Services/alumno.service';
import { Alumno } from '../Models/alumno.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css'
})
export class AlumnosComponent implements OnInit {
  alumnos: Alumno[] = [];
  alumnoForm: FormGroup;
  editMode = false;  // Nueva propiedad para saber si estamos editando
  alumnoEditado: Alumno | null = null;  // Alumno que estamos editando

  constructor(
    private alumnoService: AlumnoService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.alumnoForm = this.fb.group({
      nombre: [''],
      fechaNacimiento: ['']
    });
  }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
       const id = params['id']; 
      if (id) {
         this.getAlumnoById(id); 
        } else {
           this.loadAlumnos();
          } 
      }); 
    }

  loadAlumnos(): void {
    this.alumnoService.getAllAlumnos().subscribe(
      (data: Alumno[]) => {
        this.alumnos = data;
      },
      (error) => {
        console.error('Error loading alumnos:', error);
      }
    );
  }

  getAlumnoById(id: number): void {
     this.alumnoService.getAlumnoById(id).subscribe(
       (data: Alumno) => {
         this.alumnoForm.patchValue(data); // Llena el formulario con los datos del alumno
          this.alumnoEditado = data; // Guarda el alumno que se está editando
           this.editMode = true; // Cambia a modo edición 
          }, 
          (error) => { 
            console.error('Error obteniendo alumno por ID:', error);
          } 
      );
    }

  // Método para iniciar la edición de un alumno
  editAlumno(alumno: Alumno): void {
    this.router.navigate(["alumnos/"+alumno.id!]);
    this.alumnoForm.patchValue(alumno);  // Llena el formulario con los datos del alumno
    this.alumnoEditado = alumno;  // Guarda el alumno que se está editando
    this.editMode = true;  // Cambia a modo edición
  }

  createOrUpdateAlumno(): void {
    if (this.alumnoForm.valid) {
      const alumnoData: Alumno = this.alumnoForm.value;

      if (this.editMode && this.alumnoEditado) {
        // Si estamos en modo de edición, llama a updateAlumno
        alumnoData.id = this.alumnoEditado.id; // Asegura que el ID sea el mismo
        this.alumnoService.updateAlumno(alumnoData).subscribe(
          (updatedAlumno) => {
            const index = this.alumnos.findIndex(a => a.id === updatedAlumno.id);
            if (index !== -1) {
              this.alumnos[index] = updatedAlumno;  // Actualiza el alumno en la lista
            }
            this.cancelEdit();  // Reinicia el formulario
          },
          (error) => {
            console.error('Error actualizando alumno:', error);
          }
        );
      } else {
        // Si no estamos en modo de edición, crea un nuevo alumno
        this.alumnoService.createAlumno(alumnoData).subscribe(
          (alumno) => {
            this.alumnos.push(alumno);
            this.alumnoForm.reset();
          },
          (error) => {
            console.error('Error creando alumno:', error);
          }
        );
      }
    }
  }

  // Cancela el modo de edición y limpia el formulario
  cancelEdit(): void {
    this.editMode = false;
    this.alumnoEditado = null;
    this.alumnoForm.reset();
    this.router.navigate(["/alumnos"])
  }

  deleteAlumno(alumno: Alumno): void {
    if (alumno.id) {
      this.alumnoService.deleteAlumno(alumno).subscribe(
        () => {
          this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
        },
        (error) => {
          console.error('Error borrando alumno:', error);
        }
      );
    }
  }
}
