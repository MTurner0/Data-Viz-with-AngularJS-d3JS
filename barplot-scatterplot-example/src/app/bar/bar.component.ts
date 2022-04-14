import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})

export class BarComponent implements OnInit {

  /* Hard-encoded data
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ]; */
  private svg; //d3.Selection<SVGGElement, unknown, HTMLElement, any>; 
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Source))
  .padding(0.4);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(0,0)rotate(-10)")
  .style("text-anchor", "middle");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 5])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y).ticks(5)) // Ensure one tick for each star

  // Add Y-axis label
  this.svg.append("g")
  .call(g => g.append("text")
  .attr("x", -this.height * 0.5)
  .attr("y", -this.margin * 0.75)
  .attr("fill", "currentColor")
  .attr("text-anchor", "middle")
  .text("Overall rating"))
  //.select("text")
  .attr("transform", "translate(0,0)rotate(-90)");

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => x(d.Source))
  .attr("y", d => y(d.Stars))
  .attr("width", x.bandwidth())
  .attr("height", (d) => this.height - y(d.Stars))
  .attr("fill", "#9b490a");
}

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    // Parse data from a CSV
    d3.csv("/assets/recipes.csv").then(data => this.drawBars(data));
  }

}