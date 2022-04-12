import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key:string = 'thZ9sYvaJ7CGowATLFUqvpY0Ok32V3t3';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';

  private _historial:string[]=[];


  public resultados: Gif[]=[];

  get historial(){
    
    return [...this._historial]; // The "[]" signs are here to make a new array (in this case with the data coming from the  "_historial" array) and return it.
                                 // The "..." operator breaks the relationship between both arrays (the new one that's being created and the old one "_historial"). 
                                 //  --- This is done to avoid changes on the data stored in the original array when the "get()" is used. So it is a good practice.
  }

  constructor(private http:HttpClient){


    //this._historial = localStorage.getItem('historial');
    //if (localStorage.getItem('historial')){
    //  this._historial = JSON.parse(localStorage.getItem('historial')!);
    //}


    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query:string = ''){

    query = query.trim().toLowerCase();

    if( !this._historial.includes(query)){

      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify( this._historial));
      
    }

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query);

      console.log(params);
    

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`,{ params }) // back tips allow me to make string interpolation using "${}"
      .subscribe( (resp) => {                                                    // <SearchGifsResponse> aplies the respective interface for the http request
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }


}
