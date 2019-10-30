const vueApp = new Vue({
    el: "#vue_app",
    data: {
        fullBookList: [],
        fullLanguagesList: [],
        filteredBookList: [],
    },
    methods: {
        callJSON: function () {
            fetch("https://api.myjson.com/bins/zyv02", {
                    method: "GET",
                })
                .then(function (response) {
                    if (response.ok) {
                        bookData = response.json();
                        return bookData;
                    }
                })
                .then(function (bookData) {
                    this.fullBookList = bookData.books;
                    this.filteredBookList = bookData.books;
                    vueApp.fillLanguagesList(this.fullBookList);
                    vueApp.masterBookFilter(this.fullBookList)
                })
        },
        fillLanguagesList: function (books) {
            languages = [];
            for (let i = 0; i < books.length; i++) {
                if (languages.includes(books[i].language) === false) {
                    languages.push(books[i].language);
                }
            }
            this.fullLanguagesList = languages
        },
        masterBookFilter: function (books) {
            let selector = document.getElementById("languageSelector");
            let search = document.getElementById("searchBar");
            let selectedBooks = books
            let searchedBooks = books
            vueApp.updateFilteredList(selectedBooks, searchedBooks);
            selector.addEventListener("change", function () {
                selectedBooks = [];
                if (selector.value == "All") {
                    selectedBooks = books;
                } else {
                    selectedBooks = books.filter(book => book.language.includes(selector.value));
                }
                vueApp.updateFilteredList(selectedBooks, searchedBooks);
            });
            search.addEventListener("input", function () {
                searchedBooks = [];
                if (search.value === "") {
                    searchedBooks = books;
                } else {
                    searchedBooks = books.filter(book => book.description.toLowerCase().includes(search.value.toLowerCase()) || book.title.toLowerCase().includes(search.value.toLowerCase()));
                }
                vueApp.updateFilteredList(selectedBooks, searchedBooks);
            });
        },
        updateFilteredList: function (selected, searched) {
            vueApp.filteredBookList = selected.filter(book => searched.includes(book));
            console.log(vueApp.filteredBookList);
        },
    },

    created() {
        this.callJSON()
    }, 
}) //nice!