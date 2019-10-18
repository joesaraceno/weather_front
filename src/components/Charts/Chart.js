import * as d3Scale from 'd3-scale'
import { format } from 'date-fns';
import _ from 'lodash';
import React from 'react';
import { LineSeries, Tooltip, ChartProvider, XAxis, YAxis } from 'rough-charts';

import { determineColor } from '../../utils/TemperatureUtils';

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
    const color = determineColor(temp);
    if (_.isUndefined(colorMap[color])) {
      colorMap[color] = 0;
    } else {
      colorMap[color] += 1;
    }
  });
  return _.maxBy(_.keys(colorMap), function (color) { return colorMap[color]; });

}

const getBounds = (data) => {
  const temps = data.map(datum => Number(datum.temp));
  return [ Math.min(...temps), Math.max(...temps) ];
}

const getBuffer = (lowVal, highVal) => {
  const range = (2 * (highVal - lowVal));
  const lowBound = Math.round(lowVal - range);
  const highBound = Math.round(highVal + range);
  return [ lowBound, highBound ];
}

export default function Chart ({data}) {

  const mappedValues = mapValues(data);
  const [ lower, upper ] = getBounds(mappedValues);
  const [ floor, ciel ] = getBuffer(lower, upper);
  const color = determineMostOccuringColor(mappedValues);

  const yScale = d3Scale
    .scaleLinear()
    .domain([floor, ciel])

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