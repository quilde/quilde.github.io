---
title: Rendering
description: Does it work?
---


<div id="myheader"></div>

<article class="article_content" id="article_content">

## More than text and rectangles



## On Triangles

You can render everything as triangles. But you have to be careful, especially when it comes to antialiasing.

[Egui](https://www.egui.rs/#demo) does this very nicely. Have a look at "Tesselation Test". 

[Rive](https://rive.app/blog/rive-renderer-now-open-source-and-available-on-all-platforms) also uses a similar technique. 

I really like this technique, because everything uses the same base system: triangles.
That also makes it relatively easy to create custom rendering in egui; you just have to tesselate your shape and your good to go.

Issues:
- Blend modes
- rendering should be at least a tree if not a dag
- need to cache shapes
- no creating geometry on the fly (animations!)

## From the data

> [!QUOTE] Not so long ago, before programmable shaders, it was necessary to cache parts of a UI in textures (CoreAnimation for example does this) to get good performance. Now we have extremely fast GPUs and such caching is not necessary to achieve good performance. In fact if enough is animating, lots of texture caching can hinder performance, since the caches need to be updated so often. Plus, the textures consume a fair amount of memory, and when you have an unbounded node-graph like Audulus, that memory usage would be unbounded. And what resolution do you pick for those textures?
> ⸺ Taylor Holliday



## A single shader

rui


Uber shaders

## Custom rendering and 

The moment you open yourself up for custom rendering everything kind of falls apart. 

> [!NOTE] Essës First Law of Rendering
> In general, the more specialized your implementation is, the faster it can run.


## Render Graphs

https://poniesandlight.co.uk/reflect/island_rendergraph_1/

goes against instancing

## A dissatisfying answer




</article>