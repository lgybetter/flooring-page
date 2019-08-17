import { getUUid } from '../utils';
import ComponentBase from './component-base';
import ComponentPoint from './component-point';
import ComponentBar from './component-bar';
import ComponentPolyline from './component-polyline';
import ComponentRadar from './component-radar';

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
      type: 'base',
      ...config
    };
    let page = this.page.slice(-1)[0];
    let component;
    switch(config.type) {
      case 'base':
        component = new ComponentBase(name, config);
        break;
      case 'point':
        component = new ComponentPoint(name, config);
        break;
      case 'bar':
        component = new ComponentBar(name, config);
        break;
      case 'polyline':
        component = new ComponentPolyline(name, config);
        break;
      case 'radar':
        component = new ComponentRadar(name, config);
        break;
      default:
    }
    page.append(component);
    return this;
  }

  this.loader = function () {
    this.el.fullpage({
      onLeave: function (index, nextIndex, direction) {
        $(this).find('.component').trigger('onLeave');
      },
      afterLoad: function (anchorLink, index) {
        $(this).find('.component').trigger('onLoad');
      }
    })
    this.page[0].find('.component').trigger('onLoad');
    this.el.show();
    return this;
  }
}

export default Container;
