module.exports = function (app) {

    app.post("/api/count", function (req, res) {
        //
        console.log('/api/count');
        res.json({
            test: '123456'
        });
    })
};