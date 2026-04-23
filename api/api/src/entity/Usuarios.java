import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Usuarios")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;
    
    @Column(columnDefinition = "varchar(150) not null")
    private String nome;

    @Column(columnDefinition = "varchar(150) not null")
    private String email;

    @Column(columnDefinition = "varchar(255) not null")
    private String senha;

    @Column(columnDefinition = "varchar(14) not null unique")
    private String cpf;

    @Column(columnDefinition = "date default current_date")
    private Date data_cadastro;
}