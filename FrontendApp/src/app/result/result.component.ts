// result.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  response: any;

  constructor(private route: ActivatedRoute,private router: Router) {}

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.response = JSON.parse(params['response']);
        this.router.navigate([], { queryParams: {} }); 
      });
    }

    getObjectKeys(obj: any): string[] {
      return Object.keys(obj);
    }
}