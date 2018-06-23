import $ from 'jquery';
import _ from 'lodash';
import React from 'react'
import app from './app.js';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  element.addEventListener('click', (e) => {
    app();
  }, false)

  console.log(jquery)

  element.appendChild(myIcon);
  return element;
}

console.log(React)
document.body.appendChild(component());
