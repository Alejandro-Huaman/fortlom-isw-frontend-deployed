import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import {OnInit} from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fortlom-isw-f';

  constructor(private router: Router, private gtmService: GoogleTagManagerService,){
      gtmService.addGtmToDom();
  }

  ngOnInit(){
    this.setUpAnalitics();
    this.setUpTagManager();
  }

  setUpAnalitics(){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event:any) => {
        gtag('config', 'G-PYFYP1WSD7', {
          'page_path': event.urlAfterRedirects
        });
      });
  }

  setUpTagManager(){
      this.router.events.forEach(item => {
        if (item instanceof NavigationEnd) {
            const gtmTag = {
                event: 'page',
                pageName: item.url
            };

            this.gtmService.pushTag(gtmTag);
        }
    });
  }
}
