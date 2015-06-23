'use strict';

//
// VsePtr()
//  Return the pointer of a specified verse
//
function VsePtr(Volume, Chap, Verse){
  var i = 0;
  var nVolume, nChap, nVerse;

  nVolume = eval(Volume);
  nChap = eval(Chap);
  nVerse = eval(Verse);
  if(nVerse == null) nVerse = 1;      // V0.3
  if(nChap == null ) nChap = 1;     // V0.3
  i = CumNumOfVrsPerChp[CumNumOfChpPerVol[nVolume-1] + nChap - 1] + nVerse - 1 ;
  return(i);
} // end of VsePtr()

/*
 * Get breviation of a volume
 * @param nVol volume, starts from 0
 */
function abrevOfVolume( nVol ) {
  var chaps = CumNumOfChpPerVol[nVol-1];
  var firstVerseSub = CumNumOfVrsPerChp[ chaps ];
  var bible = getBible();
  var verseText = bible[firstVerseSub];
  var volAbrevInd = verseText.search( /\d+.\d+/ );
  var abrev = verseText.substring( 0, volAbrevInd );
  if( bibleLang == LANG_CHN ) {
    abrev = abrev.substring( 0, 1 );
  } else if( bibleLang == LANG_EN )
    abrev = abrev.substring( 0, 3 );
  return abrev;
}

function getBible() {
  return BibleByVer[ defaultVer ];
}

function VerseEvent( volume, verseSub, source, label ) {
  this.volume = volume;
  this.verseSub = verseSub;
  this.source = source;
  this.label = typeof label !== 'undefined' ? label : '';
}


function VerseItem( verseSub, verseText ) {
  this.verseSub = verseSub;
  this.verseText = verseText;
}

function getVolumeChapterText( volume, chapter, version ) {
  var volumeText = bibleVolumeNames[ version2Lang[version] ] [volume-1];
  var chapterText = ' Ch' + chapter;
  if( version2Lang[version] == LANG_CHN ) {
    chapterText = ' ' + chapter + chapterChineseName;
  }
  return volumeText + chapterText;
}

function getTitleFromVerseSub( volume, verseSub ) {
  var verseText = getBible()[verseSub];
  var volAbrevInd = verseText.search( ' ' );
  return volume + '.' + verseText.substring( 0, volAbrevInd );
}
