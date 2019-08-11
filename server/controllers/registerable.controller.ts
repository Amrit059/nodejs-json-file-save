import * as express from 'express';
import 'reflect-metadata';

/* register the controllers just like booting file and main file  */
export interface RegistrableController {
    register(app: express.Application): void;
}
