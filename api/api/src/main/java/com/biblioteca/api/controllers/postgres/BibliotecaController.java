package com.biblioteca.api.controllers.postgres;

import com.biblioteca.api.DTO.BibliotecaCadastroDTO;
import com.biblioteca.api.service.postgres.BibliotecaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bibliotecas")
@RequiredArgsConstructor
public class BibliotecaController {
    private final BibliotecaService service;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody BibliotecaCadastroDTO novaBiblioteca) {
        try {
            return ResponseEntity.ok(service.salvar(novaBiblioteca));
        }catch (Exception er){
            return ResponseEntity.badRequest().body(er.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(service.buscarBiblioteca(id));
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
        try{
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
