$(function () {
  const form = layui.form
  const layer = layui.layer

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码为6-12位,且不可包含空格'],
    samepwd: function (value) {
      let oldpwd = $('[name="oldPwd"]').val()
      if (value === oldpwd) {
        return '新密码与旧密码相同,请重新设置'
      }
    },
    repwd: function (value) {
      let newPwd = $('[name="newPwd"]').val()
      if (value !== newPwd) {
        return '两次输入的新密码不相同,请重新输入'
      }
    }
  })

    $('.layui-form').submit(function(e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        }
        layer.msg('更新密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  })

})





// $(function() {
//   var form = layui.form

//   form.verify({
//     pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//     samePwd: function(value) {
//       if (value === $('[name=oldPwd]').val()) {
//         return '新旧密码不能相同！'
//       }
//     },
//     rePwd: function(value) {
//       if (value !== $('[name=newPwd]').val()) {
//         return '两次密码不一致！'
//       }
//     }
//   })

//   $('.layui-form').on('submit', function(e) {
//     e.preventDefault()
//     $.ajax({
//       method: 'POST',
//       url: '/my/updatepwd',
//       data: $(this).serialize(),
//       success: function(res) {
//         if (res.status !== 0) {
//           return layui.layer.msg('更新密码失败！')
//         }
//         layui.layer.msg('更新密码成功！')
//         // 重置表单
//         $('.layui-form')[0].reset()
//       }
//     })
//   })
// })
