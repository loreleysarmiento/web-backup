export class Movie {
  id: string;
  titulo: string;
  director_id: string;
  actores_id: string[];
  genero: string[];
  duracion: number;
  fecha_lanzamiento: string;
  idioma_original: string;
  pais_origen: string;
  plataformas_id: string[];
  sinopsis: string;
  imagen: string;

  constructor(movie: {
    id?: string,
    titulo?: string,
    director_id?: string,
    actores_id?: string[],
    genero?: string[],
    duracion?: number,
    fecha_lanzamiento?: string,
    idioma_original?: string,
    pais_origen?: string,
    plataformas_id?: string[],
    sinopsis?: string,
    imagen?: string
  }) {
    this.id = movie.id || '';
    this.titulo = movie.titulo || '';
    this.director_id = movie.director_id || '';
    this.actores_id = movie.actores_id || [];
    this.genero = movie.genero || [];
    this.duracion = movie.duracion && Number.isInteger(movie.duracion) ? movie.duracion : 0;
    this.fecha_lanzamiento = movie.fecha_lanzamiento || '';
    this.idioma_original = movie.idioma_original || '';
    this.pais_origen = movie.pais_origen || '';
    this.plataformas_id = movie.plataformas_id || [];
    this.sinopsis = movie.sinopsis || '';
    this.imagen = movie.imagen || '';
  }
}
