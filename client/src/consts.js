(() => {
  window.consts = {
    server: {
      host: 'http://localhost:7001',
      endpoints: {
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
  }
})()
