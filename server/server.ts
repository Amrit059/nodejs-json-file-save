import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import * as cors from 'cors';
import { RegistrableController } from './controllers/registerable.controller';
import TYPES from './configuration/types';
import container from './configuration/container';
import 'reflect-metadata';
const app = express();

console.log('after app express');
const HOST_CONFIG: any = config.get('appConfig.hostConfig');
console.log('after HOST_CONFIG');
const PORT_NO = HOST_CONFIG.port;

console.log(`HOST_CONFIG PORT NO IS ${PORT_NO}`);

app.set('port', PORT_NO);

console.log(`PORT NO IS ${PORT_NO}`);

app.use(bodyParser.json());

console.log('after bodypaser use');

app.use(bodyParser.urlencoded({ extended: true }));

console.log('before cors use');

app.use(cors());

/* grabs the Controller from IoC container and registers all the endpoints */
console.log('before controller');
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
console.log('before For each controller');

controllers.forEach(controller => controller.register(app));
console.log('after For each controller and before server request');

app.get('/', (request: Request, response: Response, next: NextFunction) => {
  response.send('Server is working perfectly');
});


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('inside error handller');
  console.log('error is ');
  console.log(err);
  res.status(500).json({ error: 'Error Handler' });
});

app.listen(app.get('port'), () => {
  console.log(('App is running at http://localhost:%d in %s mode'),
    app.get('port'));
  console.log('Press CTRL-C to stop\n');
});


export default app;
