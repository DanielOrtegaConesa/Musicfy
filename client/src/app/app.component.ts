import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import {UserService} from "./services/user.service";
import { TouchSequence } from 'selenium-webdriver';

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
    private _userService:UserService
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
    console.log(this.user_register);
  }
}
