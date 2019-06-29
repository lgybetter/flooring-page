import { getUUid } from '../utils';

const ComponentBase = function (name, config = {}) {
  let id = `component-${getUUid()}`;
  let cls = `component-${config.type}`; 
  let component = $(`<div class="component ${cls} component-${name}" id="${id}"></div>`)

  config.text && component.text(config.text);
  config.width && component.width(config.width / 2);
  config.height && component.height(config.height / 2);
  config.css && component.css(config.css);
  config.center === true && component.css({
    marginLeft : `${config.width / 4 * -1}px`,
    left: '50%'
  }) 

  component.on('onLoad', function () {

    setTimeout(function () {
      component.addClass(`${cls}-load`).removeClass(`${cls}-leave`);
      config.animateIn && component.animate(config.animateIn);
    }, config.delay || 0);

    return false;
  })
  
  component.on('onLeave', function () {

    setTimeout(function () {
      component.addClass(`${cls}-leave`).removeClass(`${cls}-load`);
      config.animateOut && component.animate(config.animateOut);
    }, config.delay || 0);

    return false;
  })
  return component;
}

export default ComponentBase;
