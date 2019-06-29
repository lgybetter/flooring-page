import { getUUid } from '../utils';

const ComponentBase = function (name, config = {}) {
  let id = `container-component-${getUUid()}`;
  let cls = `container-component-${config.type}`; 
  let component = $(`<div class="container-component ${cls} container-component-${name}" id="${id}"></div>`)

  config.text && component.text(config.text);

  return component;
}

export default ComponentBase;
