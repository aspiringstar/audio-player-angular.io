import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,  MatIconModule, MatSliderModule } from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerComponent } from './pages/player/player.component';

import {AppRoutingModule} from "./app-routing/app-routing.module";
import { SongListComponent } from './song-list/song-list.component'

@NgModule({
  declarations: [
    
    AppComponent,
    PlayerComponent,
    SongListComponent
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
