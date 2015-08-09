What it does:
  Bible Projector is a browser based tool for projecting Bible verses.

How to run:
(1) Download NodeJS at https://nodejs.org/
(2) Install NodeJS package bower - It is a JavaScript dependency manager
    npm install -g bower
(3) Install git from http://www.git-scm.com/
(4) Clone source code
    git clonehttps://github.com/weipingc/bibleProjector
(5) Get dependencies
    cd bibleProjector
    bower update
(6) Install NodeJS package polyserve - It is a web server written in NodeJS
    npm install -g polyserve
(7) Run polyserve to serve the Bible Projector application
    polyserve -p 8888
   You will see the following:
    Starting Polyserve on port 8888
    Files in this directory are available at localhost:8888/components/BibleProjector/...
(8) Launch the Bible Projector application
    Start Chrome browser
    Go to localhost:8888/components/BibleProjector/

Clicking the Help link will open the Help window, you can read detailed instructions there.

System requirements:

  Google Chrome
    Version 44newer.

Technical Notes:
  Polymer(http://polymer-project.org/) version 1.0 is used.

Credentials
  Weiping Chen(weiping.chen@gmail.com)
  This program is based on the works of Mr. Weiheng Xi, Mr. Spring (chunnan.hung@gmail.com)
  and Paul Chang(paul.cmchang@gmail.com)

