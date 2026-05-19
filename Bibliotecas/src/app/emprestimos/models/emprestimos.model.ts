export interface MeusEmprestimos {
  idEmprestimo: number;
  titulo: string;
  autores: Autor[];
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  renovacoes: number;
  status: string;
}


export interface Autor {
  nome: string;
  nacionalidade: string;
}