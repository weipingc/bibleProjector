(function() {
  Polymer('lang-selector', {
    rememberMySelection: false,
    lang: 'CHN',
    secondsToStart: 5,
    started: false,
    langInfoList: new Array(
      new LangInfo(LANG_CHN, 'Chinese', true),
      new LangInfo(LANG_EN,  'English', false) ),

    enteredView: function() {
      var timer;
      var langSelectorThis = this;
      var langSelectInfo = this.$.storage.value;
      if( langSelectInfo && langSelectInfo.rememberSelection && langSelectInfo.defaultLang ) {
        this.rememberMySelection = langSelectInfo.rememberSelection;
        this.lang = langSelectInfo.defaultLang;
        var selectedLang = this.lang;
        this.langInfoList.forEach( function( langInfo ) {
          langInfo.selected = langInfo.value == selectedLang;
        });
        langSelectorThis._selectLang();
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
      if( !started )
        this.$.startBtn.click();
    },

    selectLang: function( evt ) {
      this.lang = this.$.langSelect.value;
      var langSelectInfo = new LangSelectInfo( this.lang, this.rememberMySelection );
      this.$.storage.value = langSelectInfo;
      this._selectLang();
    },

    _selectLang: function() {
      this.started = true;
      this.fire( 'lang-select', {lang: this.lang, started: this.started} );
    }
  });
})();

function LangSelectInfo( defaultLang, rememberSelection ) {
  this.defaultLang = defaultLang;
  this.rememberSelection = rememberSelection;
}

function LangInfo( value, label, selected ) {
  this.value = value;
  this.label = label;
  this.selected = selected;
}
