package com.biblioteca.api.entity.postgres;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "multas")
@Data
public class Multa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_multa")
    private Long idMulta;

    @Column(name = "valor_total", nullable = false, precision = 8, scale = 2)
    private BigDecimal valorTotal;

    @Column(name = "data_multa", nullable = false)
    private LocalDate dataMulta;

    @Column(name = "dias_atraso")
    private Integer diasAtraso;

    @Column(name = "paga")
    private Boolean paga = false;

    @Column(name = "data_pagamento")
    private LocalDate dataPagamento;

    // Relacionamento com Emprestimo
    @ManyToOne
    @JoinColumn(name = "id_emprestimo", nullable = false)
    private Emprestimo emprestimo;
}