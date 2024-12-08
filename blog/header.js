

import { reactive, html, } from 'https://esm.sh/@arrow-js/core';

const root = document.getElementById('myheader');

const header =  
    html`
        <header>
            <div id="logo">
                <img src="/quilde.github.io/blog/Unbenannt.png"></img>
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
            <ul class="post"><a href="posts/">post 0</a></ul>
            <ul class="post"><a href="posts/">post 1</a></ul>
            <ul class="post"><a href="posts">post 2</a></ul>
            
    </nav>
`
const root2 = document.getElementById('postlist');
postlist(root2)