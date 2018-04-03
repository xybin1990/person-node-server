module.exports = function (app) {

    app.post("/api/per-app/count", function (req, res) {
        //
        console.log(req.body);
        res.json({
            test: '123456'
        });
    })
};