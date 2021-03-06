'use strict';

(function () {
  window.consts = {
    server: {
      host: 'http://localhost:7001',
      endpoints: {
        getCWD: '/project/cwd',
        initProject: '/project',
        postREST: '/rest'
      }
    },
    events: {
      project: {
        show: 'showProject',
        hide: 'hideProject'
      },
      results: {
        update: 'updateResult',
        clear: 'clearResult'
      }
    }
  };
})();