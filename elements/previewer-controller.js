(function() {
  Polymer('previewer-controller', {
    pageSize: 6,
    previewSource: '',
    nVolume: 1,
    startVerseSub: 0,
    indOfFirstVerseOfThisVol: 0,
    indOfLastVerseOfThisVol: 0,
    verseList: [],

    _updateVerses: function() {
      this.previewTitle = getTitleFromVerseSub( this.nVolume, this.startVerseSub );
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fireDisplayEvent( verseEvent ) ;
    },

    previewVerse: function( verseEvent ) {
      this.nVolume = verseEvent.volume;
      this.startVerseSub = verseEvent.verseSub;
      this.previewSource = verseEvent.source;
      this._previewVerse( verseEvent );
    },

    _previewVerse: function( verseEvent ) {
      this.previewTitle = getTitleFromVerseSub( this.nVolume, this.startVerseSub );

      var cumNumOfChpNextVol = CumNumOfChpPerVol[this.nVolume];
      this.indOfFirstVerseOfThisVol = CumNumOfVrsPerChp[ CumNumOfChpPerVol[this.nVolume-1] ];
      this.indOfLastVerseOfThisVol  = CumNumOfVrsPerChp[cumNumOfChpNextVol] - 1;
      this.fireDisplayEvent( verseEvent ) ;
    },

    defaultVerSelected: function() {
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub, this.previewSource );
      this._previewVerse( verseEvent );;
    },

    fireDisplayEvent: function( verseEvent ) {
      verseEvent.pageSize = this.pageSize;
      this.fire( 'display-verse', {verseEvent: verseEvent} );
    },

    pageSizeSelectionChanged: function( evt ) {
      this.pageSize =   parseInt( evt.target.value );
      this._updateVerses();
    },

    viewPreviousPage: function() {
      if( this.startVerseSub <= this.indOfFirstVerseOfThisVol  ) {
        return;
      } else if( this.startVerseSub - this.pageSize <= this.indOfFirstVerseOfThisVol){
        this.startVerseSub = this.indOfFirstVerseOfThisVol;
      } else {
        this.startVerseSub -= this.pageSize;
      }
      this.previewSource = "Paging";
      this._updateVerses();
    },

    viewNextPage: function() {
      if( this.nVolume>66 ) {
        return;
      }
      if( this.startVerseSub + this.pageSize > this.indOfLastVerseOfThisVol  ) {
        return;
      }
      this.startVerseSub += this.pageSize;
      this.previewSource = "Paging";
      this._updateVerses();
    },

    getTitleFromVerseText: function( verseText ) {
      return this.nVolume + '.' + verseText.substring(0, verseText.indexOf(' ') );
    },

    bookmarkVerse: function() {
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fire( 'bookmark-verse', {verseEvent: verseEvent} );
    },

    projectVerse: function() {
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub, 'Preview' );
      this.fire( 'project-verse', {verseEvent: verseEvent} );
    }
  });
})();
