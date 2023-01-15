"use strict";
const express = require('express');
const app = express();
const port = 3000;
const resp = {
    item: [{
            title: "Hello world!",
            background_color: "#CCCCCC"
        }]
};
app.get('/', (req, res) => {
    res.send(JSON.stringify(resp));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map