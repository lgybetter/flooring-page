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

    // 输出文字
    let text = $('<div class="text"></div>')
    text.text(config.data[i][0]);
    text.css('transition', 'all .5s ' + i * .1 + 's');
    if (x > width / 2) {
      text.css('left', x / 2 + 5)
    } else {
      text.css('right', (width - x) / 2 + 5);
    }
    if (y > height / 2) {
      text.css('top', y / 2 + 5)
    } else {
      text.css('bottom', (height - y) / 2 + 5);
    }

    if (config.data[i][2]) {
      text.css('color', config.data[i][2]);
    }
    text.css('opacity', 0);
    component.append(text);
  }
  ctx.strokeStyle = '#e0e0e0';
  ctx.stroke();

  // 数据层开发

  let radarCanvas = document.createElement('canvas');
  let radarCtx = radarCanvas.getContext('2d');
  radarCanvas.width = radarCtx.width = width;
  radarCanvas.height = radarCtx.height = height;
  component.append(radarCanvas);

  radarCtx.strokeStyle = '#f00';

  const drawRadar = function (per) {
    if (per >= 1) {
      component.find('.text').css('opacity', 1);
    }
    if (per <= 1) {
      component.find('.text').css('opacity', 0);
    }
    radarCtx.clearRect(0, 0, width, height);

    data.forEach((item,index) => {
      let rad = (2 * Math.PI / 360) * (360 / step) * index
      let rate = item[1] * per;
      let x = r + Math.sin(rad) * r * rate;
      let y = r + Math.cos(rad) * r * rate;

      radarCtx.lineTo(x, y);
    })
    radarCtx.closePath();
    radarCtx.stroke();

    radarCtx.fillStyle = '#ff7676';
    data.forEach((item,index) => {
      let rad = (2 * Math.PI / 360) * (360 / step) * index
      let rate = item[1] * per;
      let x = r + Math.sin(rad) * r * rate;
      let y = r + Math.cos(rad) * r * rate;

      radarCtx.beginPath();
      radarCtx.arc(x, y, 5, 0, 2 * Math.PI);
      radarCtx.fill();
      radarCtx.closePath();
    })
  }


  let loadTimer = 0;
  let leaveTimer = 0;
  component.on('onLoad', function () {
    let s = 0;
    clearInterval(leaveTimer);
    setTimeout(() => {
      loadTimer = setInterval(function(){
        if (s >= 1) {
          clearInterval(loadTimer);
        }
        s +=.01;
        drawRadar(s);
      }, 10);
    }, 500);
  });

  component.on('onLeave', function () {
    let s = 1;
    clearInterval(loadTimer);
    setTimeout(() => {
      leaveTimer = setInterval(function(){
        if (s <= 0) {
          clearInterval(leaveTimer);
        }
        s -=.01;
        drawRadar(s);
      }, 10);
    }, 500);
  });

  return component;
}

export default ComponentRadar;
