package com.biblioteca.api.controllers.mongo;

import com.biblioteca.api.DTO.ListarBibliotecaDTO;
import com.biblioteca.api.DTO.LivroResumoDTO;
import com.biblioteca.api.DTO.LivrosCadastroDTO;
import com.biblioteca.api.entity.mongo.Livro;
import com.biblioteca.api.service.mongo.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livros")
@RequiredArgsConstructor
public class LivroController {

    private final LivroService livroService;

    @PostMapping
    public ResponseEntity<Livro> cadastrar(@RequestBody LivrosCadastroDTO dto) {
        return ResponseEntity.ok(livroService.salvar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(livroService.buscarLivro(id));
    }

    @GetMapping("/bibliotecas")
    public ResponseEntity<List<ListarBibliotecaDTO>> buscarBibliotecasPorLivro(
            @RequestParam String titulo) {
        return ResponseEntity.ok(livroService.buscarBibliotecaDisponivel(titulo));
    }

    @GetMapping("/categoria")
    public ResponseEntity<List<LivroResumoDTO>> buscarPorCategoria(
            @RequestParam String categoria) {
        return ResponseEntity.ok(livroService.buscarLivrosCategoria(categoria));
    }

    @GetMapping("/autor")
    public ResponseEntity<List<LivroResumoDTO>> buscarPorAutor(
            @RequestParam String autor) {
        return ResponseEntity.ok(livroService.buscarLivrosAutor(autor));
    }

    @GetMapping("/titulo")
    public ResponseEntity<List<LivroResumoDTO>> buscarPorTitulo(
            @RequestParam String titulo) {
        return ResponseEntity.ok(livroService.buscarLivrosTitulo(titulo));
    }

    @GetMapping
    public ResponseEntity<List<LivroResumoDTO>> listarTodos() {
        return ResponseEntity.ok(livroService.listarTodos());
    }
}