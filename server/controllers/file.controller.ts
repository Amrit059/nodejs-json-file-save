import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { RegistrableController } from './registerable.controller';
import 'reflect-metadata';
import TYPES from '../configuration/types';
import * as express from 'express';
import { ROUTE_CONSTANTS } from '../constants/route.constants';
import { FileService } from '../services/file.service';


@injectable()
export class FileController implements RegistrableController {

    private fileService: FileService;

    constructor(@inject(TYPES.FileService) fileService: FileService) {
        this.fileService = fileService;
    }

    register(app: express.Application): void {
        console.log('Inside registered !');
        app.get(`${ROUTE_CONSTANTS.REST_API_ROUTE}file-list`,
            this.getAuthorToDoList.bind(this));
        app.get(`${ROUTE_CONSTANTS.REST_API_ROUTE}file/:id`,
            this.getAuthorToDoDetail.bind(this));
        app.post(`${ROUTE_CONSTANTS.REST_API_ROUTE}file`,
            this.createAuthorToDo.bind(this));
        app.put(`${ROUTE_CONSTANTS.REST_API_ROUTE}file`,
            this.updateAuthorToDoDetail.bind(this));
        app.delete(`${ROUTE_CONSTANTS.REST_API_ROUTE}file/:id`,
            this.deleteAuthorToDoDetail.bind(this));

    }

    public createAuthorToDo(req: Request, res: Response, next: NextFunction): void {
        console.log('Inside createAuthorToDo !');
        const entites: any = [];
        const obj = req.body;
        for (const object of obj.to_do_list) {
            object.id = this.fileService.generateObjectId(object.id, entites);
            entites.push(object);
        }
        console.log('object is', entites);
        obj.to_do_list = entites;
        this.fileService.createFileData(obj, 'amritpal', 'AmritpalSingh.json').subscribe(
            (result: any) => {
                console.log('result is ', result);
                res.status(201).send('file is created');
            }, (err: Error) => {
                res.status(204).send(err);
            });
    }

    public getAuthorToDoList(req: Request, res: Response, next: NextFunction): void {
        console.log('Inside getAuthorToDoList !');
        this.fileService.getDataFromFile('amritpal', 'AmritpalSingh.json').subscribe(
            (result: any) => {
                // console.log('result is ', result);
                res.status(200).send(result ? result : {});
            }, (err: Error) => {
                res.status(204).send(err);
            });
    }

    public getAuthorToDoDetail(req: Request, res: Response, next: NextFunction): void {
        console.log('Inside getAuthorToDoDetail !');
        const ids: number = req.params.id;

        this.fileService.getDataFromFile('amritpal', 'AmritpalSingh.json').subscribe(
            (result: any) => {
                result.to_do_list.find((e: any) =>  console.log(e.id));
                res.status(200).send(result ? result : {});
            }, (err: Error) => {
                res.status(204).send(err);
            });
    }

    public updateAuthorToDoDetail(req: Request, res: Response, next: NextFunction): void {
        console.log('Inside updateAuthorToDoDetail !');
        const obj = req.body;
        this.fileService.updateFileData(obj, 'AmritpalSingh.json').subscribe(
            (result: any) => {
                console.log('result is ', result);
                res.status(201).send('file is updated');
            }, (err: Error) => {
                res.status(204).send(err);
            });
    }

    public deleteAuthorToDoDetail(req: Request, res: Response, next: NextFunction): void {
        console.log('Inside deleteAuthorToDoDetail !');
        const entites: any[] = [];
        const index = entites.indexOf((e: any) => e.id === +req.params.id);
        if (index === -1) {
            res.status(400).send({
                'error': `No object found with the given ID ${req.params.id}`
            });
            return;
        }
        entites.splice(index, 1);
        this.fileService.createFileData(entites, 'amritpal', 'AmritpalSingh.json').subscribe(
            (result: any) => {
                console.log('result is ', result);
                res.status(200).send(result ? result : {});
            }, (err: Error) => {
                res.status(204).send(err);
            });
    }

}
