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

    ready: function() {
        console.log( this.tagName );
    },

    ironLocalStorageLoaded: function() {
      var savedData = this.$.storage.value;
      if( savedData ) {
          this.electedVerseSubPlusOne = savedData.selectedVerseSubPlusOne;
          this.bookmarks = savedData.bookmarks;
          this.notifyPath( 'selectedVerseSubPlusOne', this.selectedVerseSubPlusOne );
          this.notifyPath( 'bookmarks', this.savedData.bookmarks );
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
      this.$.storage.value = {
          selectedVerseSubPlusOne: this.selectedVerseSubPlusOne,
          bookmarks: this.bookmarks
      };
      this.$.storage.save();
    },

    getSelectedBookmark: function() {
      for( var ind=0; ind<this.bookmarks.length; ind++ ) {
        if( this.bookmarks[ind].selectedVerseSubPlusOne == this.selectedVerseSubPlusOne) {
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
      var bmExists;
      var insertInd         = this.bookmarks.length==0 ? 0 : -1;
      for( var ind=0; ind < this.bookmarks.length; ind++ ) {
        var bm = this.bookmarks[ind];
        if( bm.verseSub == verseEvent.verseSub ) {
            if( bm.selectedVerseSubPlusOne == this.selectedVerseSubPlusOne ) {
                // The verse is already bookmarked and selected, do nothing
                return;
            }
            bmExists = bm;
        } else if( !bmExists && insertInd==-1 && bm.verseSub > verseEvent.verseSub ){
            insertInd = ind;
        }
        
        if( !bmExists && insertInd == -1 && ind == this.bookmarks.length-1 ) {
          // Insert at the end
          insertInd = this.bookmarks.length;
        }
      }
      
      // Need to find better way to trigger DOM update, wanting ReactJS way.
      
      // Make a copy first, add new item if needed, then wipe out the list
      var newBookmarks = this.bookmarks.slice( 0 );
      var selectedBm = bmExists;
      if( insertInd >= 0 ) {
        selectedBm = new Bookmark( verseEvent.volume, verseEvent.verseSub, true );
        newBookmarks.splice( insertInd, 0, selectedBm );
      }
      this.splice( "bookmarks", 0, this.bookmarks.length );
      
      // Get around paper-radio-group could not unselect the first item, step 1
/*
      var firstBm;
      if( !bmExists && firstItemSelected ) {
        firstBm = newBookmarks.shift();
      }
*/
      
      var bookmarkMgrThis = this;
      newBookmarks.forEach( function(bookmark) {
        bookmarkMgrThis.push( "bookmarks", bookmark );
      } );
      
      // Get around paper-radio-group could not unselect the first item, step 2
/*
      if( !bmExists && firstItemSelected ) {
        this.splice( "bookmarks", 0, 0, firstBm );
      }
*/
      this.selectedVerseSubPlusOne = selectedBm.selectedVerseSubPlusOne;
    },

    defaultVerSelected: function() {
      var bookmarks = this.bookmarks;
      bookmarks.forEach( function(bookmark) {
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
  this.selectedVerseSubPlusOne = verseSub + 1;
}
