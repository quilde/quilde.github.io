
import * as h from "./elements.js"

export function main_index() {
    h.html(()=>{
        h.head()
        h.body(()=>{
            h.h1("Esses Webpage")
            
            h.main(()=>{
                h.h2("Blog")
            })
        })
    })
}
