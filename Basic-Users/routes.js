const fs = require("fs");

const capitalizeWord = (username) => {
    const capitalizeWord = username.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizeWord.join(" ");
};

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/create-user") {
        html_body = `
        <html> 
            <head>
                <title> Create User Here </title>
            </head>
            <body>
            <form action ='/got-message' method="POST">
                    <input type='text' name='username' placeholder='Add User'>
                    <button type='submit'> Submit </button>
                </form>
            </body>
        </html>
        `;
        res.write(html_body);
        res.end();
    } else if (url === "/got-message" && method == "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        return req.on("end", () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1].split("+");
            const goodMessage = capitalizeWord(message);

            fs.appendFile("message.txt", goodMessage + "\n", (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    } else if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        html_body = `
        <html> 
            <head>
                <title> Hello </title>
            </head>
            <body>
            <h1> Greeting from Desmond! </h1>
            <h3> Click on the below link to create some users </h3>
            <a href="http://localhost:3000/create-user">
                    <button type='submit'> Create User </button>
                </a>
                <a href="http://localhost:3000/users">
                <button type='submit'> Show Users </button>
            </a>
            </body>
        </html>
        `;
        res.write(html_body);
        res.end();
    } else if (url === "/users") {
        const users = fs.readFileSync("message.txt", "utf-8");
        const usersList = users
            .split("\n")
            .filter((user) => user.trim() !== "");
        list_body = ``;
        if (usersList.length > 0) {
            list_body = `
            <h3> Users List </h3>
            <ul> 
                ${usersList.map((user) => `<li> ${user} </li>`).join("")}
            </ul>
            `;
        }
        html_body = `
        <html>
            <body> 
                ${list_body}
                <a href="http://localhost:3000/create-user">
                    <button type='submit'>Create User</button>
                </a>

                <a href="http://localhost:3000/">
                    <button type='submit'>Go Home</button>
                </a>
            </body>
        </html>
        `;
        res.write(html_body);
        res.end();
    }
};

module.exports = requestHandler;
