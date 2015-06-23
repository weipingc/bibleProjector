'use strict';

(function() {
  Polymer({
    is: 'bookmark-mgr',
    properties: {
      bookmarks: {
        type: Array,
        value: []
      }
    },

    ironLocalStorageLoaded: function() {
      var savedData = this.$.storage.value;
      if( savedData )
        this.bookmarks = savedData;
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
            if( this.bookmarks.length > 1 ) {
              var indNewSelected = -1;
              if( ind< this.bookmarks.length-1 )
                indNewSelected = ind + 1;
              else if( ind > 0 )
                indNewSelected = ind - 1;
              this.bookmarks[indNewSelected].selected = true;
            }
            this.splice( "bookmarks", ind, 1 );
            return;
          }
        }
      }
    },
    
    saveBookmarks: function() {
      this.$.storage.value = this.bookmarks;
      this.$.storage.save();
    },

    getSelectedBookmark: function() {
      for( var ind=0; ind<this.bookmarks.length; ind++ ) {
        if( this.bookmarks[ind].selected ) {
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
      var bookmarkExists = false;
      for( var ind=0; ind< this.bookmarks.length; ind++ ) {
        if( this.bookmarks[ind].verseSub == verseEvent.verseSub ) {
          bookmarkExists = true;
          this.bookmarks[ind].selected = true;
        } else {
          this.bookmarks[ind].selected = false;
        }
      }
      if( bookmarkExists ) {
        return;
      }
      this.bookmarks.push( new Bookmark( verseEvent.volume, verseEvent.verseSub, true) );
      this.bookmarks.sort(
        function( bm1, bm2) {
          return bm1.verseSub - bm2.verseSub;
        }
      );
      // Trigger renderring
      var bookmarks = this.bookmarks;
      this.bookmarks = [];
      for( var ind=0; ind< bookmarks.length; ind++ ) {
        this.push( "bookmarks", bookmarks[ind] );
      }
    },

    defaultVerSelected: function() {
      this.bookmarks.forEach( function(bookmark) {
        bookmark.label = getTitleFromVerseSub( bookmark.volume, bookmark.verseSub );
      } );
    }
  });
})();

function Bookmark( volume, verseSub, selected ) {
  this.volume = volume;
  this.verseSub = verseSub;
  this.selected = selected;
  this.label = getTitleFromVerseSub( volume, verseSub );
}
