const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello this is a Xneo Fit API by Aman.");
});

app.listen(3000, () => {
	console.log("server started at port 3000...");
});
