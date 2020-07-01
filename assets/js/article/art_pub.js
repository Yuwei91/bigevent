$(function () {

  let pubstate = '已发布'

  const layer = layui.layer
  const form = layui.form
  // 初始化获取文章分类数据并渲染
  initcate()

  function initcate() {
    $.ajax({
      type: 'get',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return
        }
        layer.msg('获取文章分类列表成功')
        const htmlstr = template('tpl-cate', res)
        $('[name="cate_id"]').html(htmlstr)
        form.render()
      }
    })
  }

  // 初始化富文本编辑器
  initEditor()

  // 1. 初始化图片裁剪器
  const $image = $('#image')

  // 2. 裁剪选项
  const options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  $('#btnchooseimg').on('click', function () {
    $('#coverfile').click()
  })

  $('#coverfile').on('change', function (e) {
    const files = e.target.files
    if (files.length === 0) {
      return
    }
    const newImgURL = URL.createObjectURL(files[0])

    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  $('#btnsave').on('click', function () {
    pubstate = '草稿'
  })

  $('#pubform').on('submit', function (e) {
    e.preventDefault()
    // 将FormData 数据组装 来发送给服务端
    //1. title + cate_id + content
    const fd = new FormData($(this)[0])
    //2. state
    fd.append('state', pubstate)
    //3. cover_img 
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {  // 回调函数异步(发布请求需要在回调函数内发送)
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        publishArticle(fd)
      })
  })

  function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        // 发布文章成功后，跳转到文章列表页面
        location.href = '/my01/bigevent/article/article_list.html'
      }
    })
  }

})
