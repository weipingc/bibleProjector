'use strict';

Polymer({
    is: 'bible-app',
    
    properties: {
        langSelectorHidden: {
          type: Boolean,
          value: false
        },
        mainDivHidden: {
          type: Boolean,
          value: true
        }
    },

    ready: function() {
      console.log(this.localName, 'ready, langSelectorHidden=' + this.langSelectorHidden);
    },
    
    appSelectLang: function( evt ) {
      this.langSelectorHidden = true;
      this.mainDivHidden = false;

      var langSelectEvt = evt.detail;
      bibleLang = langSelectEvt.lang;
      setDefaultVer();
      var bibleAppThis = this;
      var timer = window.setInterval( function() {
          window.clearInterval( timer );
          bibleAppThis._selectLang( langSelectEvt );
        }, 1 );
    },
    
    _selectLang: function( langSelectEvt ) {
      this.$.verseSelector.updateVolumeAnchorLines();
      this.$.projectController.defaultVerSelected();
      this.$.bookmarkMgr.defaultVerSelected();
      if( langSelectEvt.started )
        this.$.previewerController.defaultVerSelected();
      else
        this.$.quickInput.updateQuickInput();
    },

    allowUserSelectLang: function() {
      this.langSelectorHidden = false;
      this.mainDivHidden = true;
    },
    
    openHelpWindow: function() {
        window.open('help.html', 'bible-projector-help');
    },

    previewVerse: function( previewVerseEvt ) {
      var verseEvent = previewVerseEvt.detail.verseEvent;
      this.$.previewerController.previewVerse( verseEvent );
    },

    displayVerse: function( displayVerseEvt ) {
      var verseEvent = displayVerseEvt.detail.verseEvent;
      this.$.versePreviewer.displayVerse( verseEvent );
    },

    bookmarkVerse: function( bookmarkVerseEvt ) {
      var verseEvent = bookmarkVerseEvt.detail.verseEvent;
      this.$.bookmarkMgr.bookmarkVerse( verseEvent );
    },

    projectVerse: function( projectVerseEvt ) {
      var verseEvent = projectVerseEvt.detail.verseEvent;
      this.$.projectController.projectVerse( verseEvent );
    },

    volumeSelected: function( volumeSelectionEvent ) {
      var verseEvent = volumeSelectionEvent.detail.verseEvent;
      this.$.quickInput.volumeSelected( verseEvent );
    }
});
