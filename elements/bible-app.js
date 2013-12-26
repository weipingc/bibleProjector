(function() {
  Polymer('bible-app', {
    langSelectorHidden: false,
    mainDivHidden: true,

    selectLang: function( evt ) {
      this.langSelectorHidden = true;
      this.mainDivHidden = false;

      var langSelectEvt = evt.detail;
      bibleLang = langSelectEvt.lang;
      setDefaultVer();
      this.$.verseSelector.init();
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
})();
