// send button
$("#msgInput").keyup(function(){
  if($(this).val() != "") {
    $("button.send").prop("disabled", false);
  } else {
    $("button.send").prop("disabled", true);
  }
});

$(".send").click(function(){
  if ($(".chat").hasClass("attachment")) {
    sendImg();
  } else {
    sendMsg();
  }
});

$("#attachment").change(function() {
  attachment(this);
  $("button.send").prop("disabled", false);
});

$("#msgInput").on('keypress',function(e) {
  if($(".chat").hasClass("attachment")) {
    if(e.which == 13) {
      sendImg();
    }
  } else if($(this).val() != "" && !$(".chat").hasClass("attachment")) {
    if(e.which == 13) {
      sendMsg();
    }
  }
});

// send text
function sendMsg() {
  var message = $("#msgInput").val();
  
  
  if ($(".chat").hasClass("start")) {
    if ($(".chat").hasClass("firstView")) {
      $(".msg").append("<li class=\"date\"><span>today</span></li><li class=\"first\"><div>"+message+"</div><time>"+time(new Date)+"</time></li>");
    } else if ($(".chat").hasClass("secondView")) {
      $(".msg").append("<li class=\"date\"><span>today</span></li><li class=\"second\"><div>"+message+"</div><time>"+time(new Date)+"</time></li>");
    } 
    $(".chat").removeClass("start");
  } else if (!$(".chat").hasClass("start")) {
    if ($(".chat").hasClass("firstView")) {
      $(".msg").append("<li class=\"first\"><div>"+message+"</div><time>"+time(new Date)+"</time></li>");
    } else if ($(".chat").hasClass("secondView")) {
      $(".msg").append("<li class=\"second\"><div>"+message+"</div><time>"+time(new Date)+"</time></li>");
    } 
  }

  
  $(".msgSpace div").scrollTop($(".msg").height());
  $("#msgInput").val("");
  $("button.send").prop("disabled", true);
  $("#msgInput").focus();
}


//attach
function attachment(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();    
    reader.onload = function(e) {
      $(".chat").addClass("attachment");
      var preview =  e.target.result;
      $(".modalAttachment").html("<div class=\"preview\"><img src=\""+preview+"\" /></div>");
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// send img + text
function sendImg() {
  $(".chat").removeClass("attachment");
  
  if ($("#msgInput").val() != "" ) {
	  var message = "<span class=\"caption\">" + $("#msgInput").val() + "</span>";
  } else {
    var message = ""
  }

  var attach = $(".preview").html();
  
  
  if ($(".chat").hasClass("start")) {
    if ($(".chat").hasClass("firstView")) {
      $(".msg").append("<li class=\"date\"><span>today</span></li><li class=\"first img\"><div>"+attach + message+"</div><time>"+time(new Date)+"</time></li>");
    } else if ($(".chat").hasClass("secondView")) {
      $(".msg").append("<li class=\"date\"><span>today</span></li><li class=\"second img\"><div>"+attach + message+"</div><time>"+time(new Date)+"</time></li>");
    } 
    $(".chat").removeClass("start");
  } else if (!$(".chat").hasClass("start")) {
    if ($(".chat").hasClass("firstView")) {
      $(".msg").append("<li class=\"first img\"><div>"+attach + message+"</div><time>"+time(new Date)+"</time></li>");
    } else if ($(".chat").hasClass("secondView")) {
      $(".msg").append("<li class=\"second img\"><div>"+attach + message+"</div><time>"+time(new Date)+"</time></li>");
    } 
  }
  
  
  $(".msgSpace div").scrollTop($(".msg").height());
  $("#msgInput").val("");
  $("button.send").prop("disabled", true);
  $("#msgInput").focus();
}

// time
function time(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? '0'+hours : hours;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


// start
$(".msgSpace div").scrollTop($(".msg").height());

