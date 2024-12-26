---
title: Building a blog
description: what I used
---


<div id="myheader"></div>

<article class="article_content" id="article_content">

# Building a blog

When I set out to make my blog I wanted it to be:

- fast
- beautiful
- Markdown
- small
- still be able to do scripting
- no or fast builds

# Failed attempts and alternatives investigated

Especially the fast builds one was important.
I remember trying to get Leptos to build with GH Pages and it was a disaster: https://github.com/quilde/quilde.github.io/commits/main/?since=2024-01-29&until=2024-02-08

At first I thought about using [Jekyll](https://jekyllrb.com/) as everyone seems to be using that.

> [!NOTE] Jekyll requires the following:
    - Ruby version 2.5.0 or higher
    - RubyGems
    - GCC and Make

yeah, no.

Although it seems that GH Pages uses Jekyll now by default, as I had to add a `.nojekyll` file.

# zero-md

At first I used [Zero-md](https://github.com/zerodevx/zero-md). The idea is simple: write your stuff as Markdown, zero-md takes it and produces html elements from it. It's very easy to get started with and surprisingly fast.

However I realized we can do better in a easy and satisfying way.

[MDX](https://mdxjs.com/) seems interesting, but too much of a hassle, I think.

# Current setup ⚙️

The build system ensures that there is no lag because the page needs to compile on the fly and I get to use all the fancy features.

## Build system

This is the full thing:

<details>
  <summary>The entire thing (bout 200 lines)</summary>

```js
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
  data = data.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "") //sanitizing

  var file = matter(data)

  console.log(file.data)

  const options = {
    variants: [
      {
        type: 'danger',
        icon: '<i class="mr-2">🚨</i>',
        title: 'Oh snap!', // optional
        titleClassName: 'text-danger' // optional
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
[...]
`
const htmlheadend = ...
const htmlend = ...
```
  
</details>

## Marked 🔖

Instead of using it via zero-md I use [marked-js](https://github.com/markedjs/marked) directly to compile my posts.

### Marked plugins 🔌

- [marked-alert](https://www.npmjs.com/package/marked-alert) 🚨
- [marked-highlight](https://www.npmjs.com/package/marked-highlight) 👨‍💻

> [!TIP] With marked-alert we get these fancy callouts!

> [!DANGER] We can even make custom ones!

## Gray-matter 🩶

I use [gray-matter](https://www.npmjs.com/package/gray-matter) to parse the yaml frontmatter of my markdown files.

```yaml
---
styles: 
  - id.css
title: "Indexdiachronica"
description: foo bar baz
---
```
Here I can for example include post-specific css files.

## Xml-Js 📬

I use [xml-js](https://www.npmjs.com/package/xml-js) to construct the rss feed for the page. I don't know whether that works yet.

## Arrow-js 🏹

All the components are written using [arrow-js](https://www.arrow-js.com/). It's not your typical JS UI framework: It's very minimal and powerful.

## OKLCH 🖌️
The oklch colorspace is amazing. 
I love systems that map closely to how we think and let you express your ideas very precisely.
Suddenly, these numbers have meaning.

- [oklch color picker](https://oklch.com/#70,0.1,358,100)
- [interactive blog post](https://abhisaha.com/blog/interactive-post-oklch-color-space)

## Other 

I'm using [Motion](https://github.com/motiondivision/motion) for my animations.
Unfortunately it's a bit more complicated if you're not using React.

[Lucide](lucide.dev) for icons

# the Future 🔮
- tags
- actually get the post list working

# Cheers

</article>