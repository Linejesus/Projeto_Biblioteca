package com.biblioteca.api.config;

import org.neo4j.driver.Driver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.neo4j.core.transaction.Neo4jTransactionManager;
import org.springframework.orm.jpa.JpaTransactionManager;

// IMPORTANTE: Se o seu Spring Boot for versão 2.x, troque "jakarta" por "javax"
import jakarta.persistence.EntityManagerFactory;

@Configuration
public class TransactionConfig {

    /**
     * Define o Postgres (JPA) como o gerenciador de transações PRIMÁRIO.
     * O Spring usará este gerenciador por padrão sempre que encontrar
     * a anotação @Transactional sem um nome especificado.
     */
    @Primary
    @Bean(name = "transactionManager")
    public JpaTransactionManager jpaTransactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }

    /**
     * Define o gerenciador de transações do Neo4j.
     * Para usá-lo, você precisará especificar: @Transactional("neo4jTransactionManager")
     */
    @Bean(name = "neo4jTransactionManager")
    public Neo4jTransactionManager neo4jTransactionManager(Driver driver) {
        return new Neo4jTransactionManager(driver);
    }

    // O MongoDB não precisa de um TransactionManager configurado aqui
    // a não ser que você esteja usando Replica Sets e precise de
    // transações multi-documento (MongoTransactionManager).
}