/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(1);
const bodyParser = __webpack_require__(2);
const config = __webpack_require__(3);
const cors = __webpack_require__(4);
const types_1 = __webpack_require__(5);
const container_1 = __webpack_require__(7);
__webpack_require__(6);
const app = express();
console.log('after app express');
const HOST_CONFIG = config.get('appConfig.hostConfig');
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
console.log('before controller');
const controllers = container_1.default.getAll(types_1.default.Controller);
console.log('before For each controller');
controllers.forEach(controller => controller.register(app));
console.log('after For each controller and before server request');
app.get('/', (request, response, next) => {
    response.send('Server is working perfectly');
});
app.use((err, req, res, next) => {
    console.log('inside error handller');
    console.log('error is ');
    console.log(err);
    res.status(500).json({ error: 'Error Handler' });
});
app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'));
    console.log('Press CTRL-C to stop\n');
});
exports.default = app;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(6);
const TYPES = {
    FileService: Symbol('FileService'),
    Controller: Symbol('Controller')
};
exports.default = TYPES;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __webpack_require__(5);
__webpack_require__(6);
const inversify_1 = __webpack_require__(8);
const file_controller_1 = __webpack_require__(9);
const file_service_1 = __webpack_require__(11);
const container = new inversify_1.Container();
container.bind(types_1.default.Controller).to(file_controller_1.FileController);
container.bind(types_1.default.FileService).to(file_service_1.FileServiceImp);
exports.default = container;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(8);
__webpack_require__(6);
const types_1 = __webpack_require__(5);
const route_constants_1 = __webpack_require__(10);
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    register(app) {
        console.log('Inside registered !');
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}file-list`, this.getAuthorToDoList.bind(this));
        app.get(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}file/:id`, this.getAuthorToDoDetail.bind(this));
        app.post(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}file`, this.createAuthorToDo.bind(this));
        app.put(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}file`, this.updateAuthorToDoDetail.bind(this));
        app.delete(`${route_constants_1.ROUTE_CONSTANTS.REST_API_ROUTE}file/:id`, this.deleteAuthorToDoDetail.bind(this));
    }
    createAuthorToDo(req, res, next) {
        console.log('Inside createAuthorToDo !');
        const entites = [];
        const obj = req.body;
        for (const object of obj.to_do_list) {
            object.id = this.fileService.generateObjectId(object.id, entites);
            entites.push(object);
        }
        console.log('object is', entites);
        obj.to_do_list = entites;
        this.fileService.createFileData(obj, 'amritpal', 'AmritpalSingh.json').subscribe((result) => {
            console.log('result is ', result);
            res.status(201).send('file is created');
        }, (err) => {
            res.status(204).send(err);
        });
    }
    getAuthorToDoList(req, res, next) {
        console.log('Inside getAuthorToDoList !');
        this.fileService.getDataFromFile('amritpal', 'AmritpalSingh.json').subscribe((result) => {
            res.status(200).send(result ? result : {});
        }, (err) => {
            res.status(204).send(err);
        });
    }
    getAuthorToDoDetail(req, res, next) {
        console.log('Inside getAuthorToDoDetail !');
        const ids = req.params.id;
        this.fileService.getDataFromFile('amritpal', 'AmritpalSingh.json').subscribe((result) => {
            result.to_do_list.find((e) => console.log(e.id));
            res.status(200).send(result ? result : {});
        }, (err) => {
            res.status(204).send(err);
        });
    }
    updateAuthorToDoDetail(req, res, next) {
        console.log('Inside updateAuthorToDoDetail !');
        const obj = req.body;
        this.fileService.updateFileData(obj, 'AmritpalSingh.json').subscribe((result) => {
            console.log('result is ', result);
            res.status(201).send('file is updated');
        }, (err) => {
            res.status(204).send(err);
        });
    }
    deleteAuthorToDoDetail(req, res, next) {
        console.log('Inside deleteAuthorToDoDetail !');
        const entites = [];
        const index = entites.indexOf((e) => e.id === +req.params.id);
        if (index === -1) {
            res.status(400).send({
                'error': `No object found with the given ID ${req.params.id}`
            });
            return;
        }
        entites.splice(index, 1);
        this.fileService.createFileData(entites, 'amritpal', 'AmritpalSingh.json').subscribe((result) => {
            console.log('result is ', result);
            res.status(200).send(result ? result : {});
        }, (err) => {
            res.status(204).send(err);
        });
    }
};
FileController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.FileService)),
    __metadata("design:paramtypes", [Object])
], FileController);
exports.FileController = FileController;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_CONSTANTS = {
    REST_API_ROUTE: '/rest/api/'
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = __webpack_require__(12);
__webpack_require__(6);
const inversify_1 = __webpack_require__(8);
const fs = __webpack_require__(13);
let FileServiceImp = class FileServiceImp {
    constructor() {
    }
    generateObjectId(id, entities) {
        if (!id && id == null) {
            id = 0;
        }
        while (entities.indexOf((e) => e.id === id)) {
            id++;
        }
        return id;
    }
    getDataFromFile(entityName, storagePath) {
        console.log(`name is ${entityName} and path is ${storagePath}`);
        return rxjs_1.Observable.create((observer) => {
            fs.readFile(storagePath, (err, content) => {
                if (err) {
                    console.error(`Error loading entities '${entityName} from storage '${storagePath}:`);
                    observer.error({});
                }
                try {
                    const entities = JSON.parse(content.toString());
                    observer.next(entities);
                }
                catch (err) {
                    console.error(`Error parsing entities '${entityName} from storage '${storagePath}:`);
                    console.error(err);
                    observer.error({});
                }
            });
        });
    }
    createFileData(entities, entityName, storagePath) {
        console.log('final entity is', entities);
        return rxjs_1.Observable.create((observer) => {
            this.getDataFromFile(entityName, 'package.json').subscribe((result) => {
                const newEntities = entities;
                newEntities.time_stamp = new Date();
                newEntities.author = result.author;
                newEntities.version = result.version;
                const finalPath = String(`${newEntities.author}.json`).trim();
                console.log('finale path', finalPath);
                fs.writeFile(finalPath, JSON.stringify(newEntities, null, 2), (err) => {
                    if (err) {
                        console.error(`Error loading entities '${entityName} from storage '${storagePath}:`);
                        observer.error(err);
                    }
                    observer.next(entities);
                });
            });
        });
    }
    updateFileData(entities, storagePath) {
        console.log('final entity is', entities);
        return rxjs_1.Observable.create((observer) => {
            this.getDataFromFile('ammy', 'AmritpalSingh.json').subscribe((result) => {
                const newEntities = result;
                for (const object of newEntities.to_do_list) {
                    if (entities.id && object.id === entities.id) {
                        object.text = entities.text;
                    }
                    else {
                        newEntities.to_do_list.push(entities);
                        object.id = this.generateObjectId(object.id, newEntities.to_do_list);
                    }
                }
                observer.next(newEntities);
                fs.writeFile(storagePath, JSON.stringify(newEntities, null, 2), (err) => {
                    if (err) {
                        console.error(`Error loading entities ammy from storage '${storagePath}:`);
                        observer.error(err);
                    }
                    observer.next(entities);
                });
            });
        });
    }
};
FileServiceImp = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], FileServiceImp);
exports.FileServiceImp = FileServiceImp;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })
/******/ ]);