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
  private errores: string[];
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
  public getErrores(){
    return this.errores;
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
        Swal.fire('Nuevo cliente', `El cliente ${cliente.name} ha sido creado con éxito!`, 'success')
      }, 
      err =>{
        this.errores = err.error.errors as string[];

      }
    );

  }

  public update():void{
    this.clienteService.update(this.cliente)
      .subscribe(cliente =>{
        this.router.navigate(['/clientes'])
        console.log(cliente.name);
        Swal.fire('Cliente Actualizado', `El cliente ${cliente.name} fue actualizado con éxito!!`, 'success')
      }, 
      err =>{
        this.errores = err.error.errors as string[];
        
      })
  }

}
