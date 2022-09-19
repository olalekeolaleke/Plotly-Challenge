function buildMetadata(sample){

    // console.log(selected)

        d3.json('samples.json').then((data)=>{
            var metadata = data.metadata;
            console.log(data);

            var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample)
            var result = resultsArray[0]
            console.log(result)
            let PANEL = d3.select("#sample-metadata");

            PANEL.html("");

            for (key in result){
                PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
                };

    
        });
    }

function buildCharts(sample){
    d3.json('samples.json').then((data)=>{
        var metadata = data.metadata;
        console.log(data);

        var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample)
        var results = resultsArray[0]
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var sample_values = results.sample_values;

         //barchart
         let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        let x_values=sample_values.slice(0,10);
        let text_labels=otu_labels.slice(0,10);

        let bar_chart=[{
            y:yticks,
            x:x_values.reverse(),
            text:text_labels.reverse(),
            type:"bar",
            orientation:"h",
            mode:"markers",
            marker:{
                
                color:x_values,
                colorscale:"#FF4F00"
            }
        }];

        let layout={
            margin: { t: 55, r: 25, l: 65, b: 25 },
            title:"Top 10 Belly Button Bacteria"
        };
        // var config = {responsive: true}

        Plotly.newPlot("bar",bar_chart,layout);

    });
}

function init(){
    let selector = d3.select("#selDataset");
    d3.json('samples.json').then((data)=>{
        let sampleNames = data.names;
        for (let i = 0; i < sampleNames.length; i++){
            selector
              .append("option")
              .text(sampleNames[i])
              .property("value", sampleNames[i]);
          };
      
          // Use the first sample from the list to build the initial plots
          let firstSample = sampleNames[0];
          buildCharts(firstSample);
          buildMetadata(firstSample);
    });
}

function optionChanged(firstSample){

    buildCharts(firstSample);
    buildMetadata(firstSample);
};

init();