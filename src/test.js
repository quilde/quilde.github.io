

import * as h from "./elements.js"

export function test() {
    h.html(() => {
        h.p(() => {})
    })
}

function test1() {
    h.html(() => {
        h.title("Test Page")
        h.head()
        h.id("root")
        h.body()
        //h.p("hi")
    })
}

/*
function test2() {
    h.html(
        h.title("Test Page")
        h.head()
        h.id("root")
        h.body()
        h.p("hi")
        h.close()
    )
}


function card() {
  return h.div(
    h.h1()
    h.div(),
  )
}

export function alternative() {
  return h.Html(
    h.Title("Test Page"),
    h.Head()
    h.attr({id: "root"})
    h.Body(
      h.p("hi. Here is some ${h.i("Text")}   <b>Text</b>")
    )
  )
  
}

export function test() {
  h.html()
  while (h.scope()) {
    h.title("Test Page")
    h.head()
    h.id("root")
    h.body()
    while (h.scope()) {
      while h.div() {
        while h.div() {
        
        }
        h.p("hi inside div")
      }
      h.p("hi outside div")
    }
  }
}
*/

export function main_test() {
    h.html(() => {
        h.head()
        h.body(() => {
            articletest()
        })
    })
}

function articletest() {
    h.class_("article_content")
    h.id("article_content")
    h.article(() => {
        h.h1("Building a blog")
        h.p(()=>{}, "When I set out to make my blog I wanted it to be:")
        h.ul(() => {
            h.li("fast")
            h.li("beautiful")
            h.li("Markdown")
            h.li("small")
            h.li("still be able to do scripting")
            h.li("no or fast builds")
        })
        h.h1("Failed attempts and alternatives investigated")
        h.p(() => {
            h.text("Especially the fast builds one was important. I remember trying to get Leptos to build with GH Pages and it was a disaster:")
            h.link("https://github.com/quilde/quilde.github.io/commits/main/?since=2024-01-29&until=2024-02-08")
        })
    
        h.p(() => {
            h.text("At first I thought about using")
            h.link("https://jekyllrb.com/", "Jekyll")
            h.line("as everyone seems to be using that")
        })
            h.callout_info(`Jekyll requires the following:
- Ruby version 2.5.0 or higher
- RubyGems
- GCC and Make`)
            
            h.line("yeah, no.")
            h.code(`
class MyClass {
  public static myValue: string;
  constructor(init: string) {
    this.myValue = init;
  }
}
import fs = require("fs");
module MyModule {
  export interface MyInterface extends Other {
    myProperty: any;
  }
}
declare magicNumber number;
myArray.forEach(() => { }); // fat arrow syntax`, "javascript")
    })
}
