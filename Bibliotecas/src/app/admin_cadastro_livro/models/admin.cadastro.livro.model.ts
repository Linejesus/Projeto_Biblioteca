export interface Autor {
  nome: string;
  nacionalidade: string;
}

export interface Edicao {
  ano: number | null;
  edicao: number | null;
}

export interface Editora {
  nome: string;
  pais: string;
}

export interface LivroCadastro {
  idBiblioteca: number;
  titulo: string;
  anoPublicacao: number | null;
  autores: Autor[];
  generos: string[];
  editoras: Editora[];
  edicoes: Edicao[];
  tags: string[];
  avaliacaoMedia: number | null;
  numeroPaginas: number | null;
  idioma: string;
}