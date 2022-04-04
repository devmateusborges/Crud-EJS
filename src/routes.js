const express = require('express') // biblioteca servidor
const routes = express.Router(); // rotas
//body parser
const  bodyParser=require('body-parser'); 

//conseguir pegar items da dom 
const urlencodedParser  = bodyParser . urlencoded ( {  extended : false } ) 

//banco de dados
const bd = require('./db/config').pool;

//--------select inicial
routes.get('/',urlencodedParser,function(req,res){

    bd.getConnection((error, conn) => {
        conn.query("select * from crud ",
            (error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).render('index',{result: results} )
            })

    })
    
    

});

//-------------select para editar
routes.get('/supdate/:id',urlencodedParser,function(req,res){

    var sql = "select * from crud where ID = ?"
    var params = [req.params.id]
   bd.getConnection((error, conn) => {
       conn.query(sql,params,
           (error, results, field) => {

               conn.release();
               if (error) {
                   return res.status(500).send({
                       error: error,
                       reponse: null
                   });

               }
               res.status(201).render('update',{supdate: results} )
           })

   })
   
   

});
routes.post('/update/:id',urlencodedParser,function(req,res){
  var sql = "UPDATE crud SET jt_codigo = ?, jt_nome = ?, jt_data_nascimento = ?, ativo = ? WHERE ID = ?;"
  let data = new Date(req.body.date)
  var params = [req.body.codigo,req.body.nome,data,req.body.ativo,req.params.id]
    bd.getConnection((error, conn) => {
        conn.query(sql,params,
            (error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).redirect('/')
            })

    })
    
    

});
//_________________________

//----------------cadastro dados
routes.post('/cadastro',urlencodedParser,function(req,res){
    var sql ="INSERT INTO crud (jt_codigo, jt_nome, jt_data_nascimento, ativo) VALUES (?,?,?,?); "
    let data = new Date(req.body.date)
    var params = [req.body.codigo,req.body.nome,data,req.body.ativo]
   bd.getConnection((error, conn) => {
        conn.query(sql,params,(error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).redirect('/')
            })

    })
});

//-------------------------------------Delete 
routes.delete('/deletecod/:codigo',urlencodedParser,function(req,res){
    var sql ="DELETE FROM crud where jt_codigo = ? "
    var params = [req.params.codigo]
    bd.getConnection((error, conn) => {
        conn.query(sql,params,(error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.status(201).send("deletado com sucesso")
            })

    })
});
//delete por id Padrão get ultilizado 
routes.get('/deleteid/:id',urlencodedParser,function(req,res){
    var sql ="DELETE FROM crud where ID = ? "
    var params = [req.params.id]
    bd.getConnection((error, conn) => {
        conn.query(sql,params,(error, results, field) => {

                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        reponse: null
                    });

                }
                res.redirect('/')
            })

    })
});

//-----------Pesquisa
routes.get('/:pesquisar',urlencodedParser,function(req,res){

    var sql = "select * from crud where jt_codigo = ? OR  jt_nome = ?"
    var params = [req.params.pesquisar,req.params.pesquisar]
   bd.getConnection((error, conn) => {
       conn.query(sql,params,
           (error, results, field) => {

               conn.release();
               if (error) {
                   return res.status(500).send({
                       error: error,
                       reponse: null
                   });

               }
               res.status(201).redirect('/')
           })

   })
   
   

});


//exportar rotas
module.exports = routes;