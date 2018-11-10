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

  constructor(
    private _userService:UserService
  ){
    this.user = new User();
  }

  ngOnInit(){
    
  }

  public onSubmit(){
    var texto = this._userService.singup(this.user).subscribe(
      response=>{
        console.log(response)
      },
      error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          console.log(error);
        }
      });
      console.log(texto);
  }
}
