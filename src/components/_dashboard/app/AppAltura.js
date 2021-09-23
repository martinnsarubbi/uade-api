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
    data: [50, 54, 60, 62, 63, 65, 67, 69, 71, 72, 73]
  },
  {
    name: 'Alvaro',
    type: 'line',
    data: [52, 56, 61, 62, 65, 66, 69, 72, 75, 76, 78]
  }
];

export default function AppAltura() {
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
            return `${y.toFixed(0)} cm`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Altura" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
