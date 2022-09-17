function BuildCharts(selected){

    console.log(selected)

        d3.json('samples.json').then((data)=>{

         console.log(data);

            var results = data.samples.filter(obj => obj.id == selected)

                console.log(results)

            var otu_ids = results[0].otu_ids;
                var otu_labels = results[0].otu_labels;
                    var sample_values = results[0].sample_values;

                        console.log(otu_ids);



        })

}

        d3.json('samples.json').then((data)=>{

            // console.log(data.names);

                var dropdown = d3.select('#selDataset')

                    data.names.forEach((id) => {
                        console.log(id);

                        dropdown.append('option').text(id).property('value', id);
            });
        })

        function optionChanged(selected){

            BuildCharts(selected)

        }
