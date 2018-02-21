'use strict';

angular
    .module('myApp.Books', [
        'myApp.services',
        'constants.book.styles',
        'directives.book.add.edit',
        'directives.book.item'
    ])
    .controller('booksCtrl', function ($window, dataService, BOOK_STYLES) {
        var vm = this;

        activate();

        function activate() {
            setBooks();
            vm.booksStyles = BOOK_STYLES;
            vm.openNewBookDialog = openNewBookDialog;
            vm.dialogType = '';
            vm.book = {};
            initBook();

            vm.authors = dataService.getAllAuthors(true);
            vm.createBook = createBook;

            $window.$("#dialogBook").dialog({
                autoOpen: false,
                height: 450,
                width: 350,
                modal: true
            });
        }

        function createBook() {
            var newBookId = dataService.createBook(vm.book);
            if (vm.book.authorId) {
                dataService.subscribeBookAndAuthor(vm.book.authorId, newBookId)
            }
            $window.$("#dialogBook").dialog("close");
            setBooks();
        }

        function openNewBookDialog() {
            vm.dialogType = 'ADD';
            initBook();
            $window.$("#dialogBook").dialog("open");
        }

        function setBooks() {
            vm.books = dataService.getAllBooks();
        }

        function initBook() {
            vm.book.name = '';
            vm.book.style = 'NONE';
            vm.book.pages = 0;
            vm.book.authorId = "0";
        }
    });

