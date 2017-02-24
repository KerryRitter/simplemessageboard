var express = require("express")
var app = express();

app.use(express.static("dist", {"index": "index.html"}))

app.listen(process.env.PORT || 7777);