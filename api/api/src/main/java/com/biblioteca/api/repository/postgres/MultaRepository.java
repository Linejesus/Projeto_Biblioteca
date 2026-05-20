package com.biblioteca.api.repository.postgres;

import com.biblioteca.api.entity.postgres.Multa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultaRepository extends JpaRepository<Multa, Long> {

    List<Multa> findByEmprestimoIdEmprestimo(Long idEmprestimo);

    boolean existsByEmprestimoIdEmprestimo(Long idEmprestimo);
}