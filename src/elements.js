
//import hljs from "npm:highlight.js";
import hljs from "npm:highlight.js/lib/core";
import javascript from 'npm:highlight.js/lib/languages/javascript';

var s = ""
var indent = ""
var tags = []

export function init() {
  hljs.registerLanguage('javascript', javascript)
}

export function get_html_and_clear() {
  let x = s
  s = ""
  return x
}

function close(tag) {
  indent = indent.substring(0, indent.length - 2)
  s += "\n" + indent + `</${tag}>\n`
}

export function html(c) {
  s += indent + "<!DOCTYPE html>\n"
  //tags.push("</html>\n")
  indent += "  "
  c()
  close("html")
}

export function p(c, x) {
  /*if (x != undefined) {
    s += indent + "<p>" + x + "</p>\n"
  } else {
    s += indent + "<p>\n"
    tags.push("</p>\n")
    indent += "  "
  }*/
  s += indent + "<p>\n"
  //tags.push("</p>\n")
  indent += "  "
  c()
  close("p")
}


export function title(x) {
  s += "<title>" + x + "</title>"
}

/*
<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap" rel="stylesheet">*/

export function head(x) {
  s += `
  <head>
    <link rel="stylesheet" href="../../main.css" />
    
    
    <link rel="icon" type="image/png" href="/quilde.github.io/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/quilde.github.io/favicon.svg" />
    <link rel="shortcut icon" href="/quilde.github.io/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/quilde.github.io/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="MyWebSite" />
    <link rel="manifest" href="/quilde.github.io/site.webmanifest" />
  </head>\n`
}
var classes = []
export function class_() {
  for (let c of arguments) {
    classes.push(c)
  }
}

export function article(c) {
  s += indent + "<article class=\""
  for (let c of classes) {
    s += c + " "
  }
  classes = []
  s += "\" "
  if (id_ != "") {
    s += "id=\"" + id_ + "\" "
    id_ = ""
  }

  s += ">\n"
  //tags.push("</article>\n")
  indent += "  "
  c()
  close("article")
}

var id_ = ""
export function id(x) {
  id_ = x
}

export function h1(x) {
  s += indent + "<h1>" + x + "</h1>\n"
}

export function h2(x) {
  s += indent + "<h2>" + x + "</h2>\n"
}

export function body(c) {
  s += indent + "<body"
  if (id_ != "") {
    s += " id=\"" + id_ + "\" "
    id_ = ""
  }
  s += ">\n"
  indent += "  "
  c()
  close("body")
}

export function main(c) {
  s += indent + "<main"
  if (id_ != "") {
    s += " id=\"" + id_ + "\" "
    id_ = ""
  }
  s += ">\n"
  indent += "  "
  c()
  close("main")
}

var style_text = ""
export function style(s) {
  style_text = s
}

export function ul(c) {
  s += indent + "<ul>\n"
  //tags.push("</ul>\n")
  indent += "  "
  close("ul")
}

export function li(x) {
  s += indent + "<li>" + x + "</li>\n"
}

export function text(x) {
  s += x
}

export function line(x) {
  s += x + "\n"
}

export function link(x) {
  s += "<a href=\"" + x + "\">\n" + x + "</a>\n"
}

export function callout_info(x) {
  s += indent + "<div>\n" + x + "</div>\n"
  //tags.push("</div>\n")
  indent += "  "
}

export function code(x, l) {
  s += indent + "<pre><code>\n"
  const highlightedCode = hljs.highlight(
    x,
    { language: l}
  ).value
  s += indent + indent + highlightedCode
  close("code></pre")
}
