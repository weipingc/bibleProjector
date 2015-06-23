'use strict';

(function() {
  Polymer({
    is: 'previewer-controller',
    properties: {
        pageSize: {
          type: Number,
          value: 6
        },
        nVolume: {
          type: Number,
          value: 1
        },
        startVerseSub: {
          type: Number,
          value: 0
        },
        indOfFirstVerseOfThisVol: {
          type: Number,
          value: 0
        },
        indOfLastVerseOfThisVol: {
          type: Number,
          value: 0
        },
        verseList: {
          type: Array,
          value: []
        }
    },

    _updateVerses: function() {
      this.previewTitle = getTitleFromVerseSub( this.nVolume, this.startVerseSub );
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fireDisplayEvent( verseEvent ) ;
    },

    previewVerse: function( verseEvent ) {
      this.nVolume = verseEvent.volume;
      this.startVerseSub = verseEvent.verseSub;
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
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub );
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
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fire( 'project-verse', {verseEvent: verseEvent} );
    }
  });
})();
