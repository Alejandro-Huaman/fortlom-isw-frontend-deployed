import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import {OnInit} from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'fortlom-isw-f'; 

  constructor(private router: Router){
  
  }

  ngOnInit(){
    this.setUpAnalitics();    
  }

  setUpAnalitics(){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event:NavigationEnd) => {
        gtag('config', 'G-PYFYP1WSD7', {
          'page_path': event.urlAfterRedirects
        });
      });
  }
  
}