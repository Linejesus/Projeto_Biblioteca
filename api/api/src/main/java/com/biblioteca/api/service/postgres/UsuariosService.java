package com.biblioteca.api.service.postgres;

import com.biblioteca.api.DTO.AtualizarUsuarioDTO;
import com.biblioteca.api.DTO.UsuarioCadastroDTO;
import com.biblioteca.api.entity.neo4j.Pessoa;
import com.biblioteca.api.entity.postgres.Usuarios;
import com.biblioteca.api.repository.neo4j.PessoaRepository;
import com.biblioteca.api.repository.postgres.UsuariosRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuariosService{
    private final UsuariosRepository repository;
    private final PessoaRepository pessoaRepository;

    public UsuariosService(UsuariosRepository repository, PessoaRepository pessoaRepository){
        this.repository = repository;
        this.pessoaRepository = pessoaRepository;
    }

    @Transactional("transactionManager")
    public Usuarios salvar(UsuarioCadastroDTO novoUsuarios){
        Usuarios usuario = new Usuarios();
        usuario.setNome(novoUsuarios.getNome());
        usuario.setEmail(novoUsuarios.getEmail());
        usuario.setSenha(novoUsuarios.getSenha());
        usuario.setCpf(novoUsuarios.getCpf());

        Usuarios salvo = repository.save(usuario);

        System.out.println("SALVO ID: " + salvo.getIdUsuario());

        Pessoa node = new Pessoa(salvo.getIdUsuario(), salvo.getNome());

        System.out.println(node);

        pessoaRepository.save(node);

        return salvo;
    }

    public List<Usuarios> listarTodos(){
        return repository.findAll();
    }

    public Usuarios buscarUsuario(Long id){
        return repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
    }

    @Transactional
    public void deletar(Long id) {

        Usuarios usuario = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado"));

        // remove do Neo4j
        pessoaRepository.deletarPessoa(id);

        // remove do PostgreSQL
        repository.delete(usuario);
    }

    public Usuarios login(String email, String senha){

        Usuarios usuario = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if(!usuario.getSenha().equals(senha)){
            throw new RuntimeException("Senha inválida");
        }

        return usuario;
    }


    public Usuarios atualizar(Long id, AtualizarUsuarioDTO dadosAtualizados){

        Usuarios usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dadosAtualizados.getNome());

        usuario.setEmail(dadosAtualizados.getEmail());

        usuario.setSenha(dadosAtualizados.getSenha());

        return repository.save(usuario);

    }
}