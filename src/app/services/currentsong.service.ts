import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { CloudService } from "../services/cloud.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentsongService {

  files :Array<any> =[ ];
  currentsong:any={};
  constructor(public cloudService : CloudService) {
    cloudService.getFiles().subscribe (files =>  {this.files = files});
   }

  updatesong(index) {
    this.currentsong.index = index;
    console.log(this.currentsong.index);
  }

  getcurrentSong() {
    return this.currentsong;
  }
}
