import { getUUid } from '../utils';
import ComponentBase from './component-base';

const ComponentPoint = function (name, config) {
  let component = new ComponentBase(name, config);

  let data = config.data;
  let base = data[0][1];

  data.forEach((item, index) => {
    let point = $(`<div class="point point-${index}"></div>`);
    let name = $(`<div class="name">${item[0]}</div>`)
    let rate = $(`<div class="percent">${item[1] * 100}%</div>`)
    name.append(rate);
    point.append(name);
    let percent = `${(item[1] / base) * 100}%`;
    point.width(percent).height(percent);
    if (item[2]) {
      point.css('background-color', item[2]);
    }
    if (item[3] != undefined && item[4] != undefined) {
      point.css('left', item[3])
        .css('top', item[4]);
    }
    component.append(point);
  });

  return component;
}

export default ComponentPoint