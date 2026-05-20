package com.biblioteca.api.controllers.postgres;

import com.biblioteca.api.DTO.AtualizarEmprestimoDTO;
import com.biblioteca.api.DTO.AtualizarUsuarioDTO;
import com.biblioteca.api.DTO.EmprestimoCadastroDTO;
import com.biblioteca.api.DTO.ListarEmprestimosDTO;
import com.biblioteca.api.service.postgres.EmprestimoService;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/emprestimos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EmprestimoController {

    private final EmprestimoService emprestimoService;

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody EmprestimoCadastroDTO novoEmprestimo) {
        try {
            return ResponseEntity.ok(emprestimoService.salvar(novoEmprestimo));
        }catch (Exception er){
            return ResponseEntity.badRequest().body(er.getMessage());
        }
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> listarMeusEmprestimos(
            @PathVariable Long idUsuario
    ) {
        try {
            return ResponseEntity.ok(
                    emprestimoService.listarMeusEmprestimos(idUsuario)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        try{
            return ResponseEntity.ok(emprestimoService.listarTodosDTO());
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


    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(
            @PathVariable Long id,
            @RequestBody AtualizarEmprestimoDTO dadosAtualizados
    ) {

        try {

            emprestimoService.atualizar(id, dadosAtualizados);

            return ResponseEntity.ok().body(Map.of("mensagem", "Empréstimo atualizado com sucesso"));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

}
