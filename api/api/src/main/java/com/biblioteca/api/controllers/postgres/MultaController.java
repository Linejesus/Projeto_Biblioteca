package com.biblioteca.api.controllers.postgres;

import com.biblioteca.api.entity.postgres.Multa;
import com.biblioteca.api.service.postgres.MultaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/multas")
@RequiredArgsConstructor
public class MultaController {

    private final MultaService multaService;

    @GetMapping
    public ResponseEntity<List<Multa>> listarTodas() {
        return ResponseEntity.ok(multaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Multa> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(multaService.buscarPorId(id));
    }

    @GetMapping("/emprestimo/{idEmprestimo}")
    public ResponseEntity<List<Multa>> buscarPorEmprestimo(@PathVariable Long idEmprestimo) {
        return ResponseEntity.ok(multaService.buscarPorEmprestimo(idEmprestimo));
    }

    @PostMapping("/gerar/{idEmprestimo}")
    public ResponseEntity<Multa> gerarMulta(@PathVariable Long idEmprestimo) {
        Multa multa = multaService.gerarMulta(idEmprestimo);
        return ResponseEntity.ok(multa);
    }

    @PutMapping("/pagar/{id}")
    public ResponseEntity<Multa> pagarMulta(@PathVariable Long id) {
        Multa multa = multaService.pagarMulta(id);
        return ResponseEntity.ok(multa);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        multaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}