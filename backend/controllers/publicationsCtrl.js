//import 
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils')

// Constants
const TITLE_LIMIT   = 2;
const CONTENT_LIMIT = 4;
const ITEMS_LIMIT   = 50;

//routes

module.exports = {
    createPublication: function(req, res){

    //recup de l'en-tête d'authentification  
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

     //params
        var title = req.body.title;
        var content = req.body.content;

        if (title == null || content == null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (title.length <= 2 || content.length <= 4){
            return res.status(400).json({'error': 'invalid parameters'});
        }

        asyncLib.waterfall([
            function(done) {
              models.User.findOne({
                where: { id: userId }
              })
              .then(function(userFound) {
                done(null, userFound);
              })
              .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to verify user' });
              });
            },
            function(userFound, done) {
              if(userFound) {
                models.Publication.create({
                  title  : title,
                  content: content,
                  likes  : 0,
                  UserId : userFound.id
                })
                .then(function(newPublication) {
                  done(newPublication);
                });
              } else {
                res.status(404).json({ 'error': 'user not found' });
              }
            },
          ], function(newPublication) {
            if (newPublication) {
              return res.status(201).json(newPublication);
            } else {
              return res.status(500).json({ 'error': 'cannot post message' });
            }
          });
        },

    listPublications: function(req, res){
        
        var fields  = req.query.fields;
        var limit   = parseInt(req.query.limit);
        var offset  = parseInt(req.query.offset);
        var order   = req.query.order;

        if (limit > 50) {
            limit = 50;
        }

        models.Publication.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username' ]
            }]
        })
        .then(function(publications) {
          if (publications) {
              res.status(200).json(publications);
          } else {
              res.status(404).json({ "error": "no publications found" });
          }
        })
        .catch(function(err) {
        console.log(err);
        res.status(500).json({ "error": "invalid fields" });
        });
    },
};

