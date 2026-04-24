package com.biblioteca.api.controllers;

import com.biblioteca.api.DTO.UsuarioCadastroDTO;
import com.biblioteca.api.entity.Usuarios;
import com.biblioteca.api.service.UsuariosService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
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
}
