package com.biblioteca.api.service.postgres;


import com.biblioteca.api.entity.postgres.Emprestimo;
import com.biblioteca.api.repository.postgres.EmprestimoRepository;
import com.biblioteca.api.repository.postgres.MultaRepository;
import com.biblioteca.api.entity.postgres.Multa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MultaService {

    private final MultaRepository multaRepository;
    private final EmprestimoRepository emprestimoRepository;

    private static final BigDecimal VALOR_POR_DIA = new BigDecimal("2.50");

    public List<Multa> listarTodas() {
        return multaRepository.findAll();
    }

    public Multa buscarPorId(Long id) {
        return multaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Multa não encontrada"));
    }

    public List<Multa> buscarPorEmprestimo(Long idEmprestimo) {
        return multaRepository.findByEmprestimoIdEmprestimo(idEmprestimo);
    }

    public Multa gerarMulta(Long idEmprestimo) {

        if (multaRepository.existsByEmprestimoIdEmprestimo(idEmprestimo)) {
            throw new RuntimeException("Já existe multa para este empréstimo");
        }

        Emprestimo emprestimo = emprestimoRepository.findById(idEmprestimo)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado"));

        LocalDate hoje = LocalDate.now();
        LocalDate dataPrevista = emprestimo.getDataDevolucaoPrevista();
        LocalDate dataReal = emprestimo.getDataDevolucaoReal();

        LocalDate dataFinal = (dataReal != null) ? dataReal : hoje;

        if (!dataFinal.isAfter(dataPrevista)) {
            throw new RuntimeException("Empréstimo não está atrasado");
        }

        long diasAtraso = ChronoUnit.DAYS.between(dataPrevista, dataFinal);

        BigDecimal valorTotal = VALOR_POR_DIA.multiply(BigDecimal.valueOf(diasAtraso));

        Multa multa = new Multa();
        multa.setEmprestimo(emprestimo);
        multa.setDiasAtraso((int) diasAtraso);
        multa.setValorTotal(valorTotal);
        multa.setDataMulta(hoje);
        multa.setPaga(false);

        return multaRepository.save(multa);
    }

    public Multa pagarMulta(Long idMulta) {
        Multa multa = buscarPorId(idMulta);

        if (Boolean.TRUE.equals(multa.getPaga())) {
            throw new RuntimeException("Multa já está paga");
        }

        multa.setPaga(true);
        multa.setDataPagamento(LocalDate.now());

        return multaRepository.save(multa);
    }

    public void deletar(Long id) {
        multaRepository.deleteById(id);
    }
}