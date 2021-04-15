//Importing dependencies
const express=require('express');
const bodyParser=require('body-parser');
const routes=require('./src/routes/routes');
const {PORT}=require('./env');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./src/db/sql');

//Creating instance of express
const app=express();

//Middleware
app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Swagger initialization
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Certificate',
            description: 'Certificate Documentation',
            contact: {
                name: "Priyanka Asrani",
            },
            servers: ["http://localhost:6070"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Swagger definition
/**
 * @swagger
 * /certificates/{id}:
 *  get:
 *      description: List of all certificate templates of a tutor
 *      tags:
 *      - certificates
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Tutor id
 *        required: true
 *        type: int
 *        example: 12
 *      responses:
 *         '200':
 *              description: List of all certificate templates of a tutor
 */

/**
 * @swagger
 * /certificate/create:
 *  post:
 *    tags:
 *      - certificate
 *    summary: Making new certificate template
 *    parameters:
 *      - in: body
 *        name: body
 *        description: JWT token
 *        required: true
 *        example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidHV0b3IiLCJjdXN0b21lcl9pZCI6MTIsImNlcnRpZmljYXRlX2lkIjoibmV3In0.74zmIBZFalcb5si3vx98dQJv_a35pB3rGpu-H0nu78M"}
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /certificate/delete:
 *  post:
 *    tags:
 *      - certificate
 *    summary: Deleting certificate template
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Deleting certificate template
 *        required: true
 *        example: {"customer_id":12,"certificate_id":1}
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /certificates/edit/{id}:
 *  get:
 *      description: Editing a certificate template of a tutor
 *      tags:
 *      - certificates
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Certificate id
 *        required: true
 *        type: int
 *        example: 1
 *      responses:
 *         '200':
 *              description: List of all certificate templates of a tutor
 */

// /certificate/tojpg
// /certificate/topdf

//Using routes
app.use('/', routes)

//Server started
app.listen(6070,()=>{
    console.log('Server Started');
});