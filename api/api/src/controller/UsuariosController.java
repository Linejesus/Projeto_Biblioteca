import javax.annotation.PostConstruct;
import javax.xml.ws.RequestWrapper;

public class UsuariosController {
    private final UsuariosService services;

    public UsuariosController(UsuariosService services){
        this.services = services;
    }

    @PostMapping
    public Usuarios criar(@RequestBody Usuarios usuarios){
        return services.salvar(usuarios);
    }

    @GetMapping
    public List<Usuarios> listarTodos(){
        return services.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuarios buscarUsuario(@PathVariable Long id){
        return services.buscarUsuario(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        return services.deletar(id);
    }
}
