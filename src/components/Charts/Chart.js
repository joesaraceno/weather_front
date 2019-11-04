import * as d3Scale from 'd3-scale'
import { format } from 'date-fns';
import _ from 'lodash';
import React from 'react';

import { LineSeries, Tooltip, ChartProvider, XAxis, YAxis } from 'rough-charts';
import { determineChartColor } from '../../utils/TemperatureUtils';

const mapValues = (data) => {
  data = data.reverse();
  return data.map(datum => {
    const { field1, created_at, entry_id } = datum;
    return { 
      reading: entry_id,
      temp: field1,
      time: format(new Date(created_at), 'hh:mm'),
    }
  });
}

const determineMostOccuringColor = (data) => {
  const colorMap = {};
  data.forEach(datum => {
    const { temp } = datum;
    const color = determineChartColor(temp);
    if (_.isUndefined(colorMap[color])) {
      colorMap[color] = 0;
    } else {
      colorMap[color] += 1;
    }
  });
  return _.maxBy(_.keys(colorMap), function (color) { return colorMap[color]; });

}

const getRange = (data) => {
  const temps = data.map(datum => Number(datum.temp));
  const [ floor, ciel ] = getBuffer(Math.min(...temps), Math.max(...temps));
  return d3Scale
    .scaleLinear()
    .domain([floor, ciel]);
}

const getBuffer = (lowVal, highVal) => {
  const range = Math.round(2 * (highVal - lowVal));
  let lowBound = Math.round(lowVal - range);
  let highBound = Math.round(highVal + range);
  // case to handle very narrow range and pad more
  if (range < 1) {
    lowBound -= 0.5;
    highBound += 0.5;
  }
  return [ lowBound, highBound ];
}

export default function Chart ({ data }) {
  if (data){
    const mappedValues = mapValues(data);
    const color = determineMostOccuringColor(mappedValues);
    const yScale = getRange(mappedValues);
  
    return (
      <ChartProvider
        height={400}
        data={mappedValues}
        yScale={yScale}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <LineSeries
          dataKey="temp"
          options={{
            stroke: color,
            strokeWidth: 2,
          }}
        />
        <Tooltip />
      </ChartProvider>
    );

  }
  return null
}