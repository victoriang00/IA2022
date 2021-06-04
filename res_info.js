import * as constants from "./constants.js";

document.title = "This is the new page title.";
var name = constants.file_name;
name = name.replace("_", " ");
document.title = name;
console.log(name);
console.log(constants.file_desc);
console.log(constants.file_url);

console.log("hello");
