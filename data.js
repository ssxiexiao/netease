var genAttrData = function(count, timeWindow){
  var data = [];
  for(var i = 0; i < count; i++){
    data.push([]);
    for(var j = 0; j < timeWindow; j++){
      data[i].push(Math.random()*100);
    }
  }
  return data;
};
var genConsumeData = function(groupCount, goodsCount){
  var data = [];
  for(var i = 0; i < groupCount; i++){
    data.push([]);
    for(var j = 0; j < goodsCount; j++){
      if(j > 0)
        data[i].push((Math.random()*20)+3);
      else
        data[i].push((Math.random()*20)+15);
    }
  }
  data = data.map(function(d1, i) {
    return d1.map(function(d2, j) {
      var obj = {};
      obj.x = d2;
      obj.x1 = d3.sum(d1.slice(0, j)) + obj.x;
      return obj;
    });
  })
  return data;
};
var genRelationData = function(n1, n2){
  var data = [];
  for(var i = 0; i < n1; i++){
    data.push([]);
    for(var j = 0; j < n2; j++){
      data[i].push(Math.random()*10);
    }
  }
  return data;
};