public class UsuariosService{
    private final UsuariosRepository repository;

    public UsuariosService(UsuariosRepository repository){
        this.repository = repository;
    }

    public Usuarios salvar(Usuarios usuarios){
        return repository.save(usuarios);
    }

    public List<Usuarios> listarTodos(){
        return repository.findAll();
    }
    public Usuarios buscarUsuario(Long id){
        return repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
    }

    public Usuarios deletar(Long id){
        return repository.deleteById(id);
    }


}