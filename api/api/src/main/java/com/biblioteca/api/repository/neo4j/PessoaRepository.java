package com.biblioteca.api.repository.neo4j;

import com.biblioteca.api.entity.neo4j.LivroNode;
import com.biblioteca.api.entity.neo4j.Pessoa;

import java.util.List;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;

public interface PessoaRepository extends Neo4jRepository<Pessoa, Long> {
    @Query("""
    MATCH (p:Pessoa {idUsuario: $idUsuario})
    MATCH (l:Livro {idLivro: $idLivro})
    MERGE (p)-[:PEGOU]->(l)
""")
    void relacionarPessoaLivro(Long idUsuario, String idLivro);

    @Query("""
    MATCH (p:Pessoa {idUsuario: $idUsuario})
    MATCH (b:Biblioteca {idBiblioteca: $idBiblioteca})
    MERGE (p)-[:FREQUENTA]->(b)
""")
    void relacionarPessoaBiblioteca(Long idUsuario, Long idBiblioteca);

    @Query("""
        MATCH (p:Pessoa {idUsuario: $idUsuario})
        DETACH DELETE p
    """)
    void deletarPessoa(Long idUsuario);

    @Query("""
    MATCH (p:Pessoa {idUsuario: $idUsuario})-[:PEGOU]->(l:Livro)<-[:PEGOU]-(outra:Pessoa)-[:PEGOU]->(recomendado:Livro)

    WHERE NOT (p)-[:PEGOU]->(recomendado)

    RETURN 
        recomendado.idLivro AS idLivro,
        recomendado.titulo AS titulo

    LIMIT 10
    """)
    List<LivroNode> recomendarLivros(Long idUsuario);

    @Query("""
        MATCH (p:Pessoa)-[r:PEGOU]->(l:Livro)
        WHERE p.idUsuario = $idUsuario 
        AND l.idLivro = $idLivro
        DELETE r
    """)
    void removerRelacionamentoPessoaLivro(
            Long idUsuario,
            String idLivro
    );
}
