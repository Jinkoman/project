'use strict';

angular
    .module('myApp.services', ['ngStorage'])
    .factory('userService', function ($localStorage) {
        var service = {
            initStorage: initStorage,
            createAuthor: createAuthor,
            searchAuthor: searchAuthor,
            getAllAuthors: getAllAuthors,
            createBook: createBook,
            searchBook: searchBook,
            getAllBooksByID: getAllBooksByID
        };

        return service;

        function getAllAuthors() {
            return $localStorage.authors;
        }

        function initStorage() {
            $localStorage.authors = $localStorage.authors || [];
            $localStorage.books = $localStorage.books || [];
            $localStorage.authorId = $localStorage.authorId || $localStorage.authors.length + 1;
            $localStorage.booksId = $localStorage.booksId || $localStorage.books.length + 1;
        }

        function createAuthor(name, sname, date, books, id) {
            var author = {};


            if (id) {
                $localStorage.authors.forEach(function (item) {
                    if (item.id === id) {
                        item.name = name;
                        item.sname = sname;
                        item.date = date;
                        item.books = books || [];
                    }
                });
            } else {
                author.name = name;
                author.sname = sname;
                author.date = date;
                author.books = books || [];
                author.id = createId();
                $localStorage.authors.push(author);
            }

            function createId() {
                var id = $localStorage.authorId;
                $localStorage.authorId = $localStorage.authorId + 1;
                return id;
            }

        }

        function createBook(name, style, pages, authorId, id) {
            var book = {};

            if (id) {
                $localStorage.books.forEach(function (item) {
                    if (item.id === id) {
                        item.name = name;
                        item.sname = sname;
                        item.date = date;
                        item.books = books || [];
                    }
                });
            } else {
                book.name = name;
                book.style = style;
                book.pages = pages || 0;
                book.author = authorId;
                book.id = createId();
            }

            function createId() {
                var id = $localStorage.booksId;
                $localStorage.booksId = $localStorage.booksId + 1;
                return id;
            }

            $localStorage.books.push(book);

        }

        function searchAuthor(param) {
            var searchReg;
            return $localStorage.authors.filter(function (item) {
                if (/[0-9]+/.test(param)) {
                    searchReg = new RegExp(param, 'gi');
                    return searchReg.test(item.id);
                }
                if (/[a-zA-Z]+/.test(param)) {
                    searchReg = new RegExp(param, 'gi');
                    return searchReg.test(item.name) || searchReg.test(item.sname);
                }
            });
        }

        function searchBook(param) {
            var searchReg;
            return $localStorage.books.filter(function (item) {
                searchReg = new RegExp(param, 'gi');
                return searchReg.test(item.name);
            });
        }

        function getAllBooksByID(id) {
            return $localStorage.books.filter(function (item) {
                return item.author === id;
            });
        }
    });