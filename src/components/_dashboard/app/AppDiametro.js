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
    data: [34.6, 37.0, 38.7, 40.2, 41.2, 42.2, 43, 43.8, 44.3, 44.8, 45.3, 45.6, 46.0, 48.2]
  },
  {
    name: 'Alvaro',
    type: 'line',
    data: [34.6, 37.0, 38.7, 40.2, 41.2, 42.2, 43, 43.8, 44.3, 44.8, 45.3, 45.6, 46.0, 48.2]
  }
];

export default function AppDiametro() {
  const chartOptions = merge(BaseOptionChart(), {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    xaxis: { type: 'number' },
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
      <CardHeader title="Diámetro" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
