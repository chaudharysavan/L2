const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

var port = 3000;
const myArgs = minimist( process.argv.slice(2));
if(myArgs.port != undefined)
    port = myArgs.port

console.log(port);

let HomeContent = "";
let RegistrationContent = "";
let projectContent = "";
let scriptContent = "";
let styleContent = "";
fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    HomeContent = home;
});
fs.readFile("registration.html", (err, Registration) => {
    if (err) {
        throw err;
    }
    RegistrationContent = Registration;
});
fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});
fs.readFile("script.js", (err, script) => {
    if (err) {
        throw err;
    }
    scriptContent = script;
});
fs.readFile("style.css", (err, style) => {
    if (err) {
        throw err;
    }
    styleContent = style;
});
http.createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "content-type": "text/html" });
//   **********savan chaudhary ***********
    switch (url) {
        // for projects.
        case "/project":
            response.write(projectContent);
            response.end();
            break;
            // for registrations.
        case "/registration":
            response.write(RegistrationContent);
            response.end();
            break;
            // for scripts. 
        case "/script":
            response.writeHeader(200, { "content-type": "text/js" });
            response.write(scriptContent);
            response.end();
            break;
            //  for styles. 
        case "/style":
            response.writeHeader(200, { "content-type": "text/css" });
            response.write(styleContent);
            response.end();
            break;
            //  for defaults..
        default:
            response.write(HomeContent);
            response.end();
            break;
    }
})
    .listen(port);

    