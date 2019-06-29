import { getUUid } from '../utils';
import ComponentBase from './component-base';

const Container = function () {
  this.id = `container-${getUUid()}`;
  this.el = $(`<div class="container" id="${this.id}"></div>`).hide();
  this.page = [];
  $('body').append(this.el);

  this.addPage = function (name, text) {
    const page = $('<div class="page section">');
    name != undefined && page.addClass(`page-${name}`);
    text != undefined && page.text(text);

    this.el.append(page);
    this.page.push(page);
    return this;
  }

  this.addComponent = function (name, config = {}) {
    config = {
      ...config,
      type: 'base'
    };
    let page = this.page.slice(-1)[0];
    let component;
    switch(config.type) {
      case 'base':
        component = new ComponentBase(name, config);
        break;
      default:
    }
    page.append(component);
    return this;
  }

  this.loader = function () {
    this.el.fullpage({
      onLeave: function (index, nextIndex, direction) {
        $(this).find('.container-component').trigger('onLeave');
      },
      afterLoad: function (anchorLink, index) {
        $(this).find('.container-component').trigger('onLoad');
      }
    })
    this.page[0].find('.container-component').trigger('onLoad');
    this.el.show();
    return this;
  }
}

export default Container;
