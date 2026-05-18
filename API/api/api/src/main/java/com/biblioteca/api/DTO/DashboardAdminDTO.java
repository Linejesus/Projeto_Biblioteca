package com.biblioteca.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DashboardAdminDTO {

    private long totalLivros;
    private long totalUsuarios;
    private long totalBibliotecas;
    private long totalEmprestimos;
    private long totalMultas;
    private long multasPendentes;
    private int maiorTempoAtraso;
}