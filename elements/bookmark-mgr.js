(function() {
  Polymer('bookmark-mgr', {
    bookmarks: [],

    ready: function() {
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
        var evt = new VerseEvent( selectedBM.volume, selectedBM.verseSub, 'Bookmark', selectedBM.label );
        this.fire( 'project-verse', {verseEvent: evt} );
      }
    },

    deleteBookmark: function( evt ) {
      var selectedBM = this.getSelectedBookmark();
      if( selectedBM != null ) {
        var verseSub = selectedBM.verseSub;
        for( var cnt=0; cnt< this.bookmarks.length; cnt++ ) {
          if( this.bookmarks[cnt].verseSub == verseSub ) {
            if( this.bookmarks.length > 1 ) {
              var indNewSelected = -1;
              if( cnt< this.bookmarks.length-1 )
                indNewSelected = cnt + 1;
              else if( cnt > 0 )
                indNewSelected = cnt - 1;
              this.bookmarks[indNewSelected].selected = true;
            }
            this.bookmarks.splice( cnt, 1 );
            return;
          }
        }
      }
    },

    getSelectedBookmark: function() {
      for( var cnt=0; cnt<this.bookmarks.length; cnt++ ) {
        if( this.bookmarks[cnt].selected ) {
          return this.bookmarks[cnt];
        }
      }
      return null;
    },

    _previewBookmark: function( bookmark ) {
      var evt = new VerseEvent( bookmark.volume, bookmark.verseSub, 'Bookmark', bookmark.label );
      this.fire( 'preview-verse', {verseEvent: evt} );
    },

    findBookmarkByVerseSub: function( bmElement ) {
      var verseSub = parseInt( bmElement.id.split( '.' )[1] );
      for( var cnt=0; cnt< this.bookmarks.length; cnt++ ) {
        if( this.bookmarks[cnt].verseSub == verseSub )
          return this.bookmarks[cnt];
      }
    },

    bookmarkVerse: function( verseEvent ) {
      var bookmarkExists = false;
      for( var cnt=0; cnt< this.bookmarks.length; cnt++ ) {
        if( this.bookmarks[cnt].verseSub == verseEvent.verseSub ) {
          bookmarkExists = true;
          this.bookmarks[cnt].selected = true;
        } else {
          this.bookmarks[cnt].selected = false;
        }
      }
      if( bookmarkExists )
        return;
      this.bookmarks.push( new Bookmark( verseEvent.volume, verseEvent.verseSub, true) );
      this.bookmarks.sort(
        function( bm1, bm2) {
          return bm1.verseSub - bm2.verseSub;
        } );
      this.$.storage.value = this.bookmarks;
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
