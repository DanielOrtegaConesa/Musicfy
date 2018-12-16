import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Global } from "../services/global";
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.service";
import { Artist } from "../models/artist";

@Component({
  selector: 'artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css']
})
export class ArtistAddComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
    ){
    this.titulo = "Crear nuevo artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getIdentity();
    this.url = Global.url;

    this.artist = new Artist();
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.artist);
  }

}
