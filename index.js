$(function(){
  var $user = $('#user'),
      $phone = $('#phone'),
      $password = $('#password'),
      $verifyCode = $('#verifyCode'),
      $btn = $('#btn'),
      $verifyCodeSend = $('#verifyCodeSend'),
      isuserOk = false;
  $btn.click(function(){
    if(!validate('#user') || !validate('#phone') || !validate('#password') || !validate('#verifyCode')) return;
  });
  $user.focusout(function(){
    if(!validate('#user')) return;
  })
  $phone.focusout(function(){
    if(!validate('#phone')) return;
  })
  $password.focusout(function(){
    if(!validate('#password')) return;
  })
  $verifyCode.focusout(function(){
    if(!validate('#verifyCode')) return;
  })
  function validate(field){
    var $data = $(field),
        $msg = $(field + '-validation-msg');
    if($data.val() === ''){
      $msg.css('display','block');
      $msg.html('不能为空！');
      return false;
    }
    if(field == '#user'){
      if(/[^\u4E00-\u9FA5\w]/.test($data.val())){
        $msg.css('display','block');
        $msg.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
        isuserOk = false;
        return false;
      }else if(!(/\D/.test($data.val()))){
        $msg.css('display','block');
        $msg.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
        isuserOk = false;
        return false;
      }
    }else if(field == '#phone'){
      if(!(/^1[34578]\d{9}$/.test($data.val()))){
        $msg.css('display','block');
        $msg.html('手机号码格式不正确');
        return false;
      }
    }else if(field == '#password'){
      if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/.test($data.val()))){
        $msg.css('display','block');
        $msg.html('密码长度为8-14个字符,数字,字母,字符至少包含两种,不能包含中文和空格');
        return false;
      }
    }
    isuserOk = true;
    $msg.html('');
    return true;
}
  $verifyCodeSend.click(function(){
    if(!$phone.val()){
      $('#phone-validation-msg').css('display','block');
      $('#phone-validation-msg').html('请您输入手机号');
    }
    var num = 60;
    var timer = setInterval(function(){
      num--;
      if(num === 0){
          clearInterval(timer);
          $verifyCodeSend.val('获取验证码');
          $verifyCodeSend.removeAttr('disabled');
          if(!$verifyCode.val()){
            $('#verifyCode-validation-msg').css('display','block');
            $('#verifyCode-validation-msg').html('请求超时，请稍后再试');
            $('#verifyCode').select();
          }
      }else{
        $verifyCodeSend.val('重发验证('+num+'s)');
        $verifyCodeSend.attr('disabled',true);
      }
    },1000);
  });
})

