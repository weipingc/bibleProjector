'use strict';

(function() {
  Polymer({
    is: 'verse-selector',
    properties: {
        volAnchorLines: {
          type: Array,
          value: [],
          notify: true,
          reflectToAttribute: true
        },
        nVolume: {
          type: Number,
          value: 1
        },
        selectedVolAnchor: {
          type: String,
          value: ''
        },
    },

    updateVolumeAnchorLines: function() {
      console.log( this.tagName, 'updateVolumeAnchorLines' );
      this.volAnchorLines = [];
      var anchors = [];
      for( var volInd=1; volInd<=66; volInd++ ) {
        if( anchors.length == 10 || volInd==40 ) {
          this.push('volAnchorLines', {anchors: anchors});
          anchors = [];
        }
        var brev = abrevOfVolume( volInd );
        var anchor = new Anchor(volInd, volInd + '.' + brev, volInd==this.nVolume);
        anchors.push( anchor );
      }
      this.push('volAnchorLines', {anchors: anchors});
    },

    volAnchorClicked: function( event, detail, sender ) {
      var tarEle = event.target;
      var volAnchor = tarEle;
      if( tarEle.tagName == 'SPAN' ) {
        volAnchor = tarEle.parentElement;
      }
      if( this.selectedVolAnchor ) {
        this.selectedVolAnchor.className = removeClass(
        this.selectedVolAnchor.className, 'selectedCell' );
      }
      this.selectedVolAnchor = volAnchor;
      volAnchor.className = volAnchor.className + ' selectedCell';

      this.nVolume = parseInt( volAnchor.id.split( '.' )[1] );
      var evt = new VerseEvent( this.nVolume );
      this.fire( 'volume-selection', {verseEvent: evt} );
    },

  });

  function Anchor( id, text, selected ) {
    this.id = 'vol.' + id;
    this.text = text;
    this.selected = selected;
    this.selectedClass = 'anchorCell';
    this.needPadding = id < 10;
  }

})();

function removeClass( classNames, className ) {
  var arrayOfStrings = classNames.split( ' ' );
  var newClassNames = '';
  for( var ind=0; ind<arrayOfStrings.length; ind++ ) {
    if( arrayOfStrings[ind] == className )
      continue;
    newClassNames = newClassNames + ' ' + arrayOfStrings[ind];
  }
  return newClassNames;
}
