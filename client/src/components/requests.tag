<requests>
  <ul>
    <li each={ request in opts.requests }>
      <p
        ref='request'
        if={ !request.isDirectory }
        data-path='{ parent.opts.path }{ request.name }'>
        <a href="#" onclick={ loadParam }>{ request.name }</a>
        <span class="controls">
          <i class='fa fa-pencil'></i>
          <i class='fa fa-times'></i>
        </span>
      </p>

      <section if={ request.isDirectory }>
        <p data-path='{ parent.opts.path }{ request.name }'>
          <i class='fa fa-folder'></i> { request.name }
          <span class="controls">
            <i class='fa fa-pencil'></i>
            <i class='fa fa-plus'></i>
            <i class='fa fa-times'></i>
          </span>
        </p>
        <requests
          requests={ request.children }
          path='{ parent.opts.path }{ request.name }/'></requests>
      </section>
    </li>
  </ul>

  <script>
    loadParam(e) {
      e.preventDefault()
      console.log(e.target.parentElement.dataset.path)
      console.log(e.item.request.name)
    }
  </script>
</requests>
