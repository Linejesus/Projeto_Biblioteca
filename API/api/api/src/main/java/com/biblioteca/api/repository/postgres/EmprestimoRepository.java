package com.biblioteca.api.repository.postgres;

import com.biblioteca.api.entity.postgres.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByUsuario_IdUsuario(Long idUsuario);
}
