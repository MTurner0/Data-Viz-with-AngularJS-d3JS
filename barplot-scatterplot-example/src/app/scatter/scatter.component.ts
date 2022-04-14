import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { max } from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ]; 
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  // Note that the createSvg() method for the scatterplot is the same as the bar plot
  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawPlot(data: any[]): void {
  // Add X axis
  const x = d3.scaleLinear()
  //.domain(data.map(d => d.Reviews))
  .domain([0, 40000])
  .range([ 0, this.width ]);

  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  // tickFormat must be used when using dates instead of strings
  //.call(d3.axisBottom(x).tickFormat(d3.format("d")));
  .call(d3.axisBottom(x));

  // Label X-axis
  this.svg.append("g")
  .call(g => g.append("text")
  .attr("x", this.width * 0.5)
  .attr("y", this.height + this.margin * 0.8)
  .attr("fill", "currentColor")
  .attr("text-anchor", "middle")
  .text("# of Reviews"));

  // Add Y axis
  const y = d3.scaleLinear()
  //.domain(data.map(d => d.Stars))
  .domain([0, 5])
  .range([ this.height, 0]);

  this.svg.append("g")
  .call(d3.axisLeft(y).ticks(5));

  // Label Y-axis
  this.svg.append("g")
  .call(g => g.append("text")
  .attr("x", -this.height * 0.5)
  .attr("y", -this.margin * 0.75)
  .attr("fill", "currentColor")
  .attr("text-anchor", "middle")
  .text("Overall rating"))
  //.select("text")
  .attr("transform", "translate(0,0)rotate(-90)");

  // Add dots
  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => x(d.Reviews))
  .attr("cy", d => y(d.Stars))
  .attr("r", 7)
  .style("opacity", .5)
  .style("fill", "#9b490a");

  /* Remove point labels
  dots.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(d => d.Source)
  .attr("x", d => x(d.Reviews))
  .attr("y", d => y(d.Stars))
  .style("font-size", 10)
  .attr("text-anchor", "middle")
  .attr("transform", "translate(0,0)rotate(0)") */
}

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    d3.csv("/assets/recipes.csv").then(data => this.drawPlot(data));
  }

}
