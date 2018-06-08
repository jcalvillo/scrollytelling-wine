
//************************* TREE ***************************//
d3.json("data/exports2014.json", function(error, data){
  if (error) throw error;

  // console.log(data);

  // data.forEach(function(d){
  //             console.log("2014 Wine Exports",
  //                             d.country,
  //                             d.export_value_USD,
  //                             "USD");
  //             });

  // our TREE-MAP here

});

//************************* SCATTER ***************************//

d3.json("data/winemag-data-130k-v2.json", function(error, data){
  if (error) throw error;

  // console.log(data);

  // data.forEach(function(d){
  //             console.log(d.country,
  //                         d.points,
  //                         d.variety);
  //             });

  // our WEIGHTED SCATTER PLOT HERE

});
