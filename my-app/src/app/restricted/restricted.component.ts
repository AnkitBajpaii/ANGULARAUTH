import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.css']
})
export class RestrictedComponent implements OnInit {

  message: string;
  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this._dataService.getRestrictedData().subscribe((res: string) => {
      this.message = res;
    }, err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        this._router.navigate(['/login']);
      }
    });
  }

}
