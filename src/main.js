
import {main_test} from "./test.js"
import {main_index} from "./indexpage.js"
import {get_html_and_clear, init} from "./elements.js"


const output_path = `./output/`
init()
page("test", main_test())
page("index", main_index())


function page(name, data) {  
  //Deno.writeTextFile(`./${name}.html`, convert_to_html(data, ""));
  let h = get_html_and_clear()
  Deno.writeTextFile(output_path + `${name}.html`, h);
  console.log(h)
}

function convert_to_html(data, indent) {
  if (data.tag === "p") {
    return indent + "<p>" + data.text + "<p>\n"
  }
  if (data.tag === "title") {
    return indent + "<title>" + data.text + "<title>\n"
  }
  
  var s = indent
  s += data.tag === "html" ? "<!DOCTYPE html>\n" : `<${data.tag}`
  if (data?.attrs?.id != undefined) {
    s += " id=\"" + data.attrs.id + "\""
  }
  
  s += ">\n"
  if (data.inner == undefined) {
    s += data.text
  } else {
    for (let x of data.inner) {
      //s += indent
      s += convert_to_html(x, indent + "  ")
    }
  }
  s += indent + `</${data.tag}>\n`
  return s

  
}

/*
function rss() {
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
}
*/

