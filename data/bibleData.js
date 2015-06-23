'use strict';

// User interface languages
const LANG_CHN = 'CHN';
const LANG_EN  = 'EN';

// Bible versions
const VER_CUN  = 'CUN';
const VER_KJV  = 'KJV';

var bibleVolumeNames = {};
bibleVolumeNames[LANG_CHN] = bibleVolumeNamesChn;
bibleVolumeNames[LANG_EN]  = bibleVolumeNamesEn;

var BibleByVer = {};
BibleByVer[VER_CUN] = BibleCUNBig5;
BibleByVer[VER_KJV] = BibleKJV;

var lang2Version = {};
lang2Version[LANG_CHN] = VER_CUN;
lang2Version[LANG_EN]  = VER_KJV;

var version2Lang = {};
version2Lang[VER_CUN] = LANG_CHN;
version2Lang[VER_KJV] = LANG_EN;

var CumNumOfChpPerVolByVer = {};
CumNumOfChpPerVolByVer[VER_CUN] = CumNumOfChpPerVol_CUN;
CumNumOfChpPerVolByVer[VER_KJV] = CumNumOfChpPerVol_KJV;
var CumNumOfChpPerVol = [];

var CumNumOfVrsPerChpByVer = {};
CumNumOfVrsPerChpByVer[VER_CUN] = CumNumOfVrsPerChp_CUN;
CumNumOfVrsPerChpByVer[VER_KJV] = CumNumOfVrsPerChp_KJV;
var CumNumOfVrsPerChp = [];

var bibleLang = 'UNK';
var defaultVer = 'UNK';
function setDefaultVer() {
  defaultVer = lang2Version[bibleLang];
  CumNumOfChpPerVol = CumNumOfChpPerVolByVer[defaultVer];
  CumNumOfVrsPerChp = CumNumOfVrsPerChpByVer[defaultVer];
}
