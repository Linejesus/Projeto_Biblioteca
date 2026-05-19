export interface Autor {
  nome: string;
  nacionalidade: string;
}

export interface LivroDetalhes {

  id: string;
  titulo: string;
  autores: Autor[];
  capa: string;
  avaliacaoMedia: number;
  anoPublicacao: number;
  numeroPaginas: number;
  idioma: string;
  generos: string[];
  tags: string[];
}


export interface LivroAutor {
  
  id: string;
  titulo: string;
  autores: Autor[];
  capa: string;
}