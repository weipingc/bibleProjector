'use strict';

Polymer({
    is: 'lang-selector',
    properties: {
        lang: {
          type: String,
          value: 'CHN'
        },
        langInfoList: {
          type: Array,
          value: new Array(
            new LangInfo(LANG_CHN, 'Chinese', true),
            new LangInfo(LANG_EN,  'English', false) )
        },
        rememberMySelection: {
          type: Boolean,
          value: false,
          notify: true
        },
        secondsToStart: {
          type: Number,
          value: 5
        },
        started: {
          type: Boolean,
          value: false
        }
    },
    
    rememberMySelectionChanged: function(evt) {
        this.rememberMySelection = this.$.rememberMySelection.checked;
    },
    
    ironLocalStorageLoaded: function() {
      var val = this.$.storage.value;
      console.log( "lang-selector ironLocalStorageLoaded, value=" + val );
      
      var timer;
      var langSelectorThis = this;
      var langSelectInfo = this.$.storage.value;
      if( langSelectInfo && langSelectInfo.rememberSelection && langSelectInfo.defaultLang ) {
        this.rememberMySelection = langSelectInfo.rememberSelection;
        this.lang = langSelectInfo.defaultLang;
        var selectedLang = this.lang;
        this.langInfoList.forEach( function( langInfo ) {
          langInfo.selected = (langInfo.value == selectedLang);
        });
        langSelectorThis._langSelected();
      } else {
        var secondsToStart = this.secondsToStart;
        var secondsToStartCounter = this.$.secondsToStartCounter;
        timer = window.setInterval( function() {
            if( secondsToStart-- == 0 ) {
              window.clearInterval( timer );
              langSelectorThis.selectTimeout();
            }
            secondsToStartCounter.innerText = secondsToStart;
        }, 1000 );
      }
    },

    selectTimeout: function() {
      if( !this.started )
        this.$.startBtn.click();
    },

    selectLang: function( evt ) {
      this.lang = this.$.langSelect.value;
      var langSelectInfo = new LangSelectInfo( this.lang, this.rememberMySelection );
      this.$.storage.value = langSelectInfo;
      this._langSelected();
    },

    _langSelected: function() {
      this.started = true;
      this.fire( 'lang-select', {lang: this.lang, started: this.started} );
    }
});

function LangSelectInfo( defaultLang, rememberSelection ) {
  this.defaultLang = defaultLang;
  this.rememberSelection = rememberSelection;
}

function LangInfo( value, label, selected ) {
  this.value = value;
  this.label = label;
  this.selected = selected;
}
