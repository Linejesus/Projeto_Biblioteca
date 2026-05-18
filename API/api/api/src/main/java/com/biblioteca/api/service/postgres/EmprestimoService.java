package com.biblioteca.api.service.postgres;

import com.biblioteca.api.DTO.AtualizarEmprestimoDTO;
import com.biblioteca.api.DTO.AtualizarUsuarioDTO;
import com.biblioteca.api.DTO.EmprestimoCadastroDTO;
import com.biblioteca.api.DTO.ListarEmprestimosDTO;
import com.biblioteca.api.DTO.MeusEmprestimosDTO;
import com.biblioteca.api.entity.mongo.Livro;
import com.biblioteca.api.entity.neo4j.BibliotecaNode;
import com.biblioteca.api.entity.neo4j.LivroNode;
import com.biblioteca.api.entity.neo4j.Pessoa;
import com.biblioteca.api.entity.postgres.Biblioteca;
import com.biblioteca.api.entity.postgres.Emprestimo;
import com.biblioteca.api.entity.postgres.Usuarios;
import com.biblioteca.api.repository.neo4j.BibliotecaNodeRepository;
import com.biblioteca.api.repository.neo4j.LivroNodeRepository;
import com.biblioteca.api.repository.neo4j.PessoaRepository;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;
import com.biblioteca.api.repository.postgres.EmprestimoRepository;
import com.biblioteca.api.repository.mongo.LivroRepository;
import com.biblioteca.api.repository.postgres.UsuariosRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final UsuariosRepository usuariosRepository;
    private final LivroRepository livroRepository;
    private final BibliotecaRepository bibliotecaRepository;
    private final BibliotecaNodeRepository bibliotecaNodeRepository;
    private final LivroNodeRepository livroNodeRepository;
    private final PessoaRepository pessoaNodeRepository;


    @Transactional("transactionManager")
    public Emprestimo salvar(EmprestimoCadastroDTO novoEmprestimo) {

        Usuarios usuario = usuariosRepository.findById(novoEmprestimo.getIdUsuario())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Livro livro = livroRepository.findById(novoEmprestimo.getIdLivro().toString())
                .orElseThrow(() -> new EntityNotFoundException("Livro não encontrado"));

        Biblioteca biblioteca = bibliotecaRepository.findById(novoEmprestimo.getIdBiblioteca())
                .orElseThrow(() -> new EntityNotFoundException("Biblioteca não encontrada"));

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setUsuario(usuario);
        emprestimo.setLivro(livro.getId());
        emprestimo.setBiblioteca(biblioteca);

        Emprestimo salvo = emprestimoRepository.save(emprestimo);

        pessoaNodeRepository.relacionarPessoaLivro(
                usuario.getIdUsuario(),
                livro.getId()
        );

        pessoaNodeRepository.relacionarPessoaBiblioteca(
                usuario.getIdUsuario(),
                biblioteca.getIdBiblioteca()
        );

        return salvo;
    }

    public List<Emprestimo> listarTodos() {
        return emprestimoRepository.findAll();
    }

    public Emprestimo buscarEmprestimo(Long id) {
        return emprestimoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Emprestimo não encontrado"));
    }

    public void deletar(Long id) {
        if (!emprestimoRepository.existsById(id)) {
            throw new EntityNotFoundException("Emprestimo não encontrado");
        }
        emprestimoRepository.deleteById(id);
    }

    public List<MeusEmprestimosDTO> listarMeusEmprestimos(Long idUsuario){

        if (!usuariosRepository.existsById(idUsuario)) {
            throw new EntityNotFoundException("Usuário não encontrado");
        }

        List<Emprestimo> emprestimos = emprestimoRepository
                .findByUsuario_IdUsuario(idUsuario);

        return emprestimos.stream().map(e -> {

            Livro livro = livroRepository.findById(String.valueOf(e.getLivro()))
                    .orElse(null);

            return new MeusEmprestimosDTO(
                    e.getIdEmprestimo(),
                    livro != null ? livro.getTitulo() : "Livro não encontrado",
                    livro != null ? livro.getAutores() : List.of(),
                    e.getDataEmprestimo(),
                    e.getDataDevolucaoPrevista(),
                    e.getRenovacoes(),
                    e.getStatus()
            );

        }).collect(Collectors.toList());
    }

    public void atualizarStatus(Long id, String status){
        Emprestimo meuEmprestimo = buscarEmprestimo(id);

        meuEmprestimo.setStatus(status);

        emprestimoRepository.save(meuEmprestimo);
    }

    public void renovar(Long id){
        Emprestimo meuEmprestimo = buscarEmprestimo(id);

        LocalDate dataDevolucaoOriginal = meuEmprestimo.getDataDevolucaoPrevista();

        LocalDate novaData = dataDevolucaoOriginal.plusDays(15);

        int renovacoes = meuEmprestimo.getRenovacoes() + 1;

        meuEmprestimo.setRenovacoes(renovacoes);
        meuEmprestimo.setDataDevolucaoPrevista(novaData);

        emprestimoRepository.save(meuEmprestimo);
    }


    public List<ListarEmprestimosDTO> listarTodosDTO() {

        List<Emprestimo> emprestimos = emprestimoRepository.findAll();

        return emprestimos.stream().map(e -> {

            Livro livro = livroRepository.findById(String.valueOf(e.getLivro()))
                    .orElse(null);

            return new ListarEmprestimosDTO(
                    e.getIdEmprestimo(),
                    e.getUsuario().getIdUsuario(),
                    e.getLivro(),
                    e.getBiblioteca().getIdBiblioteca(),
                    e.getUsuario().getNome(),
                    livro != null ? livro.getTitulo() : "Livro não encontrado",
                    e.getBiblioteca().getNome(),
                    e.getDataEmprestimo(),
                    e.getDataDevolucaoPrevista(),
                    e.getStatus()
            );

        }).toList();
    }

    public void atualizar(Long id, AtualizarEmprestimoDTO dadosAtualizados){

        Emprestimo emprestimo = emprestimoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));

        Usuarios usuario = usuariosRepository.findById(dadosAtualizados.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Livro livro = livroRepository.findById(dadosAtualizados.getIdLivro())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        Biblioteca biblioteca = bibliotecaRepository.findById(dadosAtualizados.getIdBiblioteca())
                .orElseThrow(() -> new RuntimeException("Biblioteca não encontrada"));

        emprestimo.setUsuario(usuario);

        emprestimo.setLivro(livro.getId());

        emprestimo.setBiblioteca(biblioteca);

        emprestimo.setDataEmprestimo(dadosAtualizados.getDataEmprestimo());

        emprestimo.setDataDevolucaoPrevista(
                dadosAtualizados.getDataDevolucaoPrevista()
        );

        emprestimo.setStatus(dadosAtualizados.getStatus());

        emprestimoRepository.save(emprestimo);
    }
}