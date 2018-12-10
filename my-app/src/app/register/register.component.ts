import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  message: string;

  constructor(private _auth: AuthService, private _router: Router) {
    this.user = { email: null, password: null };
  }

  ngOnInit() {
  }

  register() {
    this._auth.register(this.user).subscribe(res => {
      this._router.navigate(['/restricted']);
      console.log(res);
      localStorage.setItem('token', res.token);
    }, err => {
      console.error(err);
      this.message = 'Failed to register new user';
    });
  }

}
