const http = require("http");
const PORT = 3000;

const { routesHandler } = require("./routes");

const app = http.createServer(routesHandler);

app.listen(PORT, () => {
  console.log("Server started on PORT: ", PORT);
});
