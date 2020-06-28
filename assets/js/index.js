$(function () {
  getuserinfo()
  let layer = layui.layer
  $('#btnlogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/my01/bigevent/login.html'
      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})

function getuserinfo() {
  $.ajax({
    type: 'get',
    url: '/my/userinfo',
    success: function (res) {
      // console.log(res)
      if(res.status !==0) return res.message
      renderAvatar(res.data)
    }
  })
}

function renderAvatar(user) {
  const name = user.nickname || user.username
  $('.welcome').html(`欢迎&nbsp;&nbsp;${name}`)
  if (!user.user_pic) {
    $('.layui-nav-img').hide()
    const first = name[0].toUpperCase()
    $('.textAvatar').html(first).show()
  } else {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  }
}