import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';
import { PrecioRequerido } from '../models/precio-requerido';
import { ResponseServer } from '../models/response-server';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint:string = 'http://localhost:8080/api/productos';
  private createEndPoint:string = '/new';
  private updateEndPoint:string = '/edit';
  private deleteEndPoint:string = '/delete';
  private precioEndPoint:string = '/precio';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Accept-Language':$localize`es`});

  constructor(private http: HttpClient) { }

  getProductos() : Observable<ResponseServer>{
    return this.http.get<ResponseServer>(this.urlEndPoint, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(
          'Error',
          e.error.mensaje,
          'warning'
        );
        return throwError(e);
      })
    )
  };

  getProductoById(id) : Observable<ResponseServer>{
    return this.http.get<ResponseServer>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(
          'Error',
          e.error.mensaje,
          'warning'
        );
        return throwError(e);
      })
    )
  };

  getProductoByPrecioMinimoMarca(precio:PrecioRequerido) : Observable<ResponseServer>{
    return this.http.post<ResponseServer>(this.urlEndPoint + this.precioEndPoint, precio, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(
          'Error',
          e.error.mensaje,
          'warning'
        );
        return throwError(e);
      })
    )
  };

  createProducto(producto:Producto) : Observable<ResponseServer>{
    return this.http.post<ResponseServer>(this.urlEndPoint + this.createEndPoint, producto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(
          'Error',
          e.error.mensaje,
          'warning'
        );
        return throwError(e);
      })
    )
  };

  updateProducto(producto:Producto) : Observable<ResponseServer>{
    return this.http.post<ResponseServer>(this.urlEndPoint + this.updateEndPoint, producto, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(
          'Error',
          e.error.mensaje,
          'warning'
        );
        return throwError(e);
      })
    )
  };

  deleteProductoById(id) : Observable<ResponseServer>{
    return this.http.delete<ResponseServer>(`${this.urlEndPoint}${this.deleteEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire(
          'Error',
          e.error.mensaje,
          'warning'
        );
        return throwError(e);
      })
    )
  };
}
