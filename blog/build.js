

console.log("hello")

const fs = require('node:fs');
const path = require('node:path');

const marked = require("marked")

const folderPath = './src';
const outputPath = './posts';

fs.readdirSync(folderPath).map(
    filename => {
        fs.readFile(path.join(folderPath, filename), 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(data);
            build(data, filename)
          });
    }
)

function build(data, filename) {
  data = data.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,"")
  
  output = htmlhead + marked.parse(data) + htmlend
  console.log(output)
  
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
    <script type="module" src="header.js"></script>
</head>

<body id="root">
    <main>
        <article class="article_content">

`


const htmlend = `
        </article>
    </main>


</body>
</html>
`