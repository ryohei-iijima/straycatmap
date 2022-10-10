const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/foo', (req, res) => {
    res.sendFile(__dirname + '/data.json', (err) => {
        if(err) {
            res.sendStatus(400);
        } else {
            console.log('sending complated');
        }
    });
});

// api/bar へのGET・POSTリクエスト
router.route('/bar')
    .get((req, res) => {
        res.json(req.query);
    })
    .post((req, res) => {
        // 必須のデータ項目を、id,name,address として、受信データをチェック
        const nameAry = ['id', 'name', 'address'],
        failed = nameAry.some(v => !req.body[v]);

        if (failed) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });

// api/map へのGET・POSTリクエスト
router.route('/map')
    .get((req, res) => {
        res.send('Hello world!!');
    })
    .post((req, res) => {
        // 必須のデータ項目を、id,name,address として、受信データをチェック
        const nameAry = ['id', 'name', 'address'],
        failed = nameAry.some(v => !req.body[v]);

        if (failed) {
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });

module.exports = router;