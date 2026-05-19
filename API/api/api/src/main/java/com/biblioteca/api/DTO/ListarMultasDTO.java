package com.biblioteca.api.DTO;

import com.biblioteca.api.entity.postgres.Emprestimo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListarMultasDTO {
    private Long idMulta;
    private BigDecimal valorTotal;
    private LocalDate dataMulta;
    private Integer diasAtraso;
    private Boolean paga;
    private LocalDate dataPagamento;
    private Long idEmprestimo;
}
