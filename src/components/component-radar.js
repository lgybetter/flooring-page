import ComponentBase from './component-base';

const ComponentRadar = function (name, config) {
  let component = new ComponentBase(name, config);

  let width = config.width;
  let height = config.height;

  let data = config.data || [];

  // 网格背景层
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = ctx.width = width;
  canvas.height = ctx.height = height;
  component.append(canvas);

  let r = width / 2;
  let step = config.data.length;


  // 计算一个圆周上的坐标 (计算多边形的定点坐标)
  // 已知圆心坐标(a, b), 半径 r; 角度 deg
  // rad = (2 * Math.PI / 360) * (360 / step) * i
  // x = a + Math.sin(rad) * r;
  // y = b + Math.cos(rad) * r;

  // 绘制网格背景
  let isBlue = false;
  for (let s = 10; s > 0; s--) {

    ctx.beginPath();
  
    for (let i = 0; i < step; i++) {
      let rad = (2 * Math.PI / 360) * (360 / step) * i
      let x = r + Math.sin(rad) * r * (s / 10);
      let y = r + Math.cos(rad) * r * (s / 10);
      // ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
    ctx.fill();
    
  }

  // 绘制伞骨
  for (let i = 0; i < step; i ++) {
    let rad = (2 * Math.PI / 360) * (360 / step) * i
    let x = r + Math.sin(rad) * r;
    let y = r + Math.cos(rad) * r;
    ctx.moveTo(r,r);
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#e0e0e0';
  ctx.stroke();

  const drawRadar = function (per) {
  }

  component.on('onLoad', function () {
  });

  component.on('onLeave', function () {
  });

  return component;
}

export default ComponentRadar;
