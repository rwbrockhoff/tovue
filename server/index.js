const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios');
const session = require('express-session');
const massive = require('massive');
let sessionId = 46;
require('dotenv').config();

const app = express();
// app.use( express.static( `${__dirname}/../build` ) );

app.use(express.static(`${__dirname}/../dist`));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
}).catch(error => {
    console.log('Massive Error:', error)
})

//handle auth0//

app.get('/auth/callback', async (req, res) => {

    const { PROTOCOL } = process.env
    const payload = {
        client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.VUE_APP_AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${PROTOCOL}://${req.headers.host}/auth/callback`
    };

    //----get token---//

    let receiveToken = await axios.post(`https://${process.env.VUE_APP_AUTH0_DOMAIN}/oauth/token`, payload)

    //----exchange token---//

    let receiveUser = await axios.get(`https://${process.env.VUE_APP_AUTH0_DOMAIN}/userinfo?access_token=${receiveToken.data.access_token}`)

    //-----user data-----//
    req.session.user = receiveUser.data;
    req.session.user.id = sessionId;
    sessionId++

    res.redirect('/#/akt')

})

app.get('/api/user', (req, res) => {
    res.json({ user: req.session.user });
})

app.get('/api/getitems', (req, res) => {
    const dbInstance = req.app.get('db')
    const { sub } = req.session.user

    dbInstance.getitems(sub).then(lists => {
        res.status(200).send(lists)
    })
})

app.post('/api/addtodo', (req, res) => {
    const dbInstance = req.app.get('db')
    const { sub } = req.session.user;
    const { item, list } = req.body;

    dbInstance.addtodo([sub, item, list]).then(() => {
        res.sendStatus(200)
    })

})

app.delete('/api/:list/:id', (req, res) => {
    const dbInstance = req.app.get('db')
    const { sub } = req.session.user
    const { list, id } = req.params

    dbInstance.deletetodo([sub, id, list]).then(() => {
        res.sendStatus(200)
    })


})

app.delete('/api/deletelist', (req, res) => {
    const dbInstance = req.app.get('db')
    const { sub } = req.session.user
    const { listid } = req.query
    dbInstance.deletelist([sub, listid]).then(resp => {
        res.sendStatus(200)
    })
})

app.put('/api/completetodo', (req, res) => {
    const dbInstance = req.app.get('db')
    const { sub } = req.session.user
    const { item, id, list } = req.body
    dbInstance.completetodo([sub, item, list]).then(() => {
        dbInstance.deletetodo([sub, id, list]).then(() => {
            res.sendStatus(200)
        })
    })
})

app.put('/api/addlist', (req, res) => {
    const dbInstance = req.app.get('db')
    const { sub } = req.session.user
    const { newlist } = req.body
    dbInstance.addlist([sub, newlist, '{}', '{}']).then((response) => {
        res.status(200).send(response)
    })
})

const SERVER_PORT = process.env.SERVER_PORT || 3002;
app.listen(SERVER_PORT, () => {
    console.log(`Server listening: ${SERVER_PORT}`)
})