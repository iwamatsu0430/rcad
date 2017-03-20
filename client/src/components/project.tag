<project>
  <section ref='cwd'>
    <input
      type='text'
      disabled='disabled'
      value={ directoryInfo.path }>
    <i class='fa fa-folder-open'></i>
  </section>

  <section
    ref='init-project'
    if={ !directoryInfo.isProject }>
    <div>
      <p>There is Not Project</p>
      <button onclick={ initProject }>✨ Init Project ✨</button>
    </div>
  </section>

  <section
    ref='project-tree'
    if={ directoryInfo.isProject }>
    <p>
      ROOT
      <span class='controls'>
        <i class='fa fa-plus'></i>
      </span>
    </p>
    <requests
      path='/'
      requests={ this.directoryInfo.requests }></requests>
  </section>

  <script>
    this.directoryInfo = {
      path: '',
      isProject: false,
      requests: []
    }

    getCWDInfo() {
      axios
      .get(`${consts.server.host}${consts.server.endpoints.getCWD}`)
      .then(res => {
        this.directoryInfo = res.data
        this.directoryInfo.requests = [
          {
            name: 'user',
            isDirectory: true,
            children: [
              {
                name: 'list',
                isDirectory: false,
              },
              {
                name: 'create',
                isDirectory: false,
              },
              {
                name: 'auth',
                isDirectory: true,
                children: [
                  {
                    name: 'signUp',
                    isDirectory: false
                  },
                  {
                    name: 'signOut',
                    isDirectory: false
                  }
                ]
              },
            ]
          },
          {
            name: 'healthCheck',
            isDirectory: false
          },
          {
            name: 'sandbox',
            isDirectory: false
          }
        ]
        this.update()
      })
    }

    initProject(e) {
      e.preventDefault()
      axios
        .post(`${consts.server.host}${consts.server.endpoints.initProject}`, {
          data: {
            path: this.directoryInfo.path
          }
        })
        .then(res => this.getCWDInfo())
    }

    createRequest(e) {
      e.preventDefault()
      // {
      //   workingDir: this.directoryInfo.path,
      //   parentDir: '',
      //   requestName: ''
      // }
      // to rest tag with observer
    }

    this.getCWDInfo()
  </script>
</project>
