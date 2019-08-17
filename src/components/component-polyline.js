import ComponentBase from './component-base';



const ComponentPolyline = function (name, config) {
  let component = new ComponentBase(name, config);

  let width = config.width;
  let height = config.height;

  let data = config.data || [];

  // 网格背景层
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = ctx.width = width;
  canvas.height = ctx.height = height;

  let step = config.data.length + 1;
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#AAAAAA';

  let textWidth = width / step >> 0;

  // 绘制网格线
  for (let i = 0; i < step + 1; i++) {
    let x = (width / step) * i;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    if (config.data[i]) {
      // 绘制文本
      let text = $('<div class="text"></div>');
      text.text(config.data[i][0]);
      text.css('width', textWidth / 2)
        .css('left', (x / 2 - textWidth / 4) + textWidth / 2);

      component.append(text);
    }
  }

  for (let i = 0; i < step + 1; i++) {
    let y = (height / step) * i;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();

  component.append(canvas);

  // 数据折线层
  let lineCanvas = document.createElement('canvas');
  let lineCtx = lineCanvas.getContext('2d');
  lineCanvas.width = lineCtx.width = width;
  lineCanvas.height = lineCtx.height = height;
  component.append(lineCanvas);

  const drawLine = function (per) {
    // 清空画布
    lineCtx.clearRect(0, 0, width, height);

    // 绘制折线圆点
    lineCtx.beginPath();
    lineCtx.lineWidth = 3;
    lineCtx.strokeStyle = '#ff8878';
  
    let x  = 0;
    let y = 0;
    let rowWidth = width / (config.data.length + 1);
    data.forEach((item, index) => {
  
      x = rowWidth * index + rowWidth;
      y = height - (item[1] * height * per );
      lineCtx.moveTo(x, y);
      lineCtx.arc(x, y, 5, 0, 2*Math.PI);
      
    })
  
    lineCtx.moveTo(rowWidth, height - (config.data[0][1] * height * per ));
  
    // 绘制折线
    data.forEach((item, index) => {
  
      x = rowWidth * index + rowWidth;
      y =  height - (item[1] * height * per );
      lineCtx.lineTo(x, y);
  
    });
  
    // 绘制折线数据
    data.forEach((item, index) => {
      x = rowWidth * index + rowWidth;
      y =  height - (item[1] * height * per );
      lineCtx.fillStyle = item[2] ? item[2] : '#595959';
      lineCtx.fillText((item[1] * 100 >> 0) + '%', x - 10 , y - 10)
    })
    lineCtx.stroke();
    
    // 绘制阴影
    lineCtx.lineWidth = 1;
    lineCtx.strokeStyle = 'rgba(255, 136, 120, 0)'; 
  
    lineCtx.lineTo(x, height);
    lineCtx.lineTo(rowWidth, height);
    lineCtx.fillStyle = 'rgba(255, 136, 120, .2)';
    lineCtx.fill();  
    
    lineCtx.stroke();

  }


  let loadTimer = 0;
  let leaveTimer = 0;
  component.on('onLoad', function () {
    // 折线图动画
    setTimeout(() => {
      let s = 0;
      clearInterval(leaveTimer);
      loadTimer = setInterval(function(){
        if (s >= 1) {
          clearInterval(loadTimer);
        }
        s +=.01;
        drawLine(s);
      }, 10);
    }, 500);
  })

  component.on('onLeave', function () {
    // 折线图动画
    let s = 1;
    clearInterval(loadTimer);
    setTimeout(() => {
      leaveTimer = setInterval(function(){
        if (s <= 0) {
          clearInterval(leaveTimer);
        }
        s -=.01;
        drawLine(s);
      }, 10);
    }, 500);
  })

  
  return component;
}

export default ComponentPolyline;
