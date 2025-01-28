[![Build Status](https://travis-ci.org/ebiwd/EBI-Style-lab.svg?branch=master)](https://travis-ci.org/ebiwd/EBI-Style-lab)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/ebiwd/EBI-Framework)

# 🚨 The Style Lab is reach end of life 🚨

The EMBL-EBI Style Lab complements the 1.x series of the Visual Framework, it is being superseded by version 2.

- [Information on the Visual Framework version 2](https://stable.visual-framework.dev/)
- [About the retirement of 1.x](https://www.ebi.ac.uk/style-lab/websites/framework-next/)

# EMBL-EBI Style Lab

This is a collaborative effort. The EMBL-EBI Style Lab is a place to communicate how we use visual identity, code and language to make better and more accessible services -- it exists because of pan-EMBL-EBI collaboration.

There's not much to see on this page, [check out the site at www.ebi.ac.uk/style-lab/](https://www.ebi.ac.uk/style-lab/)

## What is this, exactly?

The EMBL-EBI Style Lab is a collaborative space that also shares the latest guidance on how and what should be used to build visually and textually compliant EMBL-EBI websites, documents, and texts. It's partly about reinforcing our shared identity, but it's mostly about leveraging the best tools to build things faster and with fewer bugs, errors, and user experience issues.

### Contents of the EMBL-EBI Style Lab

- [General styling](httpss://www.ebi.ac.uk/style-lab/)
  - [Our basic style guide](https://www.ebi.ac.uk/style-lab/general/)
  - [Microsoft Word and PowerPoint templates](https://www.ebi.ac.uk/style-lab/general/templates/)
  - [Poster templates](https://www.ebi.ac.uk/style-lab/general/templates/)
  - [Logos](https://www.ebi.ac.uk/style-lab/general/templates/)
  - [Fonts & icons](https://www.ebi.ac.uk/style-lab/general/fonts/)
  - [Social media guidelines](https://www.ebi.ac.uk/style-lab/general/social/)
- [Website specific](https://www.ebi.ac.uk/style-lab/websites/)
  - [How to get started with the EBI Visual Framework](https://www.ebi.ac.uk/style-lab/websites/#implementing)
  - [How to use the EBI Icon fonts on a website](https://www.ebi.ac.uk/style-lab/general/fonts/)
  - [Boilerplate templates to get started](https://www.ebi.ac.uk/style-lab/websites/sample-site/)
  - [Reusable web interface patterns](https://www.ebi.ac.uk/style-lab/websites/patterns/)
    - [How to add a pattern](https://www.ebi.ac.uk/style-lab/websites/patterns/howto/)

---

## Are you a web developer?

### How do I develop on my local machine

**UPDATED** - This repo code is outdated and not able to make any modifications. So we have [`build`](./build/) folder which is dump of existing compiled code and same is deployed on K8s cluster. No changes are recommended in this repo going forward.

You can just view on local by running - `docker-compose up -d` and access http://localhost:8000/style-lab

**OLD STEPS** - As below 

1. Your computer needs:
  - [NodeJS](https://nodejs.org/en/)
  - [Git](https://git-scm.com/)
2. Get the git repo: `git clone https://github.com/ebiwd/ebi-style-lab.git`
  - If you've not yet installed bower (you may need to run with sudo): `npm install -g bower`
3. Then open the folder in your command line, and install the needed dependencies:
    ```bash
    cd EBI-Style-lab
    npm install
    bower install
    ```
4. Finally:
  - To develop: 
    - `npm start` or `gulp bb` start the project and watch for changes in your browser at http://localhost:8000
  - To build for deployment: run `npm run build`

#### Special things

- Pulling in the latest EBI Icon font samples:
     - `gulp updateIconFonts`

## Versioning

Releases are versioned according to the EBI Visual Framework being used. That is: while we uses the EBI Visual Framework v1.4, all EBI Style Lab releases will be v1.4.X

## Credit

The base CMS configuration and code examples are forked from ZURB Foundation Building Blocks.
