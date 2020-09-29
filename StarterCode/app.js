//Create default page
function init() {
  var defaultPage = d3.select("#selDataset");
  
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => { defaultPage
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
 }
 // Initialize the dashboard
 init();


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
      // // BONUS: Build the Gauge Chart
      // buildGauge(result.wfreq);
    });
}
   
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log(result); //id940
      var otu_ids = result.otu_ids;
      console.log(otu_ids);
      var otu_labels = result.otu_labels;
      console.log(otu_labels);
      var sample_values = result.sample_values;      
      console.log(sample_values);

//Build Bubble Chart      
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            colorscale: "Earth"
          }
        }
      ];

      var bubbleLayout = {
        title: "Bubble Chart",
        margin: {top: 40},
        xaxis: {title: "OTU ID"},
      };

      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

//Build Horizontal Bar Chart
    
      var otuName = otu_ids.slice(0, 10).map(otuid => `OTU ${otuid}`).reverse();
        console.log(otuName);


        var barData = [
          {
            y: otuName,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
          }
        ];
        var barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: { top: 50, left: 150}
        };
        Plotly.newPlot("bar", barData, barLayout);
    });
}

//On change to the DOM, call getData()
d3.selectAll("#datetime").on("change", getData);




















    // function init() {
    //   // Grab a reference to the dropdown select element
    //   var selector = d3.select("#selDataset");
    //   // Use the list of sample names to populate the select options
    //   d3.json("samples.json").then((data) => {
    //     var sampleNames = data.names;
    //     sampleNames.forEach((sample) => {
    //       selector
    //         .append("option")
    //         .text(sample)
    //         .property("value", sample);
    //     });
    //     // Use the first sample from the list to build the initial plots
    //     var firstSample = sampleNames[0];
    //     buildCharts(firstSample);
    //     buildMetadata(firstSample);
    //   });
    //  }
    //  // Initialize the dashboard
    //  init();