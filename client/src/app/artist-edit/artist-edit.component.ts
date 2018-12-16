import { Component, OnInit, AfterViewInit, OnChanges, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Global } from "../services/global";
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.service";
import { Artist } from "../models/artist";

import * as M from "../../assets/materialize-src/js/bin/materialize.min";
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'artist-edit',
  templateUrl: '../artist-add/artist-add.component.html',
  styleUrls: ['./artist-edit.component.css'],
  
  providers: [UserService, ArtistService]
})
export class ArtistEditComponent implements OnInit, AfterViewChecked {
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url;
  public alertMessage;
  public error = false;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
  ) {
    this.titulo = "Crear nuevo artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = Global.url;

    this.artist = new Artist();
    this.is_edit = true;
  }
  ngOnInit() {
    this.getArtist();    
    
  }
  ngAfterViewChecked(){
    M.updateTextFields();
  }

  getArtist(){
    this._route.params.forEach((params: Params) => {
      let id = params["id"];
      this._artistService.getArtist(this.token, id).subscribe(
        response => {
          if(!response.artist){
            this._router.navigate(["/"]);
          }else{
            this.artist = response.artist;
          }
        },
        error => {
          this.error = true;
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
          }
        }
      );
    });
  }
}
