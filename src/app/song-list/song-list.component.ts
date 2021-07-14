import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { AudioService } from "../services/audio.service";
import { CloudService } from "../services/cloud.service";
import { StreamState } from "../interfaces/stream-state";
import { CurrentsongService } from '../services/currentsong.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {

  files :Array<any> =[ ];
  audioObj = new Audio ();
  state: StreamState;
  duration: number;
  currentSong:any = {};
  title: string; 
  logo : string;

  constructor(public audioService: AudioService, 
    public cloudService : CloudService,
    public currentSongService : CurrentsongService) { 
    cloudService.getFiles().subscribe(files => {
      this.files = files });
    audioService.getState().subscribe(state => {
      this.state = state;
    
    });
    this.title = 'Audio Player';
    this.logo  = 'music_note';
  
  }

  ngOnInit() {
  }


  
  playstream(url){
    this.audioService.playStream(url).subscribe(events => {

    });
  }

  openFile(file, index) {
    console.log("playing");
    this.currentSongService.updatesong(index);
    this.currentSong = {index, file};
    this.audioService.stop();
    this.playstream(file.url);
    this.title = file.name ;
    this.files.forEach((e) => {
      e.isActive = false;
    });
    this.files[index].isActive = true;
  }

  

}
