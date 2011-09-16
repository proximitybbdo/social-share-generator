$(document).ready(function(){
  
   initGenerator(); 

});

var twitter_link;
var fb_link;
var hotmail_link;
var gmail_link;
                
var copy_twitte;
var copy_mail;
var subject_mail;
var share_link;

function initGenerator() {
  $("#copy-twitter").keyup(function(e) {
    if($("#copy-twitter").val().length > 140) 
      $("#copy-twitter").parent().parent().addClass("error");
  });

  $("#generator").submit(function(e) {
    e.preventDefault();

    twitter_link = $("#url-twitter").val();
    fb_link = $("#url-fb").val();
    hotmail_link = $("#url-hotmail").val();
    gmail_link = $("#url-gmail").val();

    copy_twitter = $("#copy-twitter").val();
    copy_mail = $("#copy-mail").val();
    subject_mail = $("#subject-mail").val();
    share_link = $("#share-link").val();

    if(valid_form()) {
      $("#link-twitter").val(replace_arr(twitter_link, [{key: "text", val: copy_twitter}]));
      $("#link-fb").val(replace_arr(fb_link, [{key: "link", val: share_link}, {key: "title", val: ""}]));
      $("#link-hotmail").val(replace_arr(hotmail_link, [{key: "text", val: copy_mail}, {key: "subject", val: subject_mail}, {key: "link", val: share_link}]));
      $("#link-gmail").val(replace_arr(gmail_link, [{key: "text", val: copy_mail}, {key: "subject", val: subject_mail}, {key: "link", val: share_link}]));
    }

    return false;
  });
}

function valid_form() {
  var valid = true;

  if(copy_twitter.length > 140)
    $("#copy-twitter").parent().parent().addClass("error");

  return valid;
}

function replace_arr(value, list) {
  for(var i = 0; i < list.length; i++)
    value = value.replace(new RegExp("{" + list[i].key + "}"), encodeURIComponent(list[i].val));

  return value;
}
