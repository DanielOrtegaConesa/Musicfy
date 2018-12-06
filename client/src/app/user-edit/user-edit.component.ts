import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import {UserService} from "../services/user.service";

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public titulo:string;
  public user:User;
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ) {
    this.titulo = "Actualizar mis datos"
   }

  ngOnInit() {
  }

}
