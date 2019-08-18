import './css/index.css';
import Container from './components/container';

const container = new Container();

container.addPage('home')
  .addComponent('title', {
    text: '测试标题'
  })
  .addPage('show')
  .addComponent('point', {
    type: 'point',
    width: 300,
    height: 300,
    center: true,
    css: {
      bottom: '20%'
    },
    animateIn: {
      opacity: 1,
      bottom: '40%'
    },
    animateOut: {
      opacity: 0,
      bottom: '20%'
    },
    data: [
      ['A项', .4, 'green'], 
      ['B项', .2, 'yellow', '60%', '-60%'],
      ['C项', .25, 'blue', '-50%', '-40%'],
      ['D项', .3, 'red', '60%', '100%']
    ]
  })
  .addPage('graph')
  .addComponent('bar', {
    type: 'bar',
    width: 530,
    height: 600,
    data: [
      ['A项', .4, '#ff7676'], 
      ['B项', .2],
      ['C项', .25 ],
      ['D项', .3 ],
      ['E项', .12 ],
    ],
    css: {
      top: 100,
      opacity: 0
    },
    animateIn: {
      opacity: 1,
      top: 200,
    },
    animateOut: {
      opacity: 0,
      top: 100,
    },
    center: true
  })
  .addPage('line')
  .addComponent('polyline', {
    type: 'polyline',
    width: 530,
    height: 400,
    center: true,
    css: {
      bottom: '40%',
      opacity: 0
    },
    data: [
      ['A项', .4, '#ff7676'], 
      ['B项', .16],
      ['C项', .22 ],
      ['D项', .43 ],
      ['E项', .24 ],
    ],
    animateIn: {
      opacity: 1,
      top: 200,
    },
    animateOut: {
      opacity: 0,
      top: 100,
    },
  }).addPage('radar')
  .addComponent('radar', {
    type: 'radar',
    width: 400,
    height: 400,
    center: true,
    data: [
      ['A项', .9, '#ff7676'], 
      ['B项', .8],
      ['C项', .7 ],
      ['D项', .6 ],
      ['E项', .5 ],
    ],
    css: {
      top: 100,
      opacity: 0
    },
    animateIn: {
      opacity: 1,
      top: 200,
    },
    animateOut: {
      opacity: 0,
      top: 100,
    }
  }).addPage('pie')
  .addComponent('pie', {
    type: 'pie',
    width: 400,
    height: 400,
    center: true,
    data: [
      ['A项', .4, '#ff7676'], 
      ['B项', .2],
      ['C项', .05 ],
      ['D项', .2 ],
      ['E项', .15 ],
    ],
    css: {
      top: 200
    }
  })
  .loader();