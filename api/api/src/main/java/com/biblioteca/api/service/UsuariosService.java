package com.biblioteca.api.service;

import com.biblioteca.api.DTO.UsuarioCadastroDTO;
import com.biblioteca.api.entity.Usuarios;
import com.biblioteca.api.repository.UsuariosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService{
    private final UsuariosRepository repository;

    public UsuariosService(UsuariosRepository repository){
        this.repository = repository;
    }

    public Usuarios salvar(UsuarioCadastroDTO novoUsuarios){
        Usuarios usuario = new Usuarios();
        usuario.setNome(novoUsuarios.getNome());
        usuario.setEmail(novoUsuarios.getEmail());
        usuario.setSenha(novoUsuarios.getSenha());
        usuario.setCpf(novoUsuarios.getCpf());

        return repository.save(usuario);
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