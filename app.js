// imports
const Koa = require('koa');
const KoaRouter = require('koa-router');
const BodyParser = require('koa-bodyparser');
const Database = require('./database'); 
const { Mongoose } = require('mongoose');
const json = require('koa-json');
const R = require('ramda');


Database.initDB();


// middleware
const port = 3000;
const app = new Koa();
app.use(json());
const router = new KoaRouter();
app.use(BodyParser());




// routes
router.get('/users', read);
router.post('/user', add);
router.patch('/user/:id', update);
router.delete('/user/:id', remove);

// read function
async function read(ctx) {
    // ctx.body = data;
    const res = await Database.User.find({});

   

    ctx.body = res.map((data)=>{

        const{ id, firstname, lastname, address, age, contact } = data;
        return {
           id,
           firstname,
           lastname,
           address,
           age,
           contact

        }
    });

  
    ctx.status  = 200;
}

  // insert function
async function add(ctx) {
    
    var user = ctx.request.body;

    try {
        const res = await Database.User.create(user)
    } catch(error) {
        console.error(error)
        // handle the error
    }
    ctx.body = "New user added"

}

// update function
async function update(ctx) {
    let {firstname, lastname, age, address, contact} = ctx.request.body;

    const id = ctx.params.id;


  
    try {
        await Database.User.findOneAndUpdate({
            id
        }, { 
            id,
            firstname,
            lastname,
            age,
            address,
            contact,
        },{
            upsert:false,
            new:true
        });
      
     ctx.body = "User Updated";
       
    } catch(error) {
        console.error(error)
        // handle the error
    }
 
     
        
      
    
}

// delete function
async function remove(ctx) {
 
    const id = ctx.params.id;
   
 
    
    try {
        const res = await Database.User.deleteOne({
            id
        });
        ctx.body = "User Deleted"
    } catch(error) {
        console.error(error)
        // handle the error
    }
 
    
    
}



app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log('Server running'));