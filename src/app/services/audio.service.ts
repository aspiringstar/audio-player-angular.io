import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";

import {StreamState} from "./../interfaces/stream-state";


@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$ = new Subject();

  private state : StreamState = {
    playing: false,
    currentTime:  undefined,
    duration: undefined,
    readableCurrentTime : '',
    readableDuration : '',
    canplay: false,
    error: false,
    active:false
  };

  private audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private statechange : BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private streamObservable(url) {
    return new Observable(observer => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event :Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };
      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () =>{
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        this.removeEvents (this.audioObj, this.audioEvents, handler);
      };
    });
  }
  private addEvents(obj, events, handler) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj, events, handler) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private updateStateEvents(event : Event) : void {
    switch (event.type)
    {
      case "canplay":
        this.state.canplay = true;
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.audioObj.duration);
        break;
      case "playing":
        this.state.playing = true;
        this.state.active = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.audioObj.currentTime);
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
  }

  resetState (){
    this.state ={
      playing: false,
    currentTime:  undefined,
    duration: undefined,
    readableCurrentTime : '',
    readableDuration : '',
    canplay: false,
    error: false,
    active: false
    };
  }

  getState(): Observable<StreamState> {
    return this.statechange.asObservable()
  };
  constructor() { }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  seekTo(seconds) {
    this.audioObj.currentTime = seconds;
  }
  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
  stop() {
    this.stop$.next();
  }



  playStream(url){
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }
}
