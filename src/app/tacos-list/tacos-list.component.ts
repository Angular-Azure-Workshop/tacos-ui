import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TacosService } from './tacos.service';
import { Taco } from './taco.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tacos-list',
  templateUrl: './tacos-list.component.html',
  styleUrls: ['./tacos-list.component.css']
})
export class TacosListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'category', 'description'];
  tacos: Taco[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  resultsLength = 0;
  constructor(private router: Router, private tacosService: TacosService) {}

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const sort = this.sort.active ? this.sort.active : 'description';
          const direction =
            this.sort.direction !== '' ? this.sort.direction : 'asc';
          return this.tacosService.getTacos();
        }),
        map(data => {
          this.resultsLength = data['totalItems'];

          return data['items'];
        }),
        catchError(() => {
          return observableOf([]);
        })
      )
      .subscribe(data => (this.tacos = data));
  }

  viewRecipe(id) {
    this.router.navigate(['/tacos', id]);
  }
}
