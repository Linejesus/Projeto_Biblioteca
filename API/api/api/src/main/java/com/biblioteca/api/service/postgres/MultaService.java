package com.biblioteca.api.service.postgres;


import com.biblioteca.api.DTO.ListarEmprestimosDTO;
import com.biblioteca.api.DTO.ListarMultasDTO;
import com.biblioteca.api.entity.mongo.Livro;
import com.biblioteca.api.entity.postgres.Emprestimo;
import com.biblioteca.api.repository.postgres.EmprestimoRepository;
import com.biblioteca.api.repository.postgres.MultaRepository;
import com.biblioteca.api.entity.postgres.Multa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<ListarMultasDTO> listarTodas() {
        List<Multa> multas = multaRepository.findAll();

        return multas.stream().map(e -> {

            return new ListarMultasDTO(
                    e.getIdMulta(),
                    e.getValorTotal(),
                    e.getDataMulta(),
                    e.getDiasAtraso(),
                    e.getPaga(),
                    e.getDataPagamento(),
                    e.getEmprestimo().getIdEmprestimo()
            );

        }).toList();
    }

    public Multa buscarPorId(Long id) {
        return multaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Multa não encontrada"));
    }

    public List<Multa> buscarPorEmprestimo(Long idEmprestimo) {
        return multaRepository.findByEmprestimoIdEmprestimo(idEmprestimo);
    }

    @Transactional("transactionManager")
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

    @Transactional("transactionManager")
    public ListarMultasDTO pagarMulta(Long idMulta) {
        Multa multa = buscarPorId(idMulta);

        if (Boolean.TRUE.equals(multa.getPaga())) {
            throw new RuntimeException("Multa já está paga");
        }

        multa.setPaga(true);
        multa.setDataPagamento(LocalDate.now());

        ListarMultasDTO multaExibir = new ListarMultasDTO(
                multa.getIdMulta(),
                multa.getValorTotal(),
                multa.getDataMulta(),
                multa.getDiasAtraso(),
                multa.getPaga(),
                multa.getDataPagamento(),
                multa.getEmprestimo().getIdEmprestimo()
        );

        return multaExibir;
    }

    public void deletar(Long id) {
        multaRepository.deleteById(id);
    }
}