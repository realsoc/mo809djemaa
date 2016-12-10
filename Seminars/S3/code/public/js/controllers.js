'use strict';

/* Controllers */
angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    console.log("AppCtrl loaded");
    socket.on('send:stations', function (data) {
      $scope.stations = data.stations;
    });
  });
  // controller('MyCtrl1', function ($scope, socket) {
  //   console.log("LOADED");
  //   socket.on('send:stations', function (data) {
  //     console.log("TARACE");
  //     $scope.stations = data.stations;
  //   });
  // }).
  // controller('MyCtrl2', function ($scope) {
  //   // write Ctrl here
  // });
