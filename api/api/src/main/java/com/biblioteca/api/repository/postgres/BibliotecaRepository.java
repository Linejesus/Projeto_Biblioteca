package com.biblioteca.api.repository.postgres;

import com.biblioteca.api.entity.postgres.Biblioteca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BibliotecaRepository extends JpaRepository<Biblioteca, Long> {
}
