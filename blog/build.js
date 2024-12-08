

console.log("hello")

const fs = require('node:fs');
const path = require('node:path');

const marked = require("marked")
const matter = require('gray-matter');
var convert = require('xml-js');

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
function build(data, filename) {
  data = data.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")

  file = matter(data)

  console.log(file.data)
  
  

  output = htmlhead
  for (const style in file.data.styles) {
    output += `<link rel="stylesheet" href="` + file.data.styles[style] + `"/>`
  }
  output += htmlheadend
  output += marked.parse(file.content) + htmlend

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
    <script type="module" src="../arrow_components.js"></script>
`

const htmlheadend = `
</head>

<body id="root">
    <main>
        
`


const htmlend = `

    </main>


</body>
</html>
`