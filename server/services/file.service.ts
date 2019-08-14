import { Observable, from, of, Observer } from 'rxjs';
import 'reflect-metadata';
import { injectable } from 'inversify';
import { FileModel, ToDoListModel } from '../models/file.model';
const fs = require('fs');


export interface FileService {
    generateObjectId(id: number | null, entities: any[]): number;
    getDataFromFile(entityName: string, storagePath: string): Observable<FileModel>;
    createFileData(entities: FileModel, entityName: string, storagePath: string): Observable<FileModel>;
    updateFileData(entities: ToDoListModel, storagePath: string): Observable<FileModel>;
}

@injectable()
export class FileServiceImp implements FileService {

    constructor() {
    }


    generateObjectId(id: number | null, entities: any[]): number {
        if (!id && id == null) {
            id = 0;
        }
        while (entities.indexOf((e: any) => e.id === id)) {
            id++;
        }
        return id;
    }


    getDataFromFile(entityName: string, storagePath: string): Observable<any> {
        console.log(`name is ${entityName} and path is ${storagePath}`);
        return Observable.create(
            (observer: Observer<any>) => {
                fs.readFile(storagePath, (err: Error, content: any) => {
                    if (err) {
                        console.error(`Error loading entities '${entityName} from storage '${storagePath}:`);
                        observer.error({});
                    }
                    try {
                        const entities = JSON.parse(content.toString());
                        // console.log('content is', entities);
                        observer.next(entities);
                    } catch (err) {
                        console.error(`Error parsing entities '${entityName} from storage '${storagePath}:`);
                        console.error(err);
                        observer.error({});
                    }
                });
            });
    }

    createFileData(entities: FileModel, entityName: string, storagePath: string): Observable<FileModel> {
        console.log('final entity is', entities);
        return Observable.create(
            (observer: Observer<FileModel>) => {
                this.getDataFromFile(entityName, 'package.json').subscribe(
                    (result: any) => {
                        const newEntities = entities;
                        newEntities.time_stamp = new Date();
                        newEntities.author = result.author;
                        newEntities.version = result.version;
                        const finalPath: string = String(`${newEntities.author}.json`).trim();
                        console.log('finale path', finalPath);
                        fs.writeFile(finalPath,
                            JSON.stringify(newEntities, null, 2), (err: Error) => {
                                if (err) {
                                    console.error(`Error loading entities '${entityName} from storage '${storagePath}:`);
                                    observer.error(err);
                                }
                                observer.next(entities);
                            });
                    });
            });
    }

    updateFileData(entities: ToDoListModel, storagePath: string): Observable<FileModel> {
        console.log('final entity is', entities);
        let newEntities: FileModel;
        return Observable.create(
            (observer: Observer<FileModel>) => {
                this.getDataFromFile('ammy', 'AmritpalSingh.json').subscribe(
                    (result: FileModel) => {
                        newEntities = result;
                        console.log('inside before if newEntities is', newEntities);
                        for (const object of newEntities.to_do_list) {
                            if (object.id === object.id) {
                                object.text = entities.text;
                                console.log('inside if entity is', object);
                            } else {
                                entities.id = this.generateObjectId(entities.id, result.to_do_list);
                                newEntities.to_do_list.push(entities);
                                console.log('inside else newEntities is', newEntities);
                            }
                        }
                    });
                console.log('new etity is', newEntities);
                fs.writeFile(storagePath,
                    JSON.stringify(newEntities, null, 2), (err: Error) => {
                        if (err) {
                            console.error(`Error loading entities ammy from storage '${storagePath}:`);
                            observer.error(err);
                        }
                observer.next(newEntities);
                    });
            });
    }
}





