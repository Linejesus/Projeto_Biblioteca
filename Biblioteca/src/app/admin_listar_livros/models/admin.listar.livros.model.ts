export interface Autor {
  nome: string;
  nacionalidade: string;
}

export interface Edicao {
  ano: number;
  edicao: number;
}

export interface Editora {
  nome: string;
  pais: string;
}

export interface Livro {
  id: string;
  capa: string;
  titulo: string;
  anoPublicacao: number;
  autores: Autor[];
  generos: string[];
  editoras: Editora[];
  edicoes: Edicao[];
}