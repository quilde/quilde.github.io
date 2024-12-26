

import { reactive, html, watch } from 'https://esm.sh/@arrow-js/core';

import { animate, scroll, spring, easeInOut} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm"



const root = document.getElementById('myheader');



const header =
    html`
        <header>
            
            <a id="logo" href="https://quilde.github.io/">
                <img src="https://quilde.github.io/Unbenannt.png"></img>
                <div>essë studios</div>
            </a>
            <nav>
                <a href="/quilde.github.io/blog/">blog/posts</a>
                <a href="/quilde.github.io/blog/projects/indexdiachronica.html">blog/projects</a>
                <a href="/quilde.github.io/indexdiachronica/">index diachronica</a>
            </nav>
        </header>
        
    `

header(root)
const hi = function() {
    console.log("hi")
}
const scrolltotop = html`
<div id="scrolltotop">
    <i data-lucide="menu"></i>
    <button id="sttinner" class="centered" onclick="const el = document.getElementById('article_content'); el.scrollIntoView({ behavior: 'smooth', block: 'start' });">
        <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="18" pathLength="1" style="stroke: var(--highlight-dark); fill: transparent; stroke-width: 2; stroke-linecap: round;" stroke-dashoffset="0px" stroke-dasharray="0.061224489795918366px 1px"></circle>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--highlight-dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-up">
            <path d="M8 6L12 2L16 6"/><path d="M12 2V22"/>
        </svg>
</button>
</div>

`
const footer = html`
<div id="footer">Made with ❤</div>
`

const article = document.getElementById('article_content');
scrolltotop(article)
footer(article)

var test = reactive([
    1
]);


const getArray = async function () {
    try {
        const response = await fetch("test.json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        console.log(json[0]);
        test = json
    } catch (error) {
        console.error(error.message);

    }
}

const postlist =
    html`
        <nav>
          <h1>Posts</h1>
          <div>
            
          <ul class="post"><a href="posts/indexdiachronica.html">Index Diachronica</ul>
          <ul class="post"><a href="posts/test.html">test</ul>
          <ul class="post"><a href="posts/stack.html">Building a blog</ul>
        </div>
            
    </nav>
`

getArray()
watch(postlist)
const root2 = document.getElementById('postlist');
postlist(root2)
const powerIn = (progress) => progress * progress


const animation = animate(
    "circle", 
    { pathLength: [0, 1] },
    
{ease: "easeInOut", duration: 1000.0}
    
)


scroll(animation)