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
      bottom: '20%',
    },
    data: [[
      'A项', .4, 'green'
    ], [
      'B项', .2, 'yellow', 0, '-60%'
    ], [
      'C项', .3, 'red', '50%', '-120%'
    ]]
  })
  .addPage('graph')
  .addComponent('title', {
    text: '图形展示'
  })
  .loader();