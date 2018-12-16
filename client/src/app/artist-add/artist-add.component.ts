import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Global } from "../services/global";
import { UserService } from "../services/user.service";
import { ArtistService } from "../services/artist.service";
import { Artist } from "../models/artist";

@Component({
  selector: 'artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url;
  public alertMessage;
  public error = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
    ){
    this.titulo = "Crear nuevo artista";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = Global.url;

    this.artist = new Artist();
  }

  ngOnInit() {
  }

  onSubmit(){
    this._artistService.addArtist(this.token,this.artist).subscribe(
      response => {
        if(!response.artist){
          console.log(response);
          this.error = true;
          this.alertMessage = "Error en el servidor";
        }else{
          this.error = false;
          this.alertMessage = "El artista se ha creado correctamente";
          this.artist = response.artist;
          this._router.navigate(["/editar-artista"], response.artist._id);
        }
      },
      error => {
        this.error = true;
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
        }
      }
    );
  }

}
