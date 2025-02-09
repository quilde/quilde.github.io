---
styles: 
  - id.css
title: "Indexdiachronica"
description: foo bar baz
---

<div id="myheader"></div>
<a href="https://github.com/quilde/indexdiachronica" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:var(--highlight-dark); color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>


<section id ="hero">
            <div>
                <h1>
                    The <span class="nooutline">Index <span class="oldstyle">Diachronica</span></span> Database Project rebooted
                </h1>
            </div>
            <div id = "demo">
                <h2>Small demo:</h2>
            </div> 
</section>      

<article class="article_content"  id="article_content">

![index diachronica badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fquilde.github.io%2Findexdiachronica%2Findex_json%2Fafroasiatic.json&query=%24.change_sets%5B%3A1%5D.to&logo=json&logoColor=8495f9&label=Index%20Diachronica%20lang%3A
)
![hi mom badge](https://img.shields.io/badge/hi-mom-blue)
![some sounds](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fquilde.github.io%2Findexdiachronica%2Findex_json%2Fafroasiatic.json&query=%24.change_sets%5B%3A1%5D.changes%5B%3A1%5D.before&logo=json&logoColor=8495f9&label=some%20sounds%20from%20Index%20Diachronica%3A
)

![Index Diachronica flyer](https://github.com/quilde/indexdiachronica/blob/main/publicity/flyer.PNG?raw=true)

## The story so far

The Index Diachronica is a giant catalog of [sound changes](https://en.wikipedia.org/wiki/Sound_change) 
It is hosted here: [Index](https://chridd.nfshost.com/diachronica/) 

@amundo and @man-in-space had the idea to convert this document into a database of json files, because then the rules are data, and we can do all kinds of neat things with them. 

However there has been no activity on the project since 8 years. So I decided to fork the project and actually do it for real.

Then in July 24 I released the first usable version.

## Roadmap
- [x] July: release v0.1.0 
- [x] till September: decide on format 
- [ ] currently: readd sources, make families Glottolog-compliant
- [ ] after that: start checking the rules, fix broken stuff and search new sound changes
 
## Get Involved!
We're just getting started. Please join us at https://github.com/quilde/indexdiachronica/discussions/22

To see what is already possible, have a look at the demo search tool:

<a href="../../indexdiachronica/index.html">
    <button type="button" >Visit Demo Search Tool</button> 
</a>

</article>

<script type="module">
    import { reactive, html, watch} from 'https://esm.sh/@arrow-js/core';

    const i = (text) => {
        return html`
            <i>${text}</i>
        `
    }
    
    const badge = () => {
        return html`
            <img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fquilde.github.io%2Findexdiachronica%2Findex_json%2Fafroasiatic.json&query=%24.change_sets%5B%3A1%5D.to&style=flat-square&logo=json&logoColor=8495f9&label=Index%20Diachronica%20lang%3A">
        `
    }
        
    const response = await fetch("https://quilde.github.io/indexdiachronica/index_json/afroasiatic.json");
    const afroasiatic = await response.json();
    const app = document.getElementById('demo');
    const data = reactive({
        value: 'a'
    });
    data.$on('value', (value) => {
        
        console.log(`data.value changed to ${value}`)
    })
    const template = html
        `
        ${demo()}
        
        `
    
    
    template(app);
    
    function demo() {
        return html`
        
        <input type="text" id="searchbar" @change="${e => { data.value = e.target.value; demo()}}" value="a">
        <i>try changing the input text to "i" or "q" or "j" and hit enter</i>
        <div>
            <code>
            ${() => render_changeset(afroasiatic.change_sets[25].changes, data.value )}
            </code>
        </div>
        
        `
    }

    function render_changeset(items, search) {
      return html` 
      <div class="rules">
    <div class="dropdown-list" >
      ${() =>
          items.filter(
                    (item) => item.before.includes(search) || item.after.includes(search) ? true : false
                  ).map(
            (item) =>
              html` <div class="rule">
              ${ `<span>${item.before}</span> <span class="hljs-keyword">></span> ${item.after} ${item.env ? '<span class="hljs-keyword">/ </span>' + item.env : ''}` }
              <div>${() =>
                  item.notes.map(
                    (item) =>
                      html` <i>
                      ${item}
                     </i>`
                  )
                }</div>
            </div>`
          )}
    </div>
  </div>`
    }
    
</script>