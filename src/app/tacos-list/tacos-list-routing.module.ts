import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TacosListComponent } from './tacos-list.component';
import { TacoDetailComponent } from './taco-detail/taco-detail.component';

const routes = [
  {
    path: 'tacos',
    children: [
      { path: '', component: TacosListComponent },
      { path: ':id', component: TacoDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacosListRoutingModule {}
