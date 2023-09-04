const usersList = [];

const routesHandler = (req, res) => {
  const { url, method } = req;
  console.log(url, method);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head>
                <title>Admin Dashboard</title>
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
                  *{
                    font-family : 'Poppins', sans-serif;
                  }
                </style>
            </head>
            <body>
                <h1>Admin Dashboard</h1>
                <p>Create a user by typing a name below and submitting the form.</p>
                <form method="POST" action="/create-user">
                    <label for="username">Username</label>
                    <input type="text" name="username" required id="username"/>
                    <button type="submite">Submit</button>
                </form>
            </body>
        </html>
    `);
    return res.end();
  } else if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
    });
    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      const username = data.split("=")[1];
      usersList.push(username);
      console.log(usersList);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    const listOfUsers =
      "<ul>" + usersList.map((item) => `<li>${item}</li>`).join("") + "</ul>";

    res.write(`
          <html>
              <head>
                  <title>Admin Dashboard</title>
                  <style>
                  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
                    *{
                      font-family : 'Poppins', sans-serif;
                    }
                    li{
                      text-transform:capitalize;
                    }
                  </style>
              </head>
              <body>
                  <h1>Users List</h1>
                  <a href="/">Create New User</a>
                  <p>List of users created by admin</p>
                  <ol>
                  ${listOfUsers}
                  </ol>
              </body>
          </html>
      `);
    return res.end();
  }
};

module.exports = {
  routesHandler,
};
