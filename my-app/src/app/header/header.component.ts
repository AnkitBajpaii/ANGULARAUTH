import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this._authService.loggedIn();
  }

  logOut() {
    this._authService.logout();
    this._router.navigate(['/unrestricted']);
  }
}
