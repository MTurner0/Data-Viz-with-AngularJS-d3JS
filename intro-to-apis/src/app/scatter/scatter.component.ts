import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http'; // add call to API
import { DSVRowString } from 'd3';
import { Observable, lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private http: HttpClient){}

  private weatherArray: Array<JSON>;
  private humidData;
  private tempData;

  // Data collection

  private callAPI(data: DSVRowString<string>): Observable<JSON>{
    var lat = data['lat'];
    var lon = data['lng'];
    // API call
    return this.http
    // Should be able to replace proxy when putting on gh-pages
    // Run "lcp --proxyUrl https://api.openweathermap.org/data/2.5/weather" in shell
    .get<JSON>('http://localhost:8010/proxy?lat=' + lat + '&lon=' + lon + '&appid=a928af4b47141d453a0494c1667ebf55&units=metric');
  }

  private createSvg(): void{
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")")
  }

  private drawPlot(data: any[]): void {
    console.log("Trying graph...")
    
    // Add X axis
    const x = d3.scaleLinear()
    .domain([ 0, 100]) // Maxes at 100 b/c %humidity goes on X-axis (for now)
    .range([ 0, this.width ])

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x));

    // Label X-axis
    this.svg.append("g")
    .call(g => g.append("text")
    .attr("x", this.width * 0.5)
    .attr("y", this.height + this.margin * 0.8)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text("Humidity (Percent)"));

    // Add Y-axis
    const y = d3.scaleLinear()
    .domain([ -20, 40 ]) 
    .range([ this.height, 0 ]);

    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Label Y-axis
    this.svg.append("g")
    .call(g => g.append("text")
    .attr("x", -this.height * 0.5)
    .attr("y", -this.margin * 0.75)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text("Temperature (C)"))
    .attr("transform", "translate(0,0)rotate(-90)");

    // Add dots
    const dots = this.svg.append("g");
    dots.selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d['humidity']))
    .attr("cy", d => y(d['temp']))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#10a9e6") // Ask someone to pick a color
    
    console.log("Finished trying graph.");
  }


  async ngOnInit(): Promise<void> {
    // Load in CSV file of lattitudes + longitudes for US capital cities
    var cities = (await d3.csv('assets/tidy-citydata.csv'));

    // Initialize data-containing array
    this.weatherArray = new Array();

    // Call weather data and store in array
    for (var i =0; i < cities.length; i++) {
      this.weatherArray[i] = await lastValueFrom(this.callAPI(cities[i]))
      .then(data => data['main'])
      console.log('Getting ', i, '...')
      };
    
    // Plot
    this.createSvg();
    this.drawPlot(this.weatherArray);
    
  }

}
