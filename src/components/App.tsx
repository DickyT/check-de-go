import * as React from 'react';

import Index from './Index';
import PrintIndex from './PrintIndex';


export default () => {
  let checkArgs;
  if (window.location.hash !== '') {
    checkArgs = JSON.parse(decodeURIComponent(window.location.hash.replace(/^#*/, '')));
  }
  return (checkArgs ? <PrintIndex {...checkArgs} /> : <Index />)
};
