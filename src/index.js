import './css/index.css';
import Container from './components/container';

const container = new Container();

container.addPage('home')
  .addComponent('title', {
    text: '测试标题'
  })
  .addPage('show')
  .addComponent('title', {
    type: 'point',
    width: 300,
    height: 300,
    center: true,
    css: {
      bottom: '40%'
    },
    data: [
      ['A项', .4, 'green'], 
      ['B项', .2, 'yellow', '60%', '-60%'],
      ['C项', .25, 'blue', '-50%', '-40%'],
      ['D项', .3, 'red', '60%', '100%']
    ]
  })
  .addPage('graph')
  .addComponent('title', {
    text: '图形展示'
  })
  .loader();