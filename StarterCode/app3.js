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
      createDataCharts(firstSample);
      createInfoBox(firstSample);
      
    });
   }
   // Initialize the dashboard
   init();

function createDataCharts (sample) {
    d3.json("samples.json").then((data) => {
        var bbData = data.samples;
        var resultArray = bbData.filter(object => object.id == sample);
        var result = resultArray[0];
        console.log(result);

        var otuIds = result.otu_ids;
        console.log(otuIds);

        var sampleValuesData = result.sample_values;
        console.log(sampleValuesData);

        var otuLabels = result.otu_labels;
        console.log(otuLabels);

        var otuName = otuIds.slice(0,10).map(otuid => `OTU ${otuid}`).reverse();
        console.log(otuName);

// Build Horizontal Bar Chart

        var trace1 = {
            x: sampleValuesData.slice(0,10).reverse(),
            y: otuName,
            text: otuLabels.slice(0,10).reverse(),
            type:"bar",
            orientation:"h",
        };
    
        var data = [trace1];
    
        var layout = {
            title: "Top 10"
            
        };
    
        Plotly.newPlot("bar", data, layout);

//Build Bubble Chart

        var bubbleTrace = {
            x: otuIds,
            y: sampleValuesData,
            text: otuLabels,
            margin: {t:40},
            mode: "markers",
            marker: {
                colorscale: "YlGnBu",
                opacity: [1, 0.8, 0.6, 0.4],
                size: sampleValuesData
            }
        };

        var bubbleData = [bubbleTrace];

        var bubbleLayout = {
            title: "Bubble Chart",
            showlegend: false,

        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

//Create Info Box

function createInfoBox(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata; 
        console.log(metadata);
        var resultArray = metadata.filter(object => object.id == sample);
        var result = resultArray[0]; 
        console.log(result);

        var infoBox = d3.select("#sample-metadata");
        infoBox.html("");

        Object.entries(result).forEach(([key, value]) => {
            infoBox.append("h5").text(`${key.toUpperCase()}: ${value}`);

        });
    });

}

function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    console.log(dataset);

    createDataCharts(dataset);
    createInfoBox(dataset);


}
