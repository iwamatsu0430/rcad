<app>
  <nav>
    <!-- project nav -->
  </nav>

  <main>
    <!-- REST Client -->
    <form onsubmit={ submit }>
      <select ref='protocol' value={ param.protocol } onchange={ changeProtocol }>
        <option value='http'>http://</option>
        <option value='https'>https://</option>
      </select>
      <input type='text' ref='uri' value={ param.uri } placeholder='Type an URI' oninput={ inputUri } />
      <ul>
        <li each={ h, i in param.headers } ref='header'>
          <input type='text' name='header-key' placeholder='Type a Header Key' value={ h.key } oninput={ inputHeaderKey } />
          <input type='text' name='header-value' placeholder='Type a Header Value' value={ h.value } oninput={ inputHeaderValue } />
          <button type='submit' onclick={ deleteHeader }>-</button>
        </li>
      </ul>
      <button onclick={ addHeader }>+</button>
      <select ref='method' value={ param.method } onchange={ changeMethod }>
        <option value='get'>GET</option>
        <option value='post'>POST</option>
        <option value='put'>PUT</option>
        <option value='delete'>DELETE</option>
      </select>
      <textarea ref='body' placeholder='Type a Body' if={ param.method === 'post' || param.method === 'put' } value={ param.body } oninput={ inputBody }></textarea>
      <button type='submit'>SEND</button>
    </form>
    <div>
      <p>{result.status}</p>
      <ul>
        <li each={ value, key in result.header }>{ key }: { value }</li>
      </ul>
      <p>{ result.body }</p>
    </div>
  </main>

  <script>
    // store
    this.param = {
      protocol: 'http',
      uri: '',
      headers: [],
      method: 'get',
      body: ''
    }
    this.result = {
      status: null,
      header: {},
      body: null
    }

    changeProtocol(e) {
      this.param.protocol = e.target.value
    }

    inputUri(e) {
      const uri = e.target.value
      this.param.uri = uri
      if (uri.startsWith('http://')) {
        this.param.uri = uri.replace('http://', '')
        this.param.protocol = 'http'
      } else if (uri.startsWith('https://')) {
        this.param.uri = uri.replace('https://', '')
        this.param.protocol = 'https'
      }
    }

    addHeader(e) {
      e.preventDefault()
      this.param.headers.push({key: '', value: ''})
    }

    inputHeaderKey(e) {
      this.param.headers[e.item.i].key = e.target.value
    }

    inputHeaderValue(e) {
      this.param.headers[e.item.i].value = e.target.value
    }

    deleteHeader(e) {
      e.preventDefault()
      this.param.headers.splice(e.item.i, 1)
    }

    changeMethod(e) {
      this.param.method = e.target.value
    }

    inputBody(e) {
      this.param.body = e.target.value
    }

    submit(e) {
      e.preventDefault()
      axios.post('http://localhost:7001/rest', {
        data: this.param
      })
      .then(res => {
        this.result.status = res.data.data.status
        this.result.header = res.data.data.header
        this.result.body = res.data.data.body
        this.update()
      })
    }
  </script>
</app>
