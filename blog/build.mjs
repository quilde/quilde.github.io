

console.log("hello")

import fs from 'node:fs'
import path from 'node:path'

import { Marked } from "marked"
import matter from 'gray-matter'
import * as convert from 'xml-js'


import markedAlert from 'marked-alert'
import { markedHighlight } from "marked-highlight"
import hljs from 'highlight.js'

const folderPath = './src';
const outputPath = './posts';
const root = "https://www.quilde.github.io/blog/"

var rssobj = {
  "_declaration": {
    "_attributes": { "version": "1.0", "encoding": "utf-8" }
  },
  "rss": {
    "_attributes": { "version": "2.0" },
    channel: {
      title: "essë studios",
      link: root,
      description: "My blog",
      category: [
        "Programming",
        "Art"
      ],
      copyright: "2024 esse unless noted otherwise",
      image: {
        url: "https://www.quilde.github.io/Unbenannnt.png",
        title: "essë studios",
        link: root,
      },
      language: "en-us",
      item: [

      ]
    }
  }
};

buildposts()

function buildposts() {


  fs.readdirSync(folderPath).map(
    filename => {
      fs.readFile(path.join(folderPath, filename), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);


        build(data, filename)

        console.log(rssobj)
        var options = { compact: true, ignoreComment: true, spaces: 4 };
        var rss_xml = convert.js2xml(rssobj, options);
        console.log(rss_xml)
        fs.writeFile("./rss.xml", rss_xml, err => {
          if (err) {
            console.error(err);
          } else {
            // file written successfully
          }
        });
      });

    }
  )

}
async function build(data, filename) {
  data = data.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")

  var file = matter(data)

  console.log(file.data)

  const options = {
    variants: [
      {
        type: 'danger',
        icon: '<i class="mr-2">🚨</i>',
        title: 'Oh snap!', // optional
        titleClassName: 'text-danger' // optional
      },
      {
        type: 'quote',
        icon: '<i class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon lucide-quote"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg></i>',
        title: 'Quote', // optional
        titleClassName: 'text-quote' // optional
      }
    ]
  }
  const m = new Marked()

  m.use(markedAlert(options))
  m.use(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  )



  var output = htmlhead
  for (const style in file.data.styles) {
    output += `<link rel="stylesheet" href="` + file.data.styles[style] + `"/>`
  }
  output += htmlheadend
  output += m.parse(file.content) 
  output += htmlend

  console.log(output)


  rssobj.rss.channel.item.push({
    title: file.data.title,
    description: file.data.description,
    link: root + filename.replace(".md", ".html")
  })

  fs.writeFile(path.join(outputPath, filename.replace(".md", ".html")), output, err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });
}

const htmlhead = `
<!DOCTYPE html>
<title>Test</title>

<head>
    <link rel="stylesheet" href="../../main.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap" rel="stylesheet">
    <script type="module" src="../arrow_components.js"></script>

    
    <link rel="icon" type="image/png" href="/quilde.github.io/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/quilde.github.io/favicon.svg" />
    <link rel="shortcut icon" href="/quilde.github.io/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/quilde.github.io/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="MyWebSite" />
    <link rel="manifest" href="/quilde.github.io/site.webmanifest" />
`

const htmlheadend = `
</head>

<body id="root">
    <main>

`


const htmlend = `
    <i data-lucide="menu"></i>
    </main>


</body>
</html>
`