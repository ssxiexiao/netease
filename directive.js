var drawGroup = function(data, w, h){
  data.sort(function(b, a) {
    return a[a.length-1].x1 - b[b.length-1].x1;
  });
  var color = ['#FF8C69', '#B2DFEE', '#8FBC8F', '#8968CD', '#BDB76B'];
  var xscale = d3.scale.linear()
    .domain([0,d3.max(data.map(function(d) { return d[d.length-1].x1; }))])
    .range([0,w]);
  this.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .selectAll('rect')
    .data(function(d) { return d; })
    .enter()
    .append('rect')
    .classed('group_rect', true)
    .attr('width', function(d) {
      return xscale(d.x);
    })
    .attr('height', h)
    .attr('x', function(d) {
      return xscale(d.x1 - d.x);
    })
    .attr('y', function(d, i, j) { 
      return j * d3.select(this).attr('height');
    })
    .attr('fill', function(d, i) {
      return color[i];
    })
    .attr('fill-opacity', 1)
    .attr('stroke-width', 1)
    .attr('stroke', '#ffffff');
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
    .classed('relation', true)
    .attr('d', area)
    .attr('fill', '#808080')
    .attr('fill-opacity', 1);

  //filter operation
  var filter = d3.select('body')
  .append('input')
  .attr('type', 'range')
  .attr('min', 0)
  .attr('max', 100)
  .attr('value', 90);
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
  update.call(filter[0][0]);
  filter.on('change', update);
};