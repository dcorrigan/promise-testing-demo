import jsdom from 'jsdom';
import chai from 'chai';

const dom = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>');

global.document = dom;
global.window = dom.defaultView;

Object.keys(global.window).forEach((key) => {
  if (!(key in global)) {
    global[key] = global.window[key];
  }
});
