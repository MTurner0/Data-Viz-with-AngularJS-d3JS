import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // add call to API
// import * as d3 from 'd3';
// import { DSVRowString } from 'd3';
// import { Observable, lastValueFrom } from 'rxjs';
// import { Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'intro-to-apis';
}
/*
export class AppComponent implements OnInit {
  // Implementing OnInit
  constructor(private http: HttpClient){}

  public weatherArray: Array<JSON>;

  private callAPI(data: DSVRowString<string>): Observable<JSON>{
      var lat = data['lat'];
      var lon = data['lng'];
      // API call
      return this.http
      // Should be able to replace proxy when putting on gh-pages
      // Run "lcp --proxyUrl https://api.openweathermap.org/data/2.5/weather" in shell
      .get<JSON>('http://localhost:8010/proxy?lat=' + lat + '&lon=' + lon + '&appid=a928af4b47141d453a0494c1667ebf55');

  }

  title = 'intro-to-apis';
  
  async ngOnInit(): Promise<void> {
      var cities = (await d3.csv('assets/tidy-citydata.csv'));
      this.weatherArray = new Array();

      for (var i =0; i < 5; i++) {
      this.weatherArray[i] = await lastValueFrom(this.callAPI(cities[i]))
      .then(data => data['main'])
      console.log('Getting ', i, '...')
      };
      
      
      
      .subscribe(response => {
        console.log('response success ', response);
        this.weatherArray = response['main'];
        console.log('Inside subscription:', this.weatherArray);
      })
      
      for (var i =0; i < 5; i++) {
        this.callAPI(cities[i])
        .subscribe(response => {
          console.log('response success ', response);
          this.humidTempArray[i] = response['main'];
          //console.log('humidTempArray: ', this.humidTempArray[i])
        }); 
      }
} */
