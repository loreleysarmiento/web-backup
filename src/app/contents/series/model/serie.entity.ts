export class Serie {
  id: string;
  titulo: string;
  director_id: string;
  actores_id: string[];
  genero: string[];
  num_temporadas: number;
  num_episodios: number;
  fecha_lanzamiento: string;
  idioma_original: string;
  pais_origen: string;
  plataformas_id: string[];
  sinopsis: string;
  imagen: string;

  constructor(serie: Partial<Serie>) {
    this.id = serie.id || '';
    this.titulo = serie.titulo || '';
    this.director_id = serie.director_id || '';
    this.actores_id = serie.actores_id || [];
    this.genero = serie.genero || [];
    this.num_temporadas = serie.num_temporadas || 0;
    this.num_episodios = serie.num_episodios || 0;
    this.fecha_lanzamiento = serie.fecha_lanzamiento || '';
    this.idioma_original = serie.idioma_original || '';
    this.pais_origen = serie.pais_origen || '';
    this.plataformas_id = serie.plataformas_id || [];
    this.sinopsis = serie.sinopsis || '';
    this.imagen = serie.imagen || '';
  }
}
