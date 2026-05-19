export interface Emprestimo {
  idEmprestimo: number;
  idUsuario: number;
  idLivro: string;
  idBiblioteca: number;
  nomeUsuario: string;
  tituloLivro: string;
  nomeBiblioteca: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoReal: string;
  status: string;
}