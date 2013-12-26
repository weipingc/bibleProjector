// User interface languages
const LANG_CHN = 'CHN';
const LANG_EN  = 'EN';

// Bible versions
const VER_CUN  = 'CUN';
const VER_KJV  = 'KJV';

bibleVolumeNames = {};
bibleVolumeNames[LANG_CHN] = bibleVolumeNamesChn;
bibleVolumeNames[LANG_EN]  = bibleVolumeNamesEn;

BibleByVer = {};
BibleByVer[VER_CUN] = BibleCUNBig5;
BibleByVer[VER_KJV] = BibleKJV;

lang2Version = {};
lang2Version[LANG_CHN] = VER_CUN;
lang2Version[LANG_EN]  = VER_KJV;

version2Lang = {};
version2Lang[VER_CUN] = LANG_CHN;
version2Lang[VER_KJV] = LANG_EN;

CumNumOfChpPerVolByVer = {};
CumNumOfChpPerVolByVer[VER_CUN] = CumNumOfChpPerVol_CUN;
CumNumOfChpPerVolByVer[VER_KJV] = CumNumOfChpPerVol_KJV;
CumNumOfChpPerVol = [];

CumNumOfVrsPerChpByVer = {};
CumNumOfVrsPerChpByVer[VER_CUN] = CumNumOfVrsPerChp_CUN;
CumNumOfVrsPerChpByVer[VER_KJV] = CumNumOfVrsPerChp_KJV;
CumNumOfVrsPerChp = [];

bibleLang = 'UNK';
defaultVer = 'UNK';
function setDefaultVer() {
  defaultVer = lang2Version[bibleLang];
  CumNumOfChpPerVol = CumNumOfChpPerVolByVer[defaultVer];
  CumNumOfVrsPerChp = CumNumOfVrsPerChpByVer[defaultVer];
}
