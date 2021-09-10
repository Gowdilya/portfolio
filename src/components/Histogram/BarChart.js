// BarChart.js
import * as d3 from "d3";
import React, { useRef, useEffect } from "react";

function BarChart({ width, height, data, bins }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width + 200)
      .attr("height", height + 200)
      .style("border", "1px solid black");
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);
    var selection = svg.selectAll("rect").data(data);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    var xScale = d3.scaleBand().range([0, width]).padding(0.5);
    xScale.domain(data);

    var xCoordScale = d3
      .scaleLinear()
      .domain([d3.min(bins), d3.max(bins)])
      .range([0, width]);

    var xScaleAxis = d3.scaleBand().range([0, width]).padding(0.5);
    xScaleAxis.domain(bins);
    var x_axis = d3.axisBottom().scale(xCoordScale);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height - 100]);

    var yAxisScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - 100, 0]);

    var y_axis = d3.axisLeft().scale(yAxisScale);

    selection
      .transition()
      .duration(300)
      .attr("height", (d) => yScale(d))
      .attr("y", (d) => height - yScale(d));

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "orange")
      .attr("transform", "translate(-70, -90)")
      // .on("click", click)
      .attr("x", function (d, i) {
        return xCoordScale(bins[i]);
      })
      .attr("y", function (d) {
        return height - yScale(d);
      })
      .attr("width", xScaleAxis.bandwidth())
      .attr("height", function (d) {
        return yScale(d);
      });

    selection
      .exit()
      .transition()
      .duration(300)
      .attr("y", (d) => height)
      .attr("height", 0)
      .remove();

    svg.append("g").attr("transform", "translate(30, 410)").call(x_axis);
    svg.append("g").attr("transform", "translate(30, 110)").call(y_axis);

    //mouse events
    // On Click, we want to add data to the array and chart
    var dataset = [];
    svg.on("click", function (event) {
      var coords = d3.pointer(event);

      // console.log(xScale.invert(coords[0]) - 30);
      var eachBand = xScaleAxis.step();
      var index = Math.round((coords[0] - 30) / eachBand);
      var val = xScaleAxis.domain()[index];

      console.log(xCoordScale.invert(coords[0] - 30));

      console.log("CLOSEST BIN:" + (val - bins[0]));
      console.log("Y:" + (d3.max(data) - yScale.invert(coords[1] - 110)));
    });
  };

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default BarChart;
