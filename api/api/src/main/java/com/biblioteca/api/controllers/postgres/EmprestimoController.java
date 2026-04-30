package com.biblioteca.api.controllers.postgres;

import com.biblioteca.api.DTO.EmprestimoCadastroDTO;
import com.biblioteca.api.service.postgres.EmprestimoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public class EmprestimoController {

    private EmprestimoService emprestimoService;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody EmprestimoCadastroDTO novoEmprestimo) {
        try {
            return ResponseEntity.ok(emprestimoService.salvar(novoEmprestimo));
        }catch (Exception er){
            return ResponseEntity.badRequest().body(er.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listarMeusEmprestismo(@PathVariable Long id) {
        try{
            return ResponseEntity.ok(emprestimoService.listarMeusEmprestimos(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        try{
            return ResponseEntity.ok(emprestimoService.listarTodos());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        emprestimoService.deletar(id);
        return ResponseEntity.noContent().build(); // 204
    }

    @PutMapping("/{id}/Status")
    public ResponseEntity<String> atualizarStatus(@PathVariable Long id, @RequestBody String status){
        try{
            emprestimoService.atualizarStatus(id, status);
            return ResponseEntity.noContent().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/renovar")
    public ResponseEntity<String> renovar(@PathVariable Long id){
        try{
            emprestimoService.renovar(id);
            return ResponseEntity.noContent().build();
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
