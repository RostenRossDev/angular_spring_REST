import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes //funcion anonima que asigna a clientes la lista cliented clienteService

    );
  }

  public delete(cliente: Cliente): void {
    
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.name} ${cliente.lastname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡¡Si, elimnar!!',
      cancelButtonText: '¡¡No, cancelar!!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes =this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              '¡¡Cliente Eliminado!!',
              `¡¡Cliente ${cliente.name} ${cliente.lastname} eliminado con exito!!`,
              'success'
            )
          }
        )
      } 
    })

    
  }
}

