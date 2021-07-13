import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  host: {
    '(document:keyup)': 'onKeyUp($event)'
  }
})
export class PlayerComponent implements OnInit {
  files :Array<any> =[ ];
  audioObj = new Audio ();
  state: StreamState;
  duration: number;
  currentSong:any = {};
  title: string;
  logo : string;

  constructor(public audioService: AudioService, 
    public cloudService : CloudService) { 
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

  isFirstPlaying(){
    return this.currentSong.index === 0;
  }
  isLastPlaying(){
    return this.currentSong.index === (this.files.length-1);
  }
  play(){
    console.log("clicked play");
    this.audioService.play();
  }
  pause(){
    console.log("clicked pause");
    this.audioService.pause();
    
  }
 
  next() {
    const index = this.currentSong.index + 1;
    const file = this.files[index];
    this.openFile(file,index);
    this.files[index-1].isActive = false;
  }

  previous() {
    const index = this.currentSong.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
    this.files[index+1].isActive = false;
  }

  onSliderChange(e){
    console.log(e.value);
    this.audioService.seekTo(e.value);
  
  }

  
  playstream(url){
    this.audioService.playStream(url).subscribe(events => {

    });
  }

  openFile(file, index) {
    console.log("playing");
  
    this.currentSong = {index, file};
    this.audioService.stop();
    this.playstream(file.url);
    this.title = file.name ;
    this.files.forEach((e) => {
      e.isActive = false;
    });
    this.files[index].isActive = true;
  }

  onKeyUp(event: KeyboardEvent){
    
    if(event.keyCode === 32){
      if (this.state.playing){
        this.pause();
      }
      else {
        this.play();
      }
      console.log("space is pressed");
    }
    else if (event.keyCode === 37){
      if (this.state.currentTime>5){
        this.audioService.seekTo(this.state.currentTime-5);
        this.state.currentTime -=5;
      }
      else{
        this.audioService.seekTo(0);
        this.state.currentTime =0;
      }
    }
    else if (event.keyCode === 39){
      if (this.state.currentTime< this.state.duration-5){
        this.audioService.seekTo(this.state.currentTime+5);
        this.state.currentTime +=5;
      }
      else{
        this.audioService.seekTo(this.duration);
        this.state.currentTime =this.duration;
      }
  }
  
 
  }
}