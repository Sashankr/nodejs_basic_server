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
                <h1>Admin Dashboard</h2>
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
  }
};

module.exports = {
  routesHandler,
};
