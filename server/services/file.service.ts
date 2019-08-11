import { Observable, from, of, Observer } from 'rxjs';
import 'reflect-metadata';
import { injectable } from 'inversify';
const fs = require('fs');


export interface FileService {
    generateObjectId(id: number | null, entities: any[]): number;
    getDataFromFile(entityName: string, storagePath: string): Observable<any>;
    createFileData(entities: any, entityName: string, storagePath: string): Observable<any>;
    updateFileData(entities: any, storagePath: string): Observable<any>;
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

    createFileData(entities: any, entityName: string, storagePath: string): Observable<any> {
        console.log('final entity is', entities);
        return Observable.create(
            (observer: Observer<any>) => {
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

    updateFileData(entities: any, storagePath: string): Observable<any> {
        console.log('final entity is', entities);
        return Observable.create(
            (observer: Observer<any>) => {
                this.getDataFromFile('ammy', 'AmritpalSingh.json').subscribe(
                    (result: any) => {
                        const newEntities = result;
                        for (const object of newEntities.to_do_list) {
                            if (entities.id && object.id === entities.id ) {
                                object.text = entities.text;
                            } else {
                                newEntities.to_do_list.push(entities);
                                object.id = this.generateObjectId(object.id, newEntities.to_do_list);
                            }
                        }
                        observer.next(newEntities);
                        fs.writeFile(storagePath,
                            JSON.stringify(newEntities, null, 2), (err: Error) => {
                                if (err) {
                                    console.error(`Error loading entities ammy from storage '${storagePath}:`);
                                    observer.error(err);
                                }
                                observer.next(entities);
                            });
                    });
            });
    }
}




