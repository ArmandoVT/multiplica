import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number;
        let endPage: number;
        if (totalPages <= 1) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 1) {
                startPage = 1;
                endPage = 1;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages;
                endPage = totalPages;
            } else {
                startPage = currentPage;
                endPage = currentPage;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }
}
