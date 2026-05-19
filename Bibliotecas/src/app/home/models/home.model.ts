export interface Autor {
  nome: string;
  nacionalidade: string;
}

export interface LivroHome {

  id: string;
  titulo: string;
  autores: Autor[];
  capa: string;
  avaliacaoMedia: number;
}