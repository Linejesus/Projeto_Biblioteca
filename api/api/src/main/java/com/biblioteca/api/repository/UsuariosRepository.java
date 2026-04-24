package com.biblioteca.api.repository;

import com.biblioteca.api.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    
}
