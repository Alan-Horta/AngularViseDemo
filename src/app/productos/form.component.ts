import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CONSTANTS } from '../utils/constants';
import { Producto } from './models/producto';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public producto : Producto = new Producto();

  constructor(
    private producoService: ProductoService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto():void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.producoService.getProductoById(id).subscribe(response => {
          if(response.codigo == CONSTANTS.CODIGO_EXITO){
            this.producto = response.data;
          }else{
            Swal.fire(
              'Error',
              response.mensaje,
              'warning'
            );
          }
        });
      }
    });
  }

  crearProducto():void{
    this.producoService.createProducto(this.producto).subscribe(response => {
      if(response.codigo == CONSTANTS.CODIGO_EXITO){
        let head = $localize`Producto creado`
        this.router.navigate(['/productos']);
        Swal.fire(
          head,
          `${this.producto.nombre}`,
          'success'
        );
      }else{
        Swal.fire(
          'Error',
          response.mensaje,
          'warning'
        );
      }
    });
  }

  actualizarProducto():void{
    this.producoService.updateProducto(this.producto).subscribe(response => {
      if(response.codigo == CONSTANTS.CODIGO_EXITO){
        let head = $localize `Producto actualizado`;
        this.router.navigate(['/productos']);
        Swal.fire(
          head,
          `${this.producto.nombre}`,
          'success'
        );
      }else{
        Swal.fire(
          'Error',
          response.mensaje,
          'warning'
        );
      }
    });
  }

}
