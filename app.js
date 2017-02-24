var express = require("express")
var app = express();

app.use(express.static("dist", {"index": "index.html"}))
app.listen(7777);