import { Injectable } from '@angular/core';
import { formatDate, DatePipe} from '@angular/common';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2' 
import {Router} from '@angular/router'



@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any>{
    //return of (CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint+'/page/'+page).pipe(
      map((response : any) => {
        (response.content as Cliente[]).map(cliente =>{
          cliente.name=cliente.name.toUpperCase();
          return cliente;
        });
        return response;
      })
      
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente,{headers:this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e =>{

        if(e.status==400){
          return throwError(e);
        }
        console.log(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al editar', e.error, 'error');
        return throwError(e);
      })
    );
  }

  update (cliente : Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response : any)=> response.cliente as Cliente),
      catchError(e =>{
        if(e.status==400){
          return throwError(e);
        }
        console.log("el error es: "+e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.log(e.error.mensaje)
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }
}
