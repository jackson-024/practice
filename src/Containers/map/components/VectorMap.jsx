import React, { useEffect, useState } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { Container } from 'react-bootstrap';
import geoData from '../components/kenyan-counties.geojson'
// import data from './data.json'
import axios from 'axios';
import { baseURL, CONFIG } from '../../../config/export';

const heatRule = {
  property: 'fill',
  min: am4core.color('#ffffff')
}

export const VectorMap = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${baseURL}`, CONFIG).then((response) => {
      console.log(response.data.message)
      let new_data = [response.data.message]
      setData(response.data.message)
    })

  }, [])

  console.log("new",data);
    // create map
    let map = am4core.create('chartdiv', am4maps.MapChart)

    // map data source
    // map.geodataSource.url =  "http://data.humdata.org/dataset/e66dbc70-17fe-4230-b9d6-855d192fc05c/resource/51939d78-35aa-4591-9831-11e61e555130/download/kenya.geojson"
    map.geodataSource.url =  geoData
    // map.geodata = am4geodata_worldLow;

    map.projection = new am4maps.projections.Miller()

    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    // county names
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{COUNTY_NAM} : {Male}: {city}";

    // style on hover
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    // heatRule.max = am4core.color('#7637u3');
    // heatRule.target = polygonSeries.mapPolygons.template;

    // polygonSeries.heatRules.push(heatRule);
    console.log('data', data)
    const data2 = data.map((el, i) => ({...el, city: 'city' + i}))
    console.log("data 2", data2)
    polygonSeries.data = data2

    polygonSeries.useGeodata = true;




  return (
      <Container>
        <div>VectorMap</div>
        <div id="chartdiv" style={{ width: '100%', height: '100vh' }} />
      
      </Container>
  )
  }
