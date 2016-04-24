'use strict';

angular.module('states', ['products', 'admin', 'checkout']);

angular.module('services', ['basket', 'orderService', 'productsService']);

angular.module('directives', ['basketStatus', 'rating']);

angular
  .module('shopping', ['ui.router', 'env', 'states', 'services', 'directives'])
  .config(function ($urlRouterProvider, $logProvider, debug) {
    $logProvider.debugEnabled(debug);
    $urlRouterProvider.otherwise("/");
  })
  .run(function ($log, debug) {
    $log.info(`Shopping application is running in ${debug ? 'debug' : 'production'} mode.`);
  });
