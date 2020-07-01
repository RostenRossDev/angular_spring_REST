import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService} from './cliente.service';
import { Router , ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string= "Crear Cliente";
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public getCliente() {
    return this.cliente;
  }
  public getTitulo(){
    return this.titulo;
  }
  public cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id=params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }
  public create(){
    this.clienteService.create(this.cliente)
      .subscribe(cliente =>{
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Cliente ${this.cliente.name} creado con éxito!`, 'success')
      }
    );
  }


}
