What it does:
  Bible Projector is a browser based tool for projecting Bible verses.

How to run:
  Start a browser, open the index.html file.
  After selecting bible volume/chapter/verse, you can click one of the "Project" buttons
  to open another browser window, the selected verses will be displayed in that window.
  Drag the window to the secondary display of your computer which should be connected
  to a projector.
  Clicking the Help link (it is at right to the Preview control) will the Help window, you
  read detailed instructions there.

System requirements:

  Google Chrome
    Version 31 or newer.
    Note: Due to Chrome's security measure, the following option needs to be added when launch Chrome:
      --allow-file-access-from-files  (This no longer work after version 36, trying Chrome app)
    Otherwise, you will get "Cross origin requests are only supported for HTTP" error.
	
	Launch as Chrome app from command line:
	"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --load-and-launch-app=D:\Labs\bibleProjector\bibleProjector
	Could not make this to work, 
		Polymer.IronControlState = {
		_disabledChanged: function(disabled, old) {
		  this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
		  this.style.pointerEvents = disabled ? 'none' : '';
		  if (disabled) {
			this._oldTabIndex = this.tabIndex;
			this.focused = false; // Uncaught TypeError: Cannot set property focused of #<paper-checkbox> which has only a getter
			this.tabIndex = -1;
		  } else if (this._oldTabIndex !== undefined) {
			this.tabIndex = this._oldTabIndex;
		  }
		},

  Mozilla FireFox
    Version 26 or newer.

Technical Notes:
  Polymer(http://polymer-project.org/) is used.

Credentials
  Weiping Chen(weiping.chen@gmail.com)
  This program is based on the works of Mr. Weiheng Xi, Mr. Spring (chunnan.hung@gmail.com)
  and Paul Chang(paul.cmchang@gmail.com)
