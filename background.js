'use strict';

// Bible Projector does work as Chrome app yet. 12/18/2013
// Could not be launched b/c inline script issue:
/*
Refused to execute inline script because it violates the following Content Security Policy directive: "default-src 'self' chrome-extension-resource:"
*/

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('build.html', {
    'outerBounds': {
      'width': 800,
      'height': 600
    }
  });
});