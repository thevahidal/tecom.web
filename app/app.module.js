'use strict';

/**
 * Main angular application module.
 *
 * @module app
 */
var app = angular.module('tecomApp', [
  'ui.router', 'ngStorage', 'angular-jwt', 'ui.bootstrap', 'config',
  'angularMoment',
]);

app.config(['$httpProvider', 'jwtOptionsProvider', 'UserProvider',
  function ($httpProvider, jwtOptionsProvider, UserProvider) {

    jwtOptionsProvider.config({
      tokenGetter: function () {
        return UserProvider.$get().token;
      }
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  }
]);

app.config(['$httpProvider', 'jwtInterceptorProvider',
  function ($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.authPrefix = 'JWT ';
  }
]);

app.run(function (amMoment) {
  amMoment.changeLocale('fa');
});
