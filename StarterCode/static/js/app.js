  
// d3.json("samples.json").then((data) => {
//     var bellyButtonData = data.samples;
//     console.log(data)
//     console.log(bellyButtonData);
//     var id940 = bellyButtonData[0];
//     console.log(id940)
//     console.log("------------------------------------------------------------------")

//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//     console.log(resultArray);

//slack example
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of #sample-metadata
      var PANEL = d3.select("#sample-metadata");
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
      // Use Object.entries to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        
      });
      // BONUS: Build the Gauge Chart
      buildGauge(result.wfreq);
    });
   }
   function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
        console.log(resultArray);
        console.log(otu_ids);

      var trace1 = {
        x: sample_values,
        y: otu_ids,
        
        // text: slicedOtuLabels,
        name: "id: 940",
        type: "bar",
        orientation: "h"
      };

    var data = [trace1];

    var layout = {
        title: "id: 940"
        
    };

    Plotly.newPlot("bar", data, layout);

    });
   }
   











    // console.log("------------------------------------------------------------------")

    // function buildCharts(sample) {
    //     d3.json("samples.json").then((data) => {
    //         var bellyButtonData = data.samples;
    //         var resultArray = bellyButtonData.filter(sampleObj => sampleObj.id == samples);
    //         console.log(resultArray);
    //         var result = resultArray[0];
    //         console.log(result);
    //         var otu_ids = result.otu_ids;
    //         console.log(otu_ids)
    //         var otu_labels = result.otu_labels;
    //         console.log(otu_labels);
    //         var sample_values = result.sample_values;
    //         console.log(sample_values);
    //     });
    // }
   

// //top ten Otu_id for id:940
//     var otuIds = bellyButtonData.map(row => row.otu_ids)
//     console.log(otuIds);
//     var indOtuIds = (otuIds.map(object => object[0]));
//     var slicedotuIds = indOtuIds.slice(0,10);
//     console.log(slicedotuIds);

// // top ten Sample_values for id:940

//     var sampleValuesData = bellyButtonData.map(row => row.sample_values)   
//     console.log(sampleValuesData);

//     // var sortedSampleValues = sampleValuesData.sort(function compareFunction(firstNum, secondNum) {
//     //     return secondNum - firstNum;
//     //   });
//     // console.log(sortedSampleValues);
//     var indSampleValues = (sampleValuesData.map(object => object[0]));
//     var sortedSampleValues = indSampleValues.sort(function compareFunction(firstNum, secondNum) {
//         return secondNum - firstNum;
//     })
//     console.log(sortedSampleValues);
//     var slicedSampleValues = sortedSampleValues.slice(0,10);
//     console.log(slicedSampleValues);  
//     var sortedslicedSampleValues = slicedSampleValues.sort(function compareFunction(firstNum, secondNum) {
//         return secondNum - firstNum;
//         console.log(sortedslicedSampleValues);
//     }) 
    
// // top ten Otu_labels for id:940

//     var otuLabels = bellyButtonData.map(row => row.otu_labels)
//     var indOtuLabels = (otuLabels.map(object => object[0]));
  
//     var slicedOtuLabels = indOtuLabels.slice(0,10);
//     console.log(slicedOtuLabels);

//     var trace1 = {
//         x: sortedslicedSampleValues,
//         y: slicedotuIds,
        
//         // text: slicedOtuLabels,
//         name: "id: 940",
//         type: "bar",
//         // orientation: "h"
//     };

//     var data = [trace1];

//     var layout = {
//         title: "id: 940"
        
//     };

//     Plotly.newPlot("bar", data, layout);
