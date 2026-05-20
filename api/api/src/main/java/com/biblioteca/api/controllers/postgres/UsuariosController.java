package com.biblioteca.api.controllers.postgres;

import com.biblioteca.api.DTO.UsuarioCadastroDTO;
import com.biblioteca.api.entity.postgres.Usuarios;
import com.biblioteca.api.DTO.AtualizarUsuarioDTO;
import com.biblioteca.api.DTO.LoginDTO;
import com.biblioteca.api.service.postgres.UsuariosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UsuariosController {

    private final UsuariosService service;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody UsuarioCadastroDTO novoUsuario) {

        try {
            return ResponseEntity.ok(service.salvar(novoUsuario));
        }catch (Exception er){
            return ResponseEntity.badRequest().body(er.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(service.buscarUsuario(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        try{
            return ResponseEntity.ok(service.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build(); // 204
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){

        try{

            Usuarios usuario = service.login(
                    loginDTO.getEmail(),
                    loginDTO.getSenha()
            );

            return ResponseEntity.ok(usuario);

        } catch(Exception e){

            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }


    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody AtualizarUsuarioDTO dadosAtualizados
    ) {

        try {

            return ResponseEntity.ok(
                    service.atualizar(id, dadosAtualizados)
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }
}
