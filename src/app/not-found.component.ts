import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-not-found',
  template: `
        <div>
            Oops, these are not the droids you are looking for,
            go <a routerLink="/">home</a>?
        </div>
    `
})
export class NotFoundComponent implements OnInit {
  ngOnInit() {}
}
