import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import {UserService} from "../services/user.service";
import {Global} from "../services/global";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public titulo:string;
  public user:User;
  public alertMessage
  public error;
  public filesToUpload: Array<File>;

  constructor(
    private _userService: UserService
  ) {
    this.titulo = "Actualizar mis datos"
    this.user = this._userService.getIdentity();
   }

  ngOnInit() {
  }

  onSubmit(){
    this._userService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.alertMessage = "El usuario no se ha actualizado";
        }else{
          this.alertMessage = "El usuario se ha actualizado correctamente";
          localStorage.setItem("identity", JSON.stringify(response.user));

          if(!this.filesToUpload){
            
          }else{
            this.makeFileRequest(
              Global.url+"upload-image-user/"+this.user._id,
              [],
              this.filesToUpload).then(
                (result: any) => {
                  this.user.image = result.image;                  
                  localStorage.setItem("identity", JSON.stringify(this.user));
                  console.log(this.user);
                }
              );
          }
        }
      },
      error => {
        this.error = true;
        var errorMessage = <any>error;
          if(errorMessage != null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
          }
      }
    );
  }

  fileChange(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    var token = this._userService.getToken();

    return new Promise(function(resolve, reject){
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      for(var i = 0; i < files.length; i++){
        formData.append("image", files[i], files[i].name);
      }
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Authorization", token);
      xhr.send(formData);
    });
  }


}
