// Palette
import palette from 'theme/palette';

// Chart data
export const data = {
  datasets: [{
    data: [
      11, 16, 7, 3, 14, 15, 4, 1, 1, 1, 1, 10, 11, 16, 
      7, 3, 14, 15, 4, 1, 1, 1, 1, 10
    ],
    backgroundColor: '#0767DB',
    label: 'My dataset' // for legend
  }],
  labels: [
    '06 PM', '07 PM', '08 PM', '09 PM', '10 PM', '11 PM',
    '12 AM', '01 AM', '02 AM', '03 AM', '04 AM', '05 AM',
    '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM',
    '12 PM', '01 PM', '02 PM', '03 PM', '04 PM', '05 PM'
  ]
};

// Chart options
export const options = {
  legend: {
    display: false
  },
  scale: {
    // Hides the scale
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateScale: true,
    animateRotate: true
  },
  cutoutPercentage: 80,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.common.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  }
};
