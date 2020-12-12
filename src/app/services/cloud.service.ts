import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  files :Array<any> =[
    {name: 'Beautiful', author : 'Eminem', url :'./src/audio/Beautiful.mp3', isActive:false},
    {name: 'Timber', author : 'Kesha', url :'./src/audio/Timber.mp3', isActive:false}
  ];

  getFiles() {
    return of(this.files);
  }
  constructor() { }
}
