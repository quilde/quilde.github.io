
use leptos::{error::Result, *};
use serde::{Deserialize, Serialize};

use thiserror::Error;

use pollster;
fn main() {
    mount_to_body(fetch_example )
}

#[derive(Debug, Serialize, Deserialize,Clone)]
struct Rule {
    before: Vec<String>,
    after: Vec<String>,
    env: String,
    notes: Vec<String>,
    status: String,
    tags: Vec<String>,
    name_type: Vec<String>,
}
#[derive(Debug, Serialize, Deserialize,Clone)]
struct ChangeSet {
    from: String,
    to: String,
    or_contr: String,
    src: String,
    notes: Vec<String>,
    changes: Vec<Rule>,
}
#[derive(Debug, Serialize, Deserialize,Clone)]
struct FamilySet {
    family: String,
    change_sets: Vec<ChangeSet>,
}

async fn fetch_sets(blabla: String) -> Result<FamilySet> {
    
        // make the request
        let res = reqwasm::http::Request::get(&format!(
            "https://quilde.github.io/indexdiachronica/index2/afroasiatic.json",
        ))
        .send()
        .await?
        // convert it to JSON
        .json::<FamilySet>()
        .await?;
        // extract the URL field for each cat

        Ok(res)
    
}

pub fn fetch_example() -> impl IntoView {
    let sets = create_local_resource(| | {"hi".to_string()},fetch_sets);
    
    let cats_view = move || {
        sets.and_then(|data| {
            data.change_sets.iter()
                .map(|s| {view! { <p>{&s.from} to {&s.to}</p> }})
                .collect_view()
        })
    };
    cats_view

}