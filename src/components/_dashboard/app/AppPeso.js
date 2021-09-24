import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Olivia',
    type: 'line',
    data: [3.4, 4.9, 6.2, 6.4, 6.9, 7.5, 8, 8.4, 8.8, 9.2, 9.5]
  },
  {
    name: 'Alvaro',
    type: 'line',
    data: [3.5, 4.9, 6.8, 7, 7.4, 7.9, 8.5, 8.9, 9.5, 9.9, 10.5]
  }
];

export default function AppPeso() {
  const chartOptions = merge(BaseOptionChart(), {
    labels: [
      '01/01/2020',
      '02/01/2020',
      '03/01/2020',
      '04/01/2020',
      '05/01/2020',
      '06/01/2020',
      '07/01/2020',
      '08/01/2020',
      '09/01/2020',
      '10/01/2020',
      '11/01/2020'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} kg`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Peso" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
