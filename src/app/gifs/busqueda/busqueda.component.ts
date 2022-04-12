import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //The decorator "ViewChild" finds the local reference from the html file (in this case "txtBuscar")
                                                                   // The "!" sign is the "non-null assertion operator". It specifies and ensures that the element cannot be null.
                                                                   // The signs "<>" specify that the element is (in this case) an "HTMLInputElement" to get better typing while coding.

  constructor( private gifsService:GifsService ){}

  buscar(  ){

    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0){
      return
    }

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';

  }

}
