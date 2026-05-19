import { Routes } from '@angular/router';
import { Home } from './home/home.component'
import { Admin } from './admin/admin.component'
import { LivrosDetalhes } from './livros_detalhes/livros.detalhes.component'
import { CadastroUsuarios } from './cadastro_usuarios/cadastro.usuarios.component'
import { Login } from './login/login.component'
import { Emprestimos } from './emprestimos/emprestimos.component';
import { BibliotecasDisponiveis } from './bibliotecas_disponiveis/bibliotecas.disponiveis.component';
import { AdminCadastroUsuario } from './admin_cadastro_usuario/admin.cadastro.usuario.component';
import { AdminCadastroLivro } from './admin_cadastro_livro/admin.cadastro.livro.component';
import { AdminCadastroBiblioteca } from './admin_cadastro_biblioteca/admin.cadastro.biblioteca.component';
import { AdminCadastroEmprestimo } from './admin_cadastro_emprestimo/admin.cadastro.emprestimo.component';
import { AdminListarUsuarios } from './admin_listar_usuarios/admin.listar.usuarios.component';
import { AdminListarLivros } from './admin_listar_livros/admin.listar.livros.component';
import { AdminListarBibliotecas } from './admin_listar_bibliotecas/admin.listar.bibliotecas.component';
import { AdminListarEmprestimos } from './admin_listar_emprestimos/admin.listar.emprestimos.component';
import { AdminListarMultas } from './admin-listar-multas/admin-listar-multas';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: Home, pathMatch: 'full'},
    { path: 'livros-detalhes/:id', component: LivrosDetalhes, pathMatch: 'full'},
    { path: 'cadastro', component: CadastroUsuarios, pathMatch: 'full'},
    { path: 'login', component: Login, pathMatch: 'full'},
    { path: 'emprestimos', component: Emprestimos, pathMatch: 'full'},
    { path: 'bibliotecas-disponiveis', component: BibliotecasDisponiveis, pathMatch: 'full'},
    { path: 'admin', component: Admin, pathMatch: 'full'},
    { path: 'admin-cadastro-usuario', component: AdminCadastroUsuario, pathMatch: 'full'},
    { path: 'admin-cadastro-livro', component: AdminCadastroLivro, pathMatch: 'full'},
    { path: 'admin-cadastro-biblioteca', component: AdminCadastroBiblioteca, pathMatch: 'full'},
    { path: 'admin-cadastro-emprestimo', component: AdminCadastroEmprestimo, pathMatch: 'full'},
    { path: 'admin-listar-usuarios', component: AdminListarUsuarios, pathMatch: 'full'},
    { path: 'admin-listar-livros', component: AdminListarLivros, pathMatch: 'full'},
    { path: 'admin-listar-bibliotecas', component: AdminListarBibliotecas, pathMatch: 'full'},
    { path: 'admin-listar-emprestimos', component: AdminListarEmprestimos, pathMatch: 'full'},
    { path: 'admin-listar-multas', component: AdminListarMultas, pathMatch: 'full'}
];
