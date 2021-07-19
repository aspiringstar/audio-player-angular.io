import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files :Array<any> =[
    {name: 'Beautiful', author : 'Eminem', url :'../assets/Beautiful.mp3', isActive:false},
    {name: 'Timber', author : 'Kesha', url :'../assets/Timber.flac', isActive:false},
    {name: 'Canon', author : 'Pachabel', url :'../assets/canon.mp3', isActive:false}
  ];

  file : Array<any> =[ ];

  
  constructor( private httpClient : HttpClient) { }

  getFiles() : Observable<any>{
   return this.httpClient.get<any>('http://localhost:3000/songs');
      
    
    
   //return of(this.files);

  }
}
