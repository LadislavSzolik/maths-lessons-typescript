/// <reference path='./_all.ts' />

module exercises {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class ExerciseStorage  {

        STORAGE_ID = 'todos-angularjs-typescript';

        get (): any[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(todos: any[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }
    }
}
