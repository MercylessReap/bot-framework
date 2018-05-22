const express = require('express')
    , router = express.Router()
    , passport = require('passport')
    , api = require(rootDir+'/lib/api/api');

    router.get('/',ensureAuthenticated,(req,res)=>{
      let users,perm;
      api.getUsers()
      .then((response)=>{
        users = response.data;return api.getPermissions()
      }).then((response)=>{
        perm=response.data; return api.getDepartments()
      }).then((response)=>{
        res.render('pages/users/index',{
          title:'All Users - Dimension Data Bot Portal',
          users:users,
          perms:perm,
          departments:response.data
        })
      }).catch((error)=>res.send(error.response))

    })
    //Post Requests
    router.post('/',(req, res) =>{


    })

    router.get('/:id/',ensureAuthenticated,(req, res) =>{
        let users,perm, depts;
        api.getUser(req.params.id)
        .then((response)=>{
          users = response.data
          return api.getPermissions()
        }).then((response)=>{
          for(i=0; i<response.data.length; i++){
            if(req.params.id === response.data[i].userId){
              perm = response.data[i];
            }
          }
          return api.getDepartments()
        }).then((response)=>{
          depts = response.data
          res.render('pages/users/view',{
            title: `${users.name} | Dimension Data Bot Portal`,
            users:users,
            perms:perm,
            dept:depts
          })
        }).catch((error)=>res.send(error.response))
    });

    router.put('/:id/',ensureAuthenticated,(req, res) =>{


    });

    router.delete('/:id/',ensureAuthenticated,(req,res)=>{

    })

module.exports = router
