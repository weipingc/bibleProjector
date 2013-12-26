
// Bible Projector does work as Chrome app yet. 12/18/2013

background.jschrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'bounds': {
      'width': 400,
      'height': 500
    }
  });
});
