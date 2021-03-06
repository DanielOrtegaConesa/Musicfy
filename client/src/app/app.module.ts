import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { UserEditComponent } from './user-edit/user-edit.component';

import {routing, AppRoutingProviders} from "./app.routing";
import { ArtistListComponent } from './artist-list/artist-list.component';
import { HomeComponent } from './home/home.component';
import { ArtistAddComponent } from './artist-add/artist-add.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
