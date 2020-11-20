import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  files :Array<any> =[
    {name: 'Beautiful', author : 'Eminem'},
    {name: 'Timber', author : 'Kesha'}
  ];
  
  state;
  
  currentSong = {};

  isFirstPlaying(){
    return true;
  }
  isLastPlaying(){
    return false;
  }


  constructor() { 
    this.state = 1;
  
  }

  ngOnInit() {
  }

  play(){
    console.log("clicked play");
    this.state=0;
  }
  pause(){
    console.log("clicked pause");
    this.state=1;
  }

}
