import ComponentBase from './component-base';

const ComponentBar = function (name, config) {
  let component = new ComponentBase(name, config);
  let data = config.data;

  data.forEach((item, index) => {
    let line = $(`<div class="line"></div>`);
    let name = $(`<div class="name"></div>`);
    let rate = $(`<div class="rate"></div>`);
    let peer = $(`<div class="peer"></div>`);

    let width = `${item[1] * 100}%`;

    rate.css('width', width);

    let bgStyle = '';
    if (item[2]) {
      bgStyle = `style="background-color: ${item[2]}"`;
    }
    rate.html(`<div class="bg" ${bgStyle}></div>`);
    

    peer.text(width);
    name.text(item[0]);

    line.append(name)
      .append(rate)
      .append(peer);
    component.append(line);

  })

  return component;
}

export default ComponentBar;
