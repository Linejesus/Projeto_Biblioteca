package com.biblioteca.api.service.postgres;

import com.biblioteca.api.DTO.EmprestimoCadastroDTO;
import com.biblioteca.api.DTO.MeusEmprestimosDTO;
import com.biblioteca.api.entity.mongo.Livro;
import com.biblioteca.api.entity.postgres.Biblioteca;
import com.biblioteca.api.entity.postgres.Emprestimo;
import com.biblioteca.api.entity.postgres.Usuarios;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;
import com.biblioteca.api.repository.postgres.EmprestimoRepository;
import com.biblioteca.api.repository.mongo.LivroRepository;
import com.biblioteca.api.repository.postgres.UsuariosRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    @Transactional
    public Emprestimo salvar(EmprestimoCadastroDTO novoEmprestimo) {

        Usuarios usuario = usuariosRepository.findById(novoEmprestimo.getIdUsuario())
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        Livro livro = livroRepository.findById(novoEmprestimo.getIdLivro().toString())
                .orElseThrow(() -> new EntityNotFoundException("Livro não encontrado"));

        Biblioteca biblioteca = bibliotecaRepository.findById(novoEmprestimo.getIdBiblioteca())
                .orElseThrow(() -> new EntityNotFoundException("Biblioteca não encontrada"));

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setUsuario(usuario);
        emprestimo.setLivro(livro);
        emprestimo.setBiblioteca(biblioteca);

        return emprestimoRepository.save(emprestimo);
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

            Livro livro = livroRepository.findById(e.getLivro().getId())
                    .orElse(null); // evita quebrar se não achar

            return new MeusEmprestimosDTO(
                    e.getIdEmprestimo(),
                    livro != null ? livro.getTitulo() : "Livro não encontrado",
                    livro != null ? livro.getAutores() : List.of(),
                    e.getDataEmprestimo(),
                    e.getDataDevolucaoReal(),
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
}