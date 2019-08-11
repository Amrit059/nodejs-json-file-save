import TYPES from './types';
import 'reflect-metadata';
import { Container } from 'inversify';
import { RegistrableController } from '../controllers/registerable.controller';
import { FileController } from '../controllers/file.controller';
import { FileService, FileServiceImp } from '../services/file.service';



/* container contain all services,repository and http */
const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(FileController);
container.bind<FileService>(TYPES.FileService).to(FileServiceImp);

export default container;
