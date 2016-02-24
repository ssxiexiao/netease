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
var genConsumeData = function(count){

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