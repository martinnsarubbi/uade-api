import { Icon } from '@iconify/react'
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill'
import peopleFill from '@iconify/icons-eva/people-fill'
import vaccine from '@iconify/icons-eva/color-picker-fill'
import heart from '@iconify/icons-eva/heart-fill'
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />

const sidebarConfig = [
  {
    title: 'Inicio',
    path: 'inicio',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Registros pediátricos',
    path: 'registrosPediatricos',
    icon: getIcon(heart)
  },
  {
    title: 'Vacunación',
    path: 'vacunas',
    icon: getIcon(vaccine)
  },
  {
    title: 'Percentiles',
    path: 'indicadores',
    icon: getIcon(pieChart2Fill)
  }
]

export default sidebarConfig
