package com.biblioteca.api.repository.postgres;

import com.biblioteca.api.entity.postgres.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    
}
