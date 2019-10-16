import React from 'react';

import * as d3Scale from 'd3-scale'

import {
  LineSeries, Tooltip,
  ChartProvider, XAxis, YAxis,
} from 'rough-charts'

import { format } from 'date-fns';

const colors = [
  '#EACA5C',
  '#C4513D',
  '#4F5E76'
];

const mapValues = (data) => {
  data = data.reverse();
  return data.map(datum => {
    const { field1, created_at, entry_id } = datum;
    return { 
      reading: entry_id,
      temp: field1,
      time: format(new Date(created_at), 'hh:mm:ss'),
    }
  });
}

const getBounds = (data) => {
  const temps = data.map(datum => Number(datum.temp));
  return [ Math.min(...temps), Math.max(...temps) ];
}

const getBuffer = (lowVal, highVal) => {
  const range = (3 * (highVal - lowVal));
  return [ lowVal - range, highVal + range ];
}

export default function Chart ({data}) {

  const mappedValues = mapValues(data);
  const [ lower, upper ] = getBounds(mappedValues);
  const [ floor, ciel ] = getBuffer(lower, upper);

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
          stroke: colors[0],
          strokeWidth: 2,
        }}
      />
      {/* <LineSeries
        dataKey="reading"
        options={{
          stroke: colors[2],
          strokeWidth: 2,
        }}
      /> */}
      <Tooltip />
    </ChartProvider>
  );
}