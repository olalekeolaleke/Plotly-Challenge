// Select the dropdown element

function init() {
    
    var selector = d3.select("#selDataset");
    
    // Populating the dropdown with subject ID's from the list of sample Names
      d3.json("./samples.json").then((data) => {
        var subjectIds = data.names;

        console.log(data);

        subjectIds.forEach((id) => {
          selector
          .append("option")
          .text(id)
          .property("value", id);
        });
      
      // Using the first subject ID from the names to build initial plots
      const newSample = subjectIds[0];
      updateCharts(newSample);
      updateMetadata(newSample);
    });
  }
  
  
  
  function updateMetadata(sample) {
    d3.json("./samples.json").then((data) => {
        var metadata = data.metadata;

        console.log(data);

        var resultArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");
            PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })
    
  // Setting up Data and Plotting the Gauge Chart
    var data = [
      {
        domain: {'x': [0, 1], 'y': [0, 1]},
        marker: {size: 28, color:'royalblue'},
        value: result.wfreq,
        delta: {reference: 1, increasing: {color: "RebeccaPurple"}},
        title: ("Belly Button Washing Frequency <br> Scrubs per Week"),
        font:{
            family: 'Raleway, sans-serif'
          },
        type: "indicator",
        mode: "gauge+number+delta"
      }
    ];
  
    var layout = {
      width: 400,
       height: 350,
       margin: { t: 25, r: 25, l: 25, b: 25 },
       line: {color: "red", width: '4'},
       bgcolor: "white",
       thickness: 0.75,
       borderwidth: 2,
     };
  
    
    Plotly.newPlot("gauge", data, layout);
    });
  }
  
  
  function updateCharts(sample) {    
    d3.json("./samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = resultArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;   
    
    // Plotting the Bubble Chart
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        size: sample_values,
        color: otu_ids,
        }
    };
    var data = [trace1];
    var layout = {
        height: 500,
        width: 1000,
        hovermode: 'closest',
        label: "OTU ID",
        margin: {t:30},
    };
    Plotly.newPlot('bubble', data, layout); 

    // Plotting Bar Chart
    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        mode:"markers",
        type: "bar",
        orientation: "h",
        marker:{
        color: otu_ids,
        colorscale: "#FF4F00"
        }
    };
    var data = [trace1];
    var layout = {
        title: "Top 10 Belly Button Bacteria",
        margin: { t: 55, r: 25, l: 65, b: 25 },
    };
    Plotly.newPlot("bar", data, layout);  
    });
  }
  
  // Call function to update the chart
  function optionChanged(newData) {

    // Update the restyled plot's values
    updateCharts(newData);
    updateMetadata(newData);
  }
  
  // Initializing the dashboard
  init();