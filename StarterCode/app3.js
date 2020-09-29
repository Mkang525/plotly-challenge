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
      
      var defaultSample = sampleNames[0];
      createDataCharts(defaultSample);
      createInfoBox(defaultSample);
      buildGauge(defaultSample);
      
    });
}
init();

//Create function to build charts

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
                opacity: [1, 0.8, 0.6, 0.4, 0.2],
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

// BONUS: Build the Gauge Chart

function buildGauge(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata; 
        console.log(metadata);
        var resultArray = metadata.filter(object => object.id == sample);
        var result = resultArray[0]; 
        var washFrequency = result.wfreq;
        

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFrequency,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [null, 9] } },
                color: "blue"
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        
        Plotly.newPlot('gauge', data, layout);
    });
}

//Create a function to update charts when dropdown selection is made

function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var sampleId = dropdownMenu.property("value");

    createDataCharts(sampleId);
    createInfoBox(sampleId);
    buildGauge(sampleId);
}
