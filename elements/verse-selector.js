(function() {
  Polymer('verse-selector', {
    volAnchorLines: [ [] ],
    selectedVolAnchor: '',
    nVolume: 1,

    init: function() {
      this.updateVolumeAnchorLines();
    },

    updateVolumeAnchorLines: function() {
      console.log( this.tagName, 'updateVolumeAnchorLines' );
      var line = [];
      var lines = [];
      lines.push( line );
      for( var volInd=1; volInd<=66; volInd++ ) {
        if( line.length == 10 || volInd==40 ) {
          line = [];
          lines.push( line );
        }
        var brev = abrevOfVolume( volInd );
        line.push( new Anchor(volInd, volInd + '.' + brev, volInd==this.nVolume) );
      }
      this.volAnchorLines = lines;
    },

    volAnchorClicked: function( event, detail, sender ) {
      var tarEle = event.target;
      if( this.selectedVolAnchor ) {
        this.selectedVolAnchor.className = removeClass(
        this.selectedVolAnchor.className, 'selectedCell' );
      }
      this.selectedVolAnchor = tarEle;
      tarEle.className = tarEle.className + ' selectedCell';

      this.nVolume = parseInt( tarEle.id.split( '.' )[1] );
      var evt = new VerseEvent( this.nVolume );
      this.fire( 'volume-selection', {verseEvent: evt} );
    },

  });

  function Anchor( id, text, selected ) {
    this.id = id;
    this.text = text;
    this.selected = selected;
    function selectedClass() { return this.selected ? 'selectedCell' : ''; }
    function toString() { return 'Anchor(' + id + ', ' + text + ', ' + selected + ')'; }
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
