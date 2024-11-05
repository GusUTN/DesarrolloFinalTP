export interface Curso {
    id?: number;
    fechaInicio: string;
    fechaFin: string;
    precio: number;
    docente: {
      id: number;
      nombre?: string;
     
    };
    tema: {
      id: number;
      nombre?: string;
      
    };
    alumnos: {
      id: number;
      nombre?: string;
      
  }[];
  }
  