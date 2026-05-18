package com.biblioteca.api.service;

import com.biblioteca.api.DTO.DashboardAdminDTO;
import com.biblioteca.api.entity.postgres.Multa;
import com.biblioteca.api.repository.mongo.LivroRepository;
import com.biblioteca.api.repository.postgres.BibliotecaRepository;
import com.biblioteca.api.repository.postgres.EmprestimoRepository;
import com.biblioteca.api.repository.postgres.MultaRepository;
import com.biblioteca.api.repository.postgres.UsuariosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final LivroRepository livroRepository;

    private final UsuariosRepository usuariosRepository;

    private final BibliotecaRepository bibliotecaRepository;

    private final EmprestimoRepository emprestimoRepository;

    private final MultaRepository multaRepository;

    public DashboardAdminDTO buscarDadosDashboard() {

        long totalLivros = livroRepository.count();

        long totalUsuarios = usuariosRepository.count();

        long totalBibliotecas = bibliotecaRepository.count();

        long totalEmprestimos = emprestimoRepository.count();

        long totalMultas = multaRepository.count();

        List<Multa> multas = multaRepository.findAll();

        long multasPendentes = multas.stream()
                .filter(m -> !m.getPaga())
                .count();

        int maiorTempoAtraso = multas.stream()
                .max(Comparator.comparing(Multa::getDiasAtraso))
                .map(Multa::getDiasAtraso)
                .orElse(0);

        return new DashboardAdminDTO(
                totalLivros,
                totalUsuarios,
                totalBibliotecas,
                totalEmprestimos,
                totalMultas,
                multasPendentes,
                maiorTempoAtraso
        );
    }
}