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
  public identity;
  public token;
  public errorMessage;

  constructor(
    private _userService:UserService
  ){
    this.user = new User();
  }

  ngOnInit(){
    
  }

  public onSubmit(){
    this._userService.singup(this.user).subscribe(
      response=>{
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        }else{
          this._userService.singup(this.user, "true").subscribe(
            response=>{
              console.log(response);
              let token = response.token;
              this.token = token;
              // if(this.token.length <= 0){
              //   alert("El token no se ha generado correctamente");
              // }else{
              //   console.log(token);
              //   console.log(identity);
              // }
            },
            error =>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                var body = JSON.parse(error._body);
                this.errorMessage=body.message;
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
}
