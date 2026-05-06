package com.biblioteca.api.service.postgres;

import com.biblioteca.api.DTO.UsuarioCadastroDTO;
import com.biblioteca.api.entity.neo4j.Pessoa;
import com.biblioteca.api.entity.postgres.Usuarios;
import com.biblioteca.api.repository.neo4j.PessoaRepository;
import com.biblioteca.api.repository.postgres.UsuariosRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

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

        Pessoa node = new Pessoa(salvo.getIdUsuario(), salvo.getNome());

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

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado");
        }
        repository.deleteById(id);
    }


}