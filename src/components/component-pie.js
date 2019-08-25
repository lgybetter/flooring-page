import ComponentBase from './component-base';

const ComponentPie = function (name, config) {
  let component = new ComponentBase(name, config);
  let width = config.width;
  let height = config.height;

  let data = config.data || [];

  // 网格背景层
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = ctx.width = width;
  canvas.height = ctx.height = height;
  $(canvas).css('zIndex', 1);
  component.append(canvas);

  let r = width / 2;

  // 饼图底层
  ctx.beginPath();
  ctx.fillStyle = '#eee';
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.arc(r, r, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // 绘制数据层
  let pieCanvas = document.createElement('canvas');
  let pieCtx = pieCanvas.getContext('2d');
  pieCanvas.width = pieCtx.width = width;
  pieCanvas.height = pieCtx.height = height;
  $(pieCanvas).css('zIndex', 2);
  component.append(pieCanvas);

  let colors = ['red', 'green', 'blue', 'darkred', 'orange'];
  let sAngel = 1.5 * Math.PI; // 设置开始角度在12点位置
  let eAngel = 0; // 结束角度
  let aAngel = Math.PI * 2; // 100%的园结束的角度 2pi = 360 

  let step = config.data.length;

  
  data.forEach((item, index) => {
    
    let color = item[2] || (item[2] = colors.pop())

    eAngel = sAngel + aAngel * item[1];

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = .1;
    ctx.moveTo(r,r);
    ctx.arc(r, r, r, sAngel, eAngel);
    ctx.fill();
    ctx.stroke();


    // 加入文本和百分比数据
    let text = $('<div class="text"></div>')
    text.text(item[0]);
    let per = $('<div class="per"></div>')
    per.text(item[1] * 100 + '%');

    text.append(per);
    let x = r + Math.sin(.5 * Math.PI - sAngel) * r;
    let y = r + Math.cos(.5 * Math.PI - sAngel) * r;

    // text.css('left', x / 2);
    // text.css('top', y / 2);

    if (x > width / 2) {
      text.css('left', x / 2);
    } else {
      text.css('right', (width - x) / 2);
    }

    if (y > height / 2) {
      text.css('top', y / 2);
    } else {
      text.css('bottom', (height - y) / 2);
    }

    if (item[2]) {
      text.css('color', item[2]);
    }
    text.css('opacity', 0);
    component.append(text);

    sAngel = eAngel;

  })

  // 加入一个蒙版层
  let modelCanvas = document.createElement('canvas');
  let modelCtx = modelCanvas.getContext('2d');
  modelCanvas.width = modelCtx.width = width;
  modelCanvas.height = modelCtx.height = height;
  $(modelCanvas).css('zIndex', 3);
  component.append(modelCanvas);

  modelCtx.fillStyle = '#eee';
  modelCtx.strokeStyle = '#eee';
  modelCtx.lineWidth = 1;

  const drawPie = function (per) {
    if (per < 0) {
      per = 0;
    } 
    if (per >= 1) {
      per = 1;
    }
    modelCtx.clearRect(0, 0, width, height);
    modelCtx.beginPath();
    modelCtx.moveTo(r, r);
    if (per <= 0) {
      modelCtx.arc(r, r, r, 0, 2 * Math.PI);
    } else {
      modelCtx.arc(r, r, r, sAngel, sAngel + 2 * Math.PI * per, true);
    }
    modelCtx.fill();
    modelCtx.stroke();

    if (per >= 1) {
      component.find('.text').css('transtition', 'all 0s');
      ComponentPie.reSort(component.find('.text'));
      component.find('.text').css('transtition', 'all 1s');
      component.find('.text').css('opacity', 1);
    }
    if (per <= 0) {
      component.find('.text').css('opacity', 0);
    }
  }

  drawPie(0);

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
        drawPie(s);
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
        drawPie(s);
      }, 10);
    }, 500);
  });

  return component;
}

// 重拍项目文本元素
ComponentPie.reSort = function (list) {
  // 1. 检测相交
  const compare = function (domA, domB) {
    // 元素的位置，不用 left，因为有时候 left 为 auto
    let offsetA = $(domA).offset();
    let offsetB = $(domB).offset();

    // domA 的投影
    let shadowAX = [offsetA.left,  $(domA).width() + offsetA.left];
    let shadowAY = [offsetA.top,  $(domA).height() + offsetA.top];

    // domB 的投影
    let shadowBX = [offsetB.left,  $(domB).width() + offsetB.left];
    let shadowBY = [offsetB.top,  $(domB).height() + offsetB.top];

    // 检测 x
    let inspectX = 
      (shadowAX[0] > shadowBX[0] && shadowAX[0] < shadowBX[1]) ||
      (shadowAX[1] > shadowBX[0] && shadowAX[1] < shadowBX[1])

    // 检测 y
    let inspectY = 
      (shadowAY[0] > shadowBY[0] && shadowAY[0] < shadowBY[1]) ||
      (shadowAY[1] > shadowBY[0] && shadowAY[1] < shadowBY[1])

    return inspectX && inspectY;
  }

  // 2. 错开重排
  const reset = function (domA, domB) {

    if ($(domA).css('top') !== 'auto') {

      $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height())
    }

    if ($(domA).css('buttom') !== 'auto') {

      $(domA).css('buttom', parseInt($(domA).css('top')) + $(domB).height())
    }

  }

  for (let i = 0; i < list.length; i++) {
    let compareIndex = (i + 1) % list.length;
    if (compareIndex === 0) {
      if(compare(list[i], list[compareIndex])) {
        reset(list[i], list[compareIndex]);
      }
      return;
    }
    for (let k = compareIndex; k < list.length; k++) {
      if (compare(list[i], list[k])) {
        reset(list[i], list[k]);
      }
    } 
  }
}

export default ComponentPie;
