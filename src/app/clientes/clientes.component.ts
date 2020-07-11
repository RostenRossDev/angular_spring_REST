import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginator: any;
  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number= +params.get('page');
      if(!page){
        page=0;
      }
      this.clienteService.getClientes(page)
      .subscribe(response => {this.clientes = response.content as Cliente[]
        this.paginator=response;
      }); 
    });
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

