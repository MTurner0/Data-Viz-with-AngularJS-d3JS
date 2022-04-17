import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // add call to API
import * as d3 from 'd3';
import { DSVRowString } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Implementing OnInit
  constructor(private http: HttpClient){}

  private getHuidityTemp(data: DSVRowString<string>): void{
      var lat = data['lat'];
      var lon = data['lng'];
      // API call
      this.http
      // Should be able to replace proxy when putting on gh-pages
      // Run "lcp --proxyUrl https://api.openweathermap.org/data/2.5/weather" in shell
      .get<any>('http://localhost:8010/proxy?lat=' + lat + '&lon=' + lon + '&appid=a928af4b47141d453a0494c1667ebf55')
      .subscribe(data => {
        console.log([JSON.stringify(data.main.humidity), JSON.stringify(data.main.temp)]);
      });

  }

  title = 'intro-to-apis';
  
  async ngOnInit(): Promise<void> {
      var cities = (await d3.csv('assets/tidy-citydata.csv'))
      for (var i =0; i < 5; i++) {
      console.log(this.getHuidityTemp(cities[1]))
      }

  }
}
