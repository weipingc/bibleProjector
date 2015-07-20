'use strict';

Polymer({
    is: 'projector-controller',
    properties: {
        initialized: {
          type: Boolean,
          value: false
        },
        verseSet: {
          type: Boolean,
          value: false
        },
        projectorClosed: {
          type: Boolean,
          value: true
        },
        versionCUN: {
          // Chinese Union Verseion
          type: Boolean,
          value: true
        },
        versionKJV: {
          type: Boolean,
          value: true
        },
        syncPreview: {
          type: Boolean,
          value: false
        },
        
        pageSize: {
          type: Number,
          value: 3
        },
        fontSize: {
          type: Number,
          value: 40
        },
        
        bgFile: {
          type: String,
          value: 'black'
        },
        previewTitle: {
          type: String,
          value: '<closed>'
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
        projWin: {
          type: Number,
          value: -1
        },
        
        backgroundSettings: {
          type: Array,
          value: new Array(
            {selected: false, label: 'Black', value: 'black'},
            {selected: false, label: 'White', value: 'white'},
            {selected: false, label: 'Brgt1', value: 'bgBright1.jpeg'},
            {selected: false, label: 'Brgt2', value: 'bgBright2.jpeg'},
            {selected: false, label: 'Brgt3', value: 'bgBright3.jpeg'},
            {selected: false, label: 'Brgt4', value: 'bgBright4.jpeg'},
            {selected: false, label: 'Dark1', value: 'bgDark1.jpeg'},
            {selected: false, label: 'Dark2', value: 'bgDark2.jpeg'},
            {selected: false, label: 'Dark3', value: 'bgDark3.jpeg'},
            {selected: false, label: 'Dark4', value: 'bgDark4.jpeg'}
          )
        }
    },

    syncPreviewChanged: function() {
      if( !this.projectorClosed && this.syncPreview ) {
        var evt = new VerseEvent( this.nVolume, this.startVerseSub );
        this.fire( 'preview-verse', {verseEvent: evt} );
      }
    },

    ironLocalStorageLoaded: function() {
      var val = this.$.storage.value;
      console.log( "projector-controller ironLocalStorageLoaded, value=" + val );
      if( !val || !val.bgFile )
        return;
      this.bgFile = val.bgFile;
      for( var ind=0; ind<this.backgroundSettings.length; ind++ ) {
        if( this.backgroundSettings[ind].value != this.bgFile )
          continue;
        this.backgroundSettings[ind].selected = true;
        break;
      }
    },

    defaultVerSelected: function() {
      if( defaultVer == VER_CUN ) {
          this.$.chkVersionCUN.value = true;
          this.$.chkVersionKJV.value = false;
          this.versionCUN = true;
          this.versionKJV = false;
      } else {
          this.$.chkVersionCUN.value = false;
          this.$.chkVersionKJV.value = true;
          this.versionCUN = false;
          this.versionKJV = true;
      }

      var projCtr = this;
      if( this.verseSet ) {
          this.previewTitle = getTitleFromVerseSub( this.nVolume, this.startVerseSub );
      }
      var timer = window.setInterval( function() {
          window.clearInterval( timer );
          if( !projCtr.projectorClosed ) {
            projCtr._projectVerse();
          }
      }, 1 );
    },

    chkVersionCUNChanged: function(evt) {
        this.versionCUN = evt.srcElement.checked;
    },
    
    chkVersionKJVChanged: function(evt) {
        this.versionKJV = evt.srcElement.checked;
    },
    
    openProjector: function( evt ) {
      this._projectVerse();
    },

    closeProjector: function( evt ) {
      if( this.isProjectorOpen() ) {
        this._afterProjWinClosed();
      }
    },

    _afterProjWinClosed: function() {
      if( this.projWin.close ) this.projWin.close();
      this.projWin = -1
      this.projectorClosed = true;
      this.$.closeBtn.value = 'Open';
      this.$.closeBtn.title = 'Open the projector window';
    },

    projectVerse: function( verseEvent ) {
      this.nVolume = verseEvent.volume;
      this.verseSet = true;
      this.startVerseSub = verseEvent.verseSub;

      var cumNumOfChpNextVol = CumNumOfChpPerVol[this.nVolume];
      this.indOfFirstVerseOfThisVol = CumNumOfVrsPerChp[ CumNumOfChpPerVol[this.nVolume-1] ];
      this.indOfLastVerseOfThisVol  = CumNumOfVrsPerChp[cumNumOfChpNextVol] - 1;

      this._projectVerse();
    },

    _projectVerse: function() {
      this.previewTitle = getTitleFromVerseSub( this.nVolume, this.startVerseSub );
      if( !this.isProjectorOpen() ) {
        var projWinFeatures = 'scrollbars=yes';
        this.projWin = window.open( 'blank.html', 'projector', projWinFeatures );
      }
      var docObj = this.projWin.document;
      docObj.open();
      var foreColor = 'WHITE';
      if( this.bgFile=='white' || this.bgFile.indexOf('bgBright')>=0 ) {
        foreColor = 'BLACK';
      }
      var bg = 'background: url(images/' + this.bgFile + ') no-repeat center center fixed;';
      if( this.bgFile=='white' || this.bgFile=='black' )
        bg = 'background-color: ' + this.bgFile + ';';
      docObj.writeln(
          '<!DOCTYPE HTML>\n<HEAD>\n<TITLE>Verse projection</TITLE>\n'
        + '<link rel="shortcut icon" href="favicon.ico">\n'
        + '<meta http-equiv="Content-Type" content="text/html; charset=big5"/>\n'
        + '<style type="text/css">\n'
        + 'body { color: ' + foreColor + ';'
        + '   font-size: ' + this.fontSize + 'pt; font-weight: bolder; padding-left: 0.5em; padding-right: 0.5em}\n'
        + 'html {  ' + bg
        + '  -webkit-background-size: cover;\n'
        + '  -moz-background-size: cover;\n'
        + '  -o-background-size: cover;\n'
        + '  background-size: cover;\n'
        +'}\n'
        + '.aquo {\n'
        + '   font-family: monospace;\n'
        + '   font-size: 150%;\n'
        + '}\n'
        + '</style>\n'
        + '</HEAD>\n<BODY>\n');
      var versionList = new Array();
      if( this.versionCUN )
        versionList.push( 'CUN' );
      if( this.versionKJV )
        versionList.push( 'KJV' );

      docObj.writeln( this.getVerseTextForDisplay(versionList, foreColor)  );
      docObj.writeln( '\n</BODY>\n</HTML>' );
      docObj.close();
      this.projectorClosed = false;
      this.$.closeBtn.value = 'Close';
      this.$.closeBtn.title = 'Close the projector window';

      var projectorControllerThis = this;
      var timer = window.setInterval( function() {
          if( projectorControllerThis.checkProjectWin() ) {
            window.clearInterval( timer );
          }
        }, 500
      );

      if( this.syncPreview ) {
        var evt = new VerseEvent( this.nVolume, this.startVerseSub );
        this.fire( 'preview-verse', {verseEvent: evt} );
      }
    },

    checkProjectWin: function() {
      if( !this.isProjectorOpen() ) {
        this._afterProjWinClosed();
      }
      return this.projectorClosed;
    },

    getVerseTextForDisplay: function( versionList, foreColor ) {
      var volume = this.nVolume;
      var pageSize = this.pageSize;
      var verseSub = this.startVerseSub;
      versionList = versionList || new Array( defaultVer );
      foreColor = foreColor || 'black';
      var cumNumOfChpNextVol = CumNumOfChpPerVol[volume];
      var indOfFirstVerseOfThisVol = CumNumOfVrsPerChp[ CumNumOfChpPerVol[volume-1] ];
      var indOfLastVerseOfThisVol  = CumNumOfVrsPerChp[cumNumOfChpNextVol] - 1;
      var verseTextBuf = '';

      versionList.forEach( function(version) {
        var currChapter = '';
        for( var cnt=0; cnt<pageSize && verseSub+cnt<=indOfLastVerseOfThisVol; cnt++ ) {
          var nextVerse = BibleByVer[version][ verseSub + cnt ];
          var colonInd = nextVerse.indexOf( ':' );
          var spaceInd = nextVerse.indexOf( ' ' );
          var nextChapter = nextVerse.substring( 0, colonInd ).match( /\d+$/ )[0];
          var verseNum  = nextVerse.substring( colonInd+1, spaceInd );
          var verseText = nextVerse.substring( spaceInd+1 );
          if( currChapter != nextChapter ) {
            currChapter = nextChapter;
            verseTextBuf +=
              '<b><span class="aquo">&laquo;</span>'
              + getVolumeChapterText(volume, currChapter, version) + '<span class="aquo">&raquo;</span></b>&nbsp;&nbsp; ';
          }
          verseTextBuf +=  '&nbsp; <sup style="font-size:70%;">' + verseNum + '</sup> ' + verseText;
        }
      });

      return verseTextBuf;
    },

    applySetting: function( evt ) {
      this._projectVerse();
    },

    pageSizeSelectionChanged: function( evt ) {
      this.pageSize =   parseInt( evt.target.value );
    },

    bgSelectionChanged: function( evt ) {
      this.bgFile =   evt.target.value;
      this.$.storage.value = {bgFile: this.bgFile};
    },

    viewPreviousPage: function() {
      if( !this.isProjectorOpen() ) {
        this.projectorClosed = true;
        return;
      }
      if( this.startVerseSub <= this.indOfFirstVerseOfThisVol  ) {
        return;
      } else if( this.startVerseSub - this.pageSize <= this.indOfFirstVerseOfThisVol){
        this.startVerseSub = this.indOfFirstVerseOfThisVol;
      } else {
        this.startVerseSub -= this.pageSize;
      }
      this._projectVerse();
    },

    viewNextPage: function() {
      if( !this.isProjectorOpen() ) {
        this.projectorClosed = true;
        return;
      }
      if( this.nVolume>66 ) {
        return;
      }
      if( this.startVerseSub + this.pageSize > this.indOfLastVerseOfThisVol  ) {
        return;
      }
      this.startVerseSub += this.pageSize;
      this._projectVerse();
    },

    bookmarkVerse: function() {
      var evt = new VerseEvent( this.nVolume, this.startVerseSub );
      this.fire( 'bookmark-verse', {verseEvent: evt} );
    },

    smallerFont: function() {
      if( !this.isProjectorOpen() ) {
        this.projectorClosed = true;
        return;
      }
      this.fontSize -= 2;
      this._projectVerse();
    },
    largerFont: function() {
      if( !this.isProjectorOpen() ) {
        this.projectorClosed = true;
        return;
      }
      this.fontSize += 2;
      this._projectVerse();
    },

    isProjectorOpen: function() {
      return this.projWin != -1 && this.projWin.document;
    }

});
