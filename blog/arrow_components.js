

import { reactive, html, } from 'https://esm.sh/@arrow-js/core';

const root = document.getElementById('myheader');

const header =
    html`
        <header>
            <div id="logo">
                <img src="/quilde.github.io/Unbenannt.png"></img>
                <div>essë studios</div>
            </div>
            <nav>
                <a href="/quilde.github.io/blog/posts/">blog/posts</a>
                <a href="/quilde.github.io/blog/projects/indexdiachronica.html">blog/projects</a>
                <a href="/quilde.github.io/indexdiachronica/">index diachronica</a>
            </nav>
        </header>
    `

header(root)

const postlist =
    html`
        <nav>
          <h1>Posts</h1>
          <div>
            ${() => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // Typical action to be performed when the document is ready:
                    xmldoc = xhttp.responseText;

                    txt = "";
                    x = xmlDoc.getElementsByTagName("ARTIST");
                    for (i = 0; i < x.length; i++) {
                        html` ${x[i].childNodes[0].nodeValue }"`
                    }
                }
            };
            xhttp.open("GET", "https://www.w3schools.com/xml/cd_catalog.xml", true);
            xhttp.send();

        }
        }
          </div>
          <ul class="post"><a href="posts/">post 0</a></ul>
          <ul class="post"><a href="posts/">post 1</a></ul>
          <ul class="post"><a href="posts">post 2</a></ul>
            
    </nav>
`
const root2 = document.getElementById('postlist');
postlist(root2)