const express=require("express");
const app=express();
const certificates=require('../models/certificate');
const decoding=require('../JWT/decoding');
const download=require('../download/downloading');

app.get("/certificates/:id",(req,res)=>{
    //Fetch all certificate template of that tutor
    parameter=req.params.id;
    certificates.findAll({
        where: {
          customer_id:parameter
        },
        order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(entries){
        res.send(entries)   
    }).catch(function(){
        console.log('Not found!');
        res.sendStatus(404);
    })
})

//Hit this route when user clicks on save button
app.post("/certificate/create",async(req,res)=>{
    //Body of post request will contain JWT token
    //token={user: "tutor",customer_id: "12",certificate_id: "12" OR "new",name: "",operations:""}
    token=req.body.token;
    parameters=decoding(token);

    if(parameters.certificate_id=="new"){
        //Create new template
        //Store that template info in database
        const template = await certificates.create({customer_id:parameters.customer_id,name:parameters.name,operations:parameters.operations,image_url:parameters.image_url})
        .then(()=>res.sendStatus(200))
        .catch(()=>res.send("Error"))
    }else{
        //Edit old template
        res.redirect(`/certificate/edit/${parameters.certificate_id}`)
    }
})

app.get("/certificate/edit/:id",(req,res)=>{
    //Modified at of that particualar id will be updated, operations column will change
    parameter=req.params.id
    //Updating certificate table
    // certificates.findByPk(parameter)
    // .then((certi)=>{
    //     //Check if record exists in db
    //     if (certi) {
    //         certi.update({
    //             operations:"Changes"
    //         })
    //         .then(()=>{
    res.sendFile("/index.html", { root: "../Certificate_Editor/src/edit" })
    //         })
    //     }
    // })
    // .catch(()=>{
    //     console.log("Error");
    //     res.send("Error");
    // })

})

app.post("/certificate/delete",async(req,res)=>{
    //Body of post request will contain certificate id and tutor id
    //Fetch that certificate_id wala row from database
    //If exists then delete
    parameters=req.body;
    const template = await certificates.destroy({
        where: {
            certificate_id:parameters.certificate_id
        }
    }).then(()=>res.sendStatus(200))
    .catch(()=>res.send("Error"))
})

app.post("/certificate/tojpg",(req,res)=>{
    download('https://www.google.com/images/srpr/logo3w.png', 'google.jpg', function(){
        console.log('done');
        res.sendStatus(200);
    });
    res.send("Error");
})

app.post("/certificate/topdf",(req,res)=>{
    download('https://www.google.com/images/srpr/logo3w.png', 'google.pdf', function(){
        console.log('done');
        res.sendStatus(200);
    });
    res.sendStatus("Error");
})

module.exports=app;