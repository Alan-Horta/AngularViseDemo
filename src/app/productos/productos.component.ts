import { Component, OnInit } from '@angular/core';
import { Producto } from './models/producto';
import { ProductoService } from './services/producto.service';
import Swal from 'sweetalert2';
import { CONSTANTS } from '../utils/constants';
import { PrecioRequerido } from './models/precio-requerido';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(private producoService: ProductoService) { }

  public productos : Producto[];
  //public productosBack : Producto[];
  public marcaElegida : string;
  public precioMinimo : number;

  ngOnInit(): void {
    this.obtenerListaGeneral();
  }

  obtenerListaGeneral(){
    this.producoService.getProductos().subscribe(response => {
      if(response.codigo == CONSTANTS.CODIGO_EXITO){
        this.productos = response.data;
        //this.productos = this.productosBack;
      }else{
        Swal.fire(
          'Error',
          response.mensaje,
          'warning'
        )
      }
    });
  }

  deleteProducto(producto:Producto):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: $localize `¿Estas seguro?`,
      text: $localize `¿Seguro que deseas eliminar al producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: $localize `Si, eliminar!`,
      cancelButtonText: $localize `No, cancelar!`,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.producoService.deleteProductoById(producto.id).subscribe(response => {
          if(response.codigo == CONSTANTS.CODIGO_EXITO){
            this.productos = this.productos.filter(pro => pro !== producto);
            //this.filtrarProductosMarca(this.marcaElegida);
            let head = $localize `¡Producto Eliminado!`;
            let mensaje = $localize `Producto ${producto.nombre} fue eliminado`;
            swalWithBootstrapButtons.fire(
              head,
              mensaje,
              'success'
            )
          }else{
            Swal.fire(
              'Error',
              response.mensaje,
              'warning'
            )
          }

        });
      }
    })
  }

  obtenerPorPrecioMinimo(_precio:number){
    this.precioMinimo = _precio;
  }

  filtrarProductosMarca(_marca:string):void{
    this.marcaElegida = _marca
    //this.productos = this.productosBack;
    //if(_marca){
    //  this.productos = this.productos.filter(pro => pro.marca.toUpperCase().includes(_marca.toUpperCase()));
    //}
  }

  obtenerPorPrecioMinimoMarca(){
    let precioRequerido = new PrecioRequerido();
    precioRequerido.precioNecesario = this.precioMinimo;
    precioRequerido.marca = this.marcaElegida;

    this.producoService.getProductoByPrecioMinimoMarca(precioRequerido).subscribe(response => {
      if(response.codigo == CONSTANTS.CODIGO_EXITO){
        this.productos = response.data;
        //this.filtrarProductosMarca(this.marcaElegida);
      }else{
        Swal.fire(
          'Error',
          response.mensaje,
          'warning'
        )
      }
    });
  }

}
