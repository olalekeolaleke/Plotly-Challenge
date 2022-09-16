function BuildCharts(selected){

    console.log(selected)

        d3.json('samples.json').then((data)=>{

         console.log(data);

            var results = data.samples.filter(obj => selected)

                console.log(results)

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
