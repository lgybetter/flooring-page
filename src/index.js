import './css/index.css';
import Container from './components/container';

const container = new Container();

container.addPage('home')
  .addComponent('title', {
    text: '测试标题'
  })
  .addPage('show')
  .addComponent('title', {
    text: '展示'
  })
  .addPage('graph')
  .addComponent('title', {
    text: '图形展示'
  })
  .loader();