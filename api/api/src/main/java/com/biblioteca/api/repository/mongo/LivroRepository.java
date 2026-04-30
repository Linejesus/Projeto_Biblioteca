package com.biblioteca.api.repository.mongo;

import com.biblioteca.api.entity.mongo.Livro;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LivroRepository extends MongoRepository<Livro, String> {
    List<Livro> findByTitulo(String titulo);

    List<Livro> findByAutoresNome(String Autor);

    List<Livro> findTop7ByTagsContaining(String tag);
}
