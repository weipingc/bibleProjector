'use strict';

(function() {
  Polymer({
    is: 'bookmark-mgr',
    properties: {
      selectedVerseSubPlusOne: {
        type: String,
        notify: true
      },
      bookmarks: {
        type: Array,
        value: []
      }
    },

    ironLocalStorageLoaded: function() {
      var savedData = this.$.storage.value;
      if( savedData ) {
          this.bookmarks = savedData.bookmarks;
          if( savedData.selectedVerseSubPlusOne ) {
              this.electedVerseSubPlusOne = savedData.selectedVerseSubPlusOne;
              this.$.bookmarkRadioGrp.select( this.electedVerseSubPlusOne );
          }
      }
    },

    bookmarkDblClicked: function( evt ) {
      var tarEle = evt.target;
      this._previewBookmark( tarEle );
    },

    previewBookmark: function( evt ) {
      var selectedBM = this.getSelectedBookmark();
      if( selectedBM != null ) {
        this._previewBookmark( selectedBM );
      }
    },

    projectBookmark: function( evt ) {
      var selectedBM = this.getSelectedBookmark();
      if( selectedBM != null ) {
        var evt = new VerseEvent( selectedBM.volume, selectedBM.verseSub, selectedBM.label );
        this.fire( 'project-verse', {verseEvent: evt} );
      }
    },

    deleteBookmark: function( evt ) {
      var selectedBM = this.getSelectedBookmark();
      if( selectedBM != null ) {
        var verseSub = selectedBM.verseSub;
        for( var ind=0; ind< this.bookmarks.length; ind++ ) {
          if( this.bookmarks[ind].verseSub == verseSub ) {
            var selectedVerseSubPlusOne = -1;
            if( this.bookmarks.length > 1 ) {
              if( ind< this.bookmarks.length-1 )
                selectedVerseSubPlusOne = this.bookmarks[ind + 1].verseSubPlusOne;
              else if( ind > 0 )
                selectedVerseSubPlusOne = this.bookmarks[ind - 1].verseSubPlusOne;
            }
            this.splice( "bookmarks", ind, 1 );
            this.$.bookmarkRadioGrp.select( selectedVerseSubPlusOne );
            return;
          }
        }
      }
    },
    
    saveBookmarks: function() {
      this.$.storage.value = {
          selectedVerseSubPlusOne: this.selectedVerseSubPlusOne,
          bookmarks: this.bookmarks
      };
      this.$.storage.save();
    },

    getSelectedBookmark: function() {
      for( var ind=0; ind<this.bookmarks.length; ind++ ) {
        if( this.bookmarks[ind].verseSubPlusOne == this.selectedVerseSubPlusOne) {
          return this.bookmarks[ind];
        }
      }
      return null;
    },

    _previewBookmark: function( bookmark ) {
      var evt = new VerseEvent( bookmark.volume, bookmark.verseSub, bookmark.label );
      this.fire( 'preview-verse', {verseEvent: evt} );
    },

    findBookmarkByVerseSub: function( bmElement ) {
      var verseSub = parseInt( bmElement.id.split( '.' )[1] );
      for( var ind=0; ind< this.bookmarks.length; ind++ ) {
        if( this.bookmarks[ind].verseSub == verseSub )
          return this.bookmarks[ind];
      }
    },

    bookmarkVerse: function( verseEvent ) {
        var insertInd = this.bookmarks.length==0 ? 0 : -1;
        for( var ind=0; ind < this.bookmarks.length; ind++ ) {
            var bm = this.bookmarks[ind];
            if( bm.verseSub == verseEvent.verseSub ) {
                if( this.selectedVerseSubPlusOne != bm.verseSubPlusOne ) {
                    this.$.bookmarkRadioGrp.select( bm.verseSubPlusOne );
                }
                return;
            } else if( insertInd==-1 && bm.verseSub > verseEvent.verseSub ){
                insertInd = ind;
            }
            
            if( insertInd == -1 && ind == this.bookmarks.length-1 ) {
                // Insert at the end
                insertInd = this.bookmarks.length;
            }
        }
        
        var newBookmark = new Bookmark( verseEvent.volume, verseEvent.verseSub );
        this.splice( "bookmarks", insertInd, 0, newBookmark );
        this.$.bookmarkRadioGrp.select( newBookmark.verseSubPlusOne );
    },

    defaultVerSelected: function() {
      var bookmarks = this.bookmarks;
      bookmarks.forEach( function(bookmark) {
        bookmark.label = getTitleFromVerseSub( bookmark.volume, bookmark.verseSub );
      } );
    }
  });
})();

function Bookmark( volume, verseSub ) {
  this.label = getTitleFromVerseSub( volume, verseSub );
  this.volume = volume;
  this.verseSub = verseSub;
  this.verseSubPlusOne = verseSub + 1;
}
