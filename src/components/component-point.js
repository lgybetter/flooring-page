import { getUUid } from '../utils';
import ComponentBase from './component-base';

const ComponentPoint = function (name, config) {
  let component = new ComponentBase(name, config);
  let data = config.data.sort(function (item1, item2) {
    return item1[1] - item2[1] < 0;
  });
  let base = data[0][1];

  function animatIn () {
    data.forEach((item, index) => {
      let point = component.find(`.point-${index}`);
      if (item[3] != undefined && item[4] != undefined) {
        point.css('left', item[3])
          .css('top', item[4]);
      }
    });
  }

  function animatOut () {
    data.forEach((item, index) => {
      let percent = (item[1] / base) * 100;
      let point = component.find(`.point-${index}`);
      initPos(point, percent);
    });
  }

  function initPos (point, percent) {
    let center = `${(100 - percent) / 2}%`;
    point.css('left', center).css('top', center);
  }

  data.forEach((item, index) => {
    let point = $(`<div class="point point-${index}"></div>`);
    let name = $(`<div class="name">${item[0]}</div>`)
    let rate = $(`<div class="percent">${item[1] * 100}%</div>`)
    name.append(rate);
    point.append(name);
    let percent = (item[1] / base) * 100;
    point.width(`${percent}%`).height(`${percent}%`);
    if (item[2]) {
      point.css('background-color', item[2]).css('z-index', data.length - index);
    }
    initPos(point, percent);
    component.append(point);
  });

  component.on('onLoad', function () {
    animatIn();
  })

  component.on('onLeave', function () {
    animatOut();
  })

  return component;
}

export default ComponentPoint