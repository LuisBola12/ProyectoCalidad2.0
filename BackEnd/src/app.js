import express from 'express';
import config from './config';
import productsRoutes from './routes/seleMiracle.routes';
import cors from 'cors';

const app = express();

//Settings
app.set( 'port',config.port );

//Middlewares
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( productsRoutes );

export default app;