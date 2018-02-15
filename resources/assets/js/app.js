
import './bootstrap';
import 'angular';


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});


var app = angular.module('LaravelCRUD', []
    , ['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
    }]);
 
app.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
 
}]);


// List tasks
$scope.loadTasks = function () {
    $http.get('/task')
        .then(function success(e) {
            $scope.tasks = e.data.tasks;
        });
};
$scope.loadTasks();


///MODS AQUI
$scope.errors = [];

    $scope.task = {
        name: '',
        description: ''
    };
    $scope.initTask = function () {
        $scope.resetForm();
        $("#add_new_task").modal('show');
    };

    // Add new Task
    $scope.addTask = function () {
        $http.post('/task', {
            name: $scope.task.name,
            description: $scope.task.description
        }).then(function success(e) {
            $scope.resetForm();
            $scope.tasks.push(e.data.task);
            $("#add_new_task").modal('hide');

        }, function error(error) {
            $scope.recordErrors(error);
        });
    };

    $scope.recordErrors = function (error) {
        $scope.errors = [];
        if (error.data.errors.name) {
            $scope.errors.push(error.data.errors.name[0]);
        }

        if (error.data.errors.description) {
            $scope.errors.push(error.data.errors.description[0]);
        }
    };

    $scope.resetForm = function () {
        $scope.task.name = '';
        $scope.task.description = '';
        $scope.errors = [];
    };