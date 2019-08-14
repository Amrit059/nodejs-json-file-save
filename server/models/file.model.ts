export class FileModel {
    author?: string;
    time_stamp: Date;
    to_do_list?: ToDoListModel[];
    version: string;
}

export class ToDoListModel {
    text?: string;
    id: number;
}
