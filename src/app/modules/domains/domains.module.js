(function() {
  'use strict';

  var module = angular.module('qorDash.domains', [
    'ui.router',
    'ui.layout',
    'qorDash.widget',
    'qorDash.widget.domain_stat',
    'qorDash.widget.network',
    'qorDash.widget.domain_details'

  ]);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider', '$qorSidebarProvider'];

  function appConfig($stateProvider, $qorSidebarProvider) {
    $stateProvider
      .state('app.domains', {
        url: '/domains/:id',
        views: {
          'main@': {
            templateUrl: 'app/modules/domains/domains.html',
            controller: 'DomainsController'
          }
        },
        authenticate: true
      });

    $qorSidebarProvider.config('domains', {
      title: 'Environments',
      nav: 40,
      content: '<span qor-sidebar-group-heading="domains" data-icon-class="fa fa-cloud"></span>',
      templateUrl: 'app/modules/domains/domains-sidebar.html',
      controller: 'DomainsSidebarController'
    });
  }
})();
