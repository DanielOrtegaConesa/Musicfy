import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import {UserService} from "./services/user.service";
import { TouchSequence } from 'selenium-webdriver';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'Musicfy';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;

  constructor(
    private _userService:UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
    this.user = new User();
    this.user_register = new User();
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit(){
    this._userService.singup(this.user).subscribe(

      response=>{
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          this.errorMessage = "El usuario no esta correctamente identificado";
        }else{
          localStorage.setItem("identity", JSON.stringify(identity));
          this._userService.singup(this.user, "true").subscribe(
            response => {
              let token = response.token;
              this.token = token;
              if(this.token.length <= 0){
                this.errorMessage= "El token no se ha generado correctamente";
              }else{
                localStorage.setItem("token", JSON.stringify(token));
              }
            },
            error =>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
              }
            });

        }
      },

      error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage=body.message;
        }
      });
  }
  
  public onSubmitRegister(){
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.errorMessage = "Error al registrarse";
        }else{
          this.errorMessage = false;
          this.user_register = new User();
        }
      },
      error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      }
    );
  }

  public logout(){
    localStorage.removeItem("identity");
    localStorage.removeItem("token");
    this.identity = null;
    this.token = null;
    
    this.user = new User();
    this.user_register = new User();
    this._router.navigate(["/"]);
  }
}
