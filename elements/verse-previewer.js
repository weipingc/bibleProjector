'use strict';

(function() {
  Polymer({
    is: 'verse-previewer',
    properties: {
      previewText: {
          type: Number,
          value: ''
      },
      chapInfo4DispList: {
          type: Array,
          value: []
      }
    },

    displayVerse: function( verseEvent ) {
      this.chapInfo4DispList = [];
      this.volume   = verseEvent.volume;
      this.verseSub = verseEvent.verseSub;
      this.pageSize = verseEvent.pageSize;
      var cumNumOfChpNextVol = CumNumOfChpPerVol[this.volume];
      var indOfFirstVerseOfThisVol = CumNumOfVrsPerChp[ CumNumOfChpPerVol[this.volume-1] ];
      var indOfLastVerseOfThisVol  = CumNumOfVrsPerChp[cumNumOfChpNextVol] - 1;

      var currChapter = '';
      var chapInfo4Disp;
      var firstVerse = true;
      for( var cnt=0; cnt<this.pageSize && this.verseSub+cnt<=indOfLastVerseOfThisVol; cnt++ ) {
        var nextVerse = getBible()[ this.verseSub + cnt ];
        var colonInd = nextVerse.indexOf( ':' );
        var spaceInd = nextVerse.indexOf( ' ' );
        var nextChapter = nextVerse.substring( 0, colonInd ).match( /\d+$/ )[0];
        var verseNum  = nextVerse.substring( colonInd+1, spaceInd );
        var verseText = nextVerse.substring( spaceInd+1 );
        if( currChapter != nextChapter ) {
          currChapter = nextChapter;
          chapInfo4Disp = new ChapInfo4Disp( getVolumeChapterText(this.volume, currChapter, defaultVer) );
          this.push("chapInfo4DispList", chapInfo4Disp );
        }
        chapInfo4Disp.verseInfo4DispList.push( new VerseInfo4Disp(this.volume, this.verseSub+cnt,
          verseNum, verseText, firstVerse) );
        if( firstVerse ) firstVerse = false;
      }
    },

    verseClicked: function( evt ) {
      evt.preventDefault();
      var verseEvent = new VerseEvent( this.volume, parseInt(evt.target.id) );
      this.fire( 'preview-verse', {verseEvent: verseEvent} );

    }
  });
})();

function ChapInfo4Disp( volumeChapterText ) {
  this.volumeChapterText = volumeChapterText;
  this.verseInfo4DispList = [];
}

function VerseInfo4Disp( volume, verseSub, verseNum, verseText, isFirst ) {
  this.verseSub = verseSub;
  this.verseNum = verseNum;
  this.verseText = verseText;
  this.isFirst = isFirst;
}
