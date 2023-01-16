"use strict";
const express = require('express');
const app = express();
const port = 3000;
const resp = {
    item: [{
            title: "Hello world!",
            background_color: "#CCCCCC"
        }, {
            title: "Hello dog!",
            background_color: "#888888"
        }]
};
app.post('/getMainScreen', (req, res) => {
    console.log(req);
    res.json(resp);
});
app.get('/getForSelectGrade', (req, res) => {
    res.json({ item: ["10", "11", "12"] });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map