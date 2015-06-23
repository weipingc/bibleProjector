'use strict';

(function() {
  Polymer({
    is: 'quick-input',
    properties: {
        sQuickInput: {
          type: String,
          value: '43.3.16'
        },
        volChapVerseMax: {
          type: String,
          value:''
        },
        inputError: {
          type: Boolean,
          value: false
        },
        startVerseSub: {
          type: Number,
          value: -1
        }
    },

    onQuickInputKeyUp: function( evt ) {
      this._verifyInput();
      if( this.inputError )
        this.$.quickInputField.style.background = 'red';
      else if( evt.keyCode == 9 || evt.keyCode == 13 )  // Tab or Enter
        this.updateQuickInput();
    },

    _verifyInput: function() {
      this.inputError = false;
      this.$.quickInputField.style.background = 'white';
      this.$.quickInputField.focus();
      var sQuickInputNew = this.$.quickInputField.value.replace( / /g, '' );

      var wholeInd = sQuickInputNew.search( /^\d*(\.\d*){0,1}(\.\d*){0,1}$/ );
      if( wholeInd < 0 ) {
          this.inputError = true;
          return;
      }
      var parts = sQuickInputNew.split( '.' );

      if( !this.inputError && parts.length > 0 ) {
        this.volChapVerseMax = 'Volume: 1~66';
        if( isNaN(parts[0]) ) {
          this.inputError = true;
        } else {
          var nVolume = parseInt( parts[0] );
          if( !(nVolume >= 1 && nVolume <= 66) )
            this.inputError = true;
        }
      }

      if( !this.inputError && parts.length > 1 ) {
        var nVolume = parseInt( parts[0] );
        var CumNumOfChpThisVol = CumNumOfChpPerVol[nVolume-1];
        var CumNumOfChpNextVol = CumNumOfChpPerVol[nVolume];
        var numOfChap = CumNumOfChpNextVol - CumNumOfChpThisVol;
        this.volChapVerseMax = 'Chapter: 1~' + numOfChap;
        if( isNaN(parts[1]) ) {
          this.inputError = true;
        } else {
          var nChapter = parseInt( parts[1] );
          if( !(nChapter >= 1 && nChapter <= numOfChap) )
            this.inputError = true;
        }
      }

      if( !this.inputError && parts.length > 2 ) {
        var nVolume = parseInt( parts[0] );
        var nChapter = parseInt( parts[1] );
        var cumChap = CumNumOfChpPerVol[nVolume-1];
        var CumNumOfVrsThisChp = CumNumOfVrsPerChp[ cumChap+nChapter-1 ];
        var CumNumOfVrsNextChp = CumNumOfVrsPerChp[ cumChap+nChapter ];
        var numOfVerse = CumNumOfVrsNextChp - CumNumOfVrsThisChp;
        this.volChapVerseMax = 'Verse: 1~' + numOfVerse;
        if( isNaN(parts[2]) ) {
          this.inputError = true;
        } else {
          var nVerse = parseInt( parts[2] );
          if( !(nVerse >= 1 && nVerse <= numOfVerse) )
            this.inputError = true;
        }
      }
    },

    bookmarkVerse: function() {
      this.updateQuickInput();
      var verseEvent = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fire( 'bookmark-verse', {verseEvent: verseEvent} );
    },

    updateQuickInput: function() {
      this._verifyInput();
      if( this.inputError )
        return;
      this.sQuickInput = this.$.quickInputField.value.replace( / /g, '' );
      if( this.sQuickInput.length < 1 )
        return;

      var nVolume = 1, nChapter = 1, nVerse = 1;
      var nums = this.sQuickInput.split( '.' );
      if( nums.length > 0 && nums[0] && nums[0].length > 0 )
        nVolume = parseInt( nums[0] );
      if( nums.length > 1 && nums[1] && nums[1].length > 0  )
        nChapter = parseInt( nums[1] );
      if( nums.length > 2 && nums[2] && nums[2].length > 0  )
        nVerse = parseInt( nums[2] );

      this.startVerseSub = VsePtr( nVolume, nChapter, nVerse );
      this.nVolume  = nVolume;
      this.nChapter = nChapter;
      this.nVerse = nVerse;

      var evt = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fire( 'preview-verse', {verseEvent: evt} );
    },

    volumeSelected: function( verseEvent ) {
      this.sQuickInput = ''+verseEvent.volume;
      this.updateQuickInput();
    }

  });
})();
