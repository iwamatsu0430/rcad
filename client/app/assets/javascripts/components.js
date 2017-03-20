riot.tag2('app', '<project class="{isProjectHidden ? \'project-hidden\' : null}"></project> <main class="{isProjectHidden ? \'project-hidden\' : null}"> <rest></rest> <result></result> </main>', '', '', function(opts) {
    this.isProjectHidden = false

    observer.on(consts.events.project.show, () => {
      this.isProjectHidden = false
      this.update()
    })

    observer.on(consts.events.project.hide, () => {
      this.isProjectHidden = true
      this.update()
    })
});

riot.tag2('project', '', '', '', function(opts) {
});

riot.tag2('rest', '<form onsubmit="{submit}"> <div class="fixme-first-column"> <section class="fixme-left-side"> <select ref="method" riot-value="{restParam.method}" onchange="{changeMethod}"> <option each="{method in methods}" riot-value="{method.value}"> {method.key} </option> </select> <select ref="protocol" riot-value="{restParam.protocol}" onchange="{changeProtocol}"> <option value="http">http://</option> <option value="https">https://</option> </select> </section> <section class="fixme-right-side"> <input type="text" ref="uri" placeholder="Type an URI" riot-value="{restParam.uri}" oninput="{inputUri}"> </section> </div> <div class="fixme-second-column"> <section class="fixme-left-side"> <ul> <li ref="header" each="{h, i in restParam.headers}"> <input type="text" name="header-key" placeholder="Type a Header Key" riot-value="{h.key}" oninput="{inputHeaderKey}"> <input type="text" name="header-value" placeholder="Type a Header Value" riot-value="{h.value}" oninput="{inputHeaderValue}"> <button onclick="{deleteHeader}">❌</button> </li> </ul> <button ref="add-header" onclick="{addHeader}"> <i class="fa fa-plus"></i> Add Header </button> </section> <section class="fixme-right-side"> <pre id="editor" ref="body" if="{isBodyShown}"></pre> </section> </div> <div class="fixme-third-column"> <button type="submit">SEND</button> </div> </form>', '', '', function(opts) {

    this.methods =[
      { key: 'GET', value: 'get' },
      { key: 'POST', value: 'post' },
      { key: 'PUT', value: 'put' },
      { key: 'DELETE', value: 'delete' },
      { key: 'PATCH', value: 'patch' },
      { key: 'OPTIONS', value: 'options' },
      { key: 'HEAD', value: 'head' }
    ]

    this.isBodyShown = false;

    this.restParam = {
      protocol: 'http',
      uri: '',
      headers: [],
      method: 'get',
      body: ''
    }

    this.changeProtocol = function(e) {
      this.restParam.protocol = e.target.value
    }.bind(this)

    this.inputUri = function(e) {
      const uri = e.target.value
      this.restParam.uri = uri
      if (uri.startsWith('http://')) {
        this.restParam.uri = uri.replace('http://', '')
        this.restParam.protocol = 'http'
      } else if (uri.startsWith('https://')) {
        this.restParam.uri = uri.replace('https://', '')
        this.restParam.protocol = 'https'
      }
    }.bind(this)

    this.addHeader = function(e) {
      e.preventDefault()
      this.restParam.headers.push({key: '', value: ''})
    }.bind(this)

    this.inputHeaderKey = function(e) {
      this.restParam.headers[e.item.i].key = e.target.value
    }.bind(this)

    this.inputHeaderValue = function(e) {
      this.restParam.headers[e.item.i].value = e.target.value
    }.bind(this)

    this.deleteHeader = function(e) {
      e.preventDefault()
      this.restParam.headers.splice(e.item.i, 1)
    }.bind(this)

    this.isAllowedBodyMethod = function() {
      return this.restParam.method === 'post' || this.restParam.method === 'put'
    }.bind(this)

    this.changeMethod = function(e) {
      this.restParam.method = e.target.value
      if (this.isAllowedBodyMethod()) {
        this.isBodyShown = true
        this.update()
        this.editor = ace.edit("editor")
        this.editor.getSession().setMode("ace/mode/json")
      } else {
        this.isBodyShown = false
      }
    }.bind(this)

    this.submit = function(e) {
      e.preventDefault()
      this.restParam.headers = this.restParam.headers.filter(h => {
        return h.key.trim() !== '' && h.value.trim() !== ''
      })
      if (this.restParam.uri.trim() === '') {
        return
      }
      if (this.isAllowedBodyMethod()) {
        this.restParam.body = this.editor.getValue().trim()
      }
      axios.post(`${consts.server.host}${consts.server.endpoints.postREST}`, {
        data: this.restParam
      })
      .then(res => {
        observer.trigger(consts.events.results.update, {
          statusCode: res.data.data.status,
          header: res.data.data.header,
          body: res.data.data.body
        })
      })
    }.bind(this)
});

riot.tag2('result', '<section if="{isShown}"> <p>STATUS: {result.statusCode}</p> <ul> <li each="{value, key in result.header}">{key}: {value}</li> </ul> <pre><code ref="codeblock"></code></pre> </section>', '', '', function(opts) {
    this.isShown = false
    this.result = {
      statusCode: null,
      header: {},
      body: null
    }

    this.updateHighlight = () => {
      Object.keys(this.result.header)
        .filter(key => key.toLowerCase() === 'content-type')
        .forEach(key => {
          const value = this.result.header[key]
          const body = this.result.body
          if (value.startsWith('text/html')) {
            this.refs.codeblock.innerHTML = hljs.highlight('html', body.trim()).value
          } else if (value.startsWith('text/css')) {
            this.refs.codeblock.innerHTML = hljs.highlight('css', body.trim()).value
          } else if (value.startsWith('application/javascript')) {
            this.refs.codeblock.innerHTML = hljs.highlight('javascript', body.trim()).value
          } else if (value.startsWith('application/json')) {
            this.refs.codeblock.innerHTML = hljs.highlight('json', JSON.stringify(body)).value
          }
        })
    }

    observer.on(consts.events.results.update, result => {
      this.isShown = true
      this.result = result
      this.update()
      this.updateHighlight()
    })

    observer.on(consts.events.results.clear, () => {
      this.isShown = false
      this.update()
    })
});
