var drawGroup = function(data, w, h){
  this.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .classed('group_rect', true)
    .attr('width', w)
    .attr('height', h)
    .attr('x', 0)
    .attr('y', function(d, i) { 
      return i * d3.select(this).attr('height');
    })
    .attr('fill', 'rgb(15,150,150)')
    .attr('stroke', 'black');
};
var drawCurve = function(data, w, h){
  var line_width = 2;
  var padding = 2;
  var xscale = d3.scale.linear()
    .domain([0, d3.max(data.map(function(d) { return d.length; }))])
    .range([padding, w-padding]);
  var yscale = d3.scale.linear()
    .domain([d3.min(d3.min(data)), d3.max(d3.max(data))])
    .range([h - line_width, 0]);
  var newData = data.map(function(d, i) { 
    return d.map(function(d, j) {
      return {x: xscale(j), y0: yscale(d) + (h*i), y1: yscale(d) + (h*i) + line_width};
    }); 
  });
  var area = d3.svg.area()
    .x(function(d, i) { return d.x; })
    .y0(function(d) { return d.y0; })
    .y1(function(d) { return d.y1;})
    .interpolate('cardinal');
  this.selectAll('path')
    .data(newData)
    .enter()
    .append('path')
    .classed('group_attribute_timeseries', true)
    .attr('d', area)
    .attr('fill', 'orange');
};
var drawRelation = function(data, w, h){
  var line_width = 3;
  var newData = data.map(function(d, i) {
    return d.map(function(d, j){
      return [
        {
          x: 0,
          y0: i*h+(h/2)-(line_width/2),
          y1: i*h+(h/2)+(line_width/2),
          d: d
        },
        {
          x: i<j ? w/4 : w*3/4,
          y0: i<j ? i*h+(h/2)-(line_width/2) : j*h+(h/2)-(line_width/2),
          y1: i<j ? i*h+(h/2)+(line_width/2) : j*h+(h/2)+(line_width/2),
        },
        {
          x: w,
          y0: j*h+(h/2)-(line_width/2),
          y1: j*h+(h/2)+(line_width/2)
        }
      ];
    });
  });
  var area = d3.svg.area()
    .x(function(d, i) { return d.x; })
    .y0(function(d) { return d.y0; })
    .y1(function(d) { return d.y1;})
    .interpolate('basis');
  this.selectAll('g')
    .data(newData)
    .enter()
    .append('g')
    .selectAll('path')
    .data(function(d) { return d; })
    .enter()
    .append('path')
    .attr('d', area)
    .attr('fill', '#aa6666')
    .attr('fill-opacity', 0.7);

  //filter operation
  var filter = d3.select('body')
  .append('input')
  .attr('type', 'range')
  .attr('min', 0)
  .attr('max', 100)
  .attr('value', 50);
  var filterScale = d3.scale.linear()
    .range([d3.min(d3.min(data)), d3.max(d3.max(data))])
    .domain([filter.attr('min'), filter.attr('max')]);
  var that = this;
  var update = function(){
    var value = filterScale(this.value);
    that.selectAll('path')
      .attr('fill-opacity', function(d){
        if(d[0].d < value)
          return 0;
        return 0.7;
      });
  };
  filter.on('change', update);
};