
app.controller('MainController', ['$scope', '$http', function($scope, $http) { 
    $scope.todo = {
        title: "Things I Need to Do",
        list: ["Clean my room", "Go to the store", "Study Cracking the Coding Interview"]
    }

    $scope.books = {
        title: "Books I Need to Buy",
        list: []
    }
  function hasOnlyNumbers(item) {
    return /^[0-9]*$/.test(item)
  }

  $scope.addItem = function(itemList, item) {
    // ISBN: 10 or 13 length and consist of only numbers
    if ((item.length == 10 || item.length == 13) && hasOnlyNumbers(item)) {
        console.log("ISBN");
        $http({
            method: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + item
         }).then(function (response){
            itemList.push("Title: " + response.data.items[0].volumeInfo.title + " // Author(s): " + response.data.items[0].volumeInfo.authors);
         },function (error){
            console.log(error, 'can not get data.');
         });
    } else {
        console.log("not an ISBN");
        itemList.push(item);
    }
    }
}]);