# EBI Style lab
This is a collaborative effort. The EBI Style lab is a place to communicate how we use visual identity, code, and language to make better and more accessible services -- it exists because of pan-EMBL-EBI collaboration.

## How to use a pattern

Building Blocks are made to drop into any EMBL-EBI project and work. Therefore the EBI Visual Framework is a dependency.

#### Copy it

Like a Building Block? You can copy the HTML and CSS/SCSS and JS (if applicable) from the Building Block detail page. You’ll see a responsive preview and description at the top of the page. Below the preview you’ll find the code for the component.

#### or Download a ZIP
You can can download the files needed for the Building Block. Click the download button and you’ll get:
- Individual HTML files
- Individual CSS files for each
- Individual SCSS files in case you want to manually add them to a Sass project
- Individual JS files (if applicable)

---

### How to share a building block?

See the guide at how-to.html

### How do I develop on my local machine

Your computer needs:

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

First download it with Git:

```bash
git clone https://github.com/ebiwd/ebi-style-lab.git
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd EBI-Style-lab
npm i
bower i
```

Finally, run `npm start` to start the project and watch for changes. It will open in your browser at:

```
http://localhost:8000
```

To deploy, run `npm run deploy`.

### Making your own pattern library
Fork this repo or create a sub- or super-set of pattern functionality, and add colors and components in their respective directories.

The easiest way to see the changes is to view through Github Pages, alternatively you can build the Jekyll on your local [machine](https://jekyllrb.com/docs/usage/).

## Credit
The base CMS configuration and code examples are forked from ZURB Foundation Building Blocks.
