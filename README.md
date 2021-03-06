## What it does:

  Bible Projector is a browser based tool for projecting Bible verses.

## How to access it:

  In a modern browser (Chrome, Firefox, Safari), go to http://bibleprojectorpage.github.io
  
## How to run in local:
<ol>
<li> Download NodeJS at https://nodejs.org/</li>
<li> Install NodeJS package bower - It is a JavaScript dependency manager<BR/>
    npm install -g bower</li>
<li> Install git from http://www.git-scm.com/</li>
<li> Clone source code<BR/>
    git clone https://github.com/weipingc/bibleProjector</li>
<li> Get dependencies<BR/>
    cd bibleProjector<BR/>
    bower update</li>
<li> Install NodeJS package polyserve - It is a web server written in NodeJS<BR/>
    npm install -g polyserve</li>
<li> Run polyserve to serve the Bible Projector application<BR/>
    polyserve -p 8888<BR/>
  Or
    ./startPolyserve.bat
   You will see the following:<BR/>
    Starting Polyserve on port 8888<BR/>
    Files in this directory are available at localhost:8888/components/BibleProjector/...</li>
<li> Launch the Bible Projector application<BR/>
    Start Chrome browser<BR/>
    Go to localhost:8888/components/BibleProjector/index.html</li>
</ol>

## Help
  Clicking the Help link will open the Help window, you can read detailed instructions there.

## System requirements:

  Google Chrome
    Version 44 or newer.

## Technical Notes:
  Polymer(http://polymer-project.org/) version 1.0 is used.

## Publish
  <ol>
  <li>Following this tech guide:<BR/>
    https://pages.github.com/</li>
  <li>Create another account @github.com<BR/>
      bibleprojectorpage</li>
  <li>Created new repo<BR/>
      bibleprojectorpage.github.io</li>
  <li>Clone the new repo</li>
  <li>Copy the deployment of this repo(weipingc/bibleprojector)</li>
  <li>Commit the new repo</li>
  <li>Now you can access it http://bibleprojectorpage.github.io</li>
  </ol>
  
## Credentials
  Weiping Chen(weiping.chen@gmail.com)
  This program is based on the works of Mr. Weiheng Hsi, Mr. Spring (chunnan.hung@gmail.com)
  and Paul Chang(paul.cmchang@gmail.com)

