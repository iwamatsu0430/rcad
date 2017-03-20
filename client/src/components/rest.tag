<rest>
  <form onsubmit={ submit }>
    <div class='fixme-first-column'>
      <section class='fixme-left-side'>
        <select
          ref='method'
          value={ restParam.method }
          onchange={ changeMethod }>
          <option
            each={ method in methods }
            value={ method.value }>
            { method.key }
          </option>
        </select>
        <select ref='protocol' value={ restParam.protocol } onchange={ changeProtocol }>
          <option value='http'>http://</option>
          <option value='https'>https://</option>
        </select>
      </section>
      <section class='fixme-right-side'>
        <input
          type='text'
          ref='uri'
          placeholder='Type an URI'
          value={ restParam.uri }
          oninput={ inputUri } />
      </section>
    </div>
    <div class='fixme-second-column'>
      <section class='fixme-left-side'>
        <ul>
          <li
            ref='header'
            each={ h, i in restParam.headers } >
            <input
              type='text'
              name='header-key'
              placeholder='Type a Header Key' value={ h.key }
              oninput={ inputHeaderKey } />
            <input
              type='text'
              name='header-value'
              placeholder='Type a Header Value'
              value={ h.value }
              oninput={ inputHeaderValue } />
            <button onclick={ deleteHeader }>❌</button>
          </li>
        </ul>
        <button ref='add-header' onclick={ addHeader }>
          <i class="fa fa-plus"></i> Add Header
        </button>
      </section>
      <section class='fixme-right-side'>
        <pre
          id="editor"
          ref='body'
          if={ isBodyShown }></pre>
      </section>
    </div>
    <div class='fixme-third-column'>
      <button type='submit'>SEND</button>
    </div>
  </form>

  <script>

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

    changeProtocol(e) {
      this.restParam.protocol = e.target.value
    }

    inputUri(e) {
      const uri = e.target.value
      this.restParam.uri = uri
      if (uri.startsWith('http://')) {
        this.restParam.uri = uri.replace('http://', '')
        this.restParam.protocol = 'http'
      } else if (uri.startsWith('https://')) {
        this.restParam.uri = uri.replace('https://', '')
        this.restParam.protocol = 'https'
      }
    }

    addHeader(e) {
      e.preventDefault()
      this.restParam.headers.push({key: '', value: ''})
    }

    inputHeaderKey(e) {
      this.restParam.headers[e.item.i].key = e.target.value
    }

    inputHeaderValue(e) {
      this.restParam.headers[e.item.i].value = e.target.value
    }

    deleteHeader(e) {
      e.preventDefault()
      this.restParam.headers.splice(e.item.i, 1)
    }

    isAllowedBodyMethod() {
      return this.restParam.method === 'post' || this.restParam.method === 'put'
    }

    changeMethod(e) {
      this.restParam.method = e.target.value
      if (this.isAllowedBodyMethod()) {
        this.isBodyShown = true
        this.update()
        this.editor = ace.edit("editor")
        this.editor.getSession().setMode("ace/mode/json")
      } else {
        this.isBodyShown = false
      }
    }

    submit(e) {
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
    }
  </script>
</rest>
