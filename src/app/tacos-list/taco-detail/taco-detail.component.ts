import { Component, OnInit } from '@angular/core';
import { Taco } from '../taco.model';
import { Router, ActivatedRoute } from '@angular/router';
import { TacosService } from '../tacos.service';

@Component({
  selector: 'app-taco-detail',
  templateUrl: './taco-detail.component.html',
  styleUrls: ['./taco-detail.component.css']
})
export class TacoDetailComponent implements OnInit {
  taco: Taco;
  tacoId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tacosService: TacosService
  ) {}

  ngOnInit() {
    this.tacosService.getTaco().subscribe((data: Taco) => {
      const items = data['items'].filter(item => {
        return item._id === this.route.snapshot.params['id'];
      });
      this.taco = items[0];
    });
  }

  goBack() {
    this.router.navigate(['/tacos']);
  }
}
