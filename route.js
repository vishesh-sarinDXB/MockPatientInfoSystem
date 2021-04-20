const auth = require('./api/auth.js');
const pat = require('./api/pat.js');
const pages = require('./api/pages.js');
const express = require('express');
const helmet = require("helmet");

module.exports = function(app){
    app.disable('x-powered-by');
    app.use(helmet());
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.contentSecurityPolicy({directives:{defaultSrc:["'self'"], frameAncestors: ["'none'"], formAction: ["'self'"]}}));
    app.use(express.json());
    app.get('/robots.txt', async function (req, res) {res.type('text/plain'); res.send("User-agent: *\nDisallow: /");});
    app.get('/sitemap.xml', async function(req, res){
        let xml_content = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          '    <loc>http://www.localhost:5000/</loc>',
          '    <lastmod>2021-03-27</lastmod>',
          '  </url>',
          '</urlset>'
        ]
        res.set('Content-Type', 'text/xml')
        res.send(xml_content.join('\n'))
      })
    app.get('/', pages.homePage);
    app.get('/login', pages.loginPage);
    app.get('/login/:identification/:pswd', auth.login);
    app.get('/logout', pages.logoutPage);
    app.get('/logout/:identification', auth.logout);
    app.get('/readPatient', pages.readPatientPage);
    app.get('/readPatient/:identification/:patID', pat.readPatient);
    app.get('/updatePatient', pages.updatePatientPage);
    app.get('/updatePatient/:identification/:patID', pat.updatePatient);
    app.get('/newPatient', pages.newPatientPage);
    app.get('/newPatient/:identification', pat.newPatient);

}