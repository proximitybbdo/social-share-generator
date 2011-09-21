$(document).ready(function(){

    window.soc_gen = new SocialGenerator();

});

function SocialGenerator() {
  this.init();
}

SocialGenerator.prototype = {
  twitter_link: null,
  twitter_link: null,
  fb_link: null, 
  hotmail_link: null,
  gmail_link: null,
              
  copy_twitter: null,
  copy_mail: null,
  subject_mail: null,
  share_link: null,

  validation_timeout: null,

  init:
    function() {
      var ref = this;

      this.listen_for_max_chars("#copy-twitter", 140);

      $("#generator").submit(function(e) {
        e.preventDefault();

        ref.generate();
            
        return false;
      });
    },

  generate:
    function() {
      this.store_vars();

      if(this.validate_form()) {
        $("#link-twitter").val(this.replace_arr(this.twitter_link, [{key: "text", val: this.copy_twitter}]));
        $("#link-fb").val(this.replace_arr(this.fb_link, [ {key: "link", val: this.share_link}, 
                                                            {key: "title", val: ""}]));

        var mail_arr = [  {key: "text", val: this.copy_mail}, 
                          {key: "subject", val: this.subject_mail}, 
                          {key: "link", val: this.share_link}];

        $("#link-hotmail").val(this.replace_arr(this.hotmail_link, mail_arr));
        $("#link-gmail").val(this.replace_arr(this.gmail_link, mail_arr));
      } else {
        this.validation_timeout = setTimeout(this.reset_validation, 5000);
      }
    },

  store_vars:
    function() {
      this.twitter_link = $("#url-twitter").val();
      this.fb_link = $("#url-fb").val();
      this.hotmail_link = $("#url-hotmail").val();
      this.gmail_link = $("#url-gmail").val();

      this.copy_twitter = $("#copy-twitter").val();
      this.copy_mail = $("#copy-mail").val();
      this.subject_mail = $("#subject-mail").val();
      this.share_link = $("#share-link").val();
    },

  validate_form:
    function() {
      var valid = true;

      this.reset_validation();

      if(this.copy_twitter.length > 140) {
        $("#copy-twitter").parent().parent().addClass("error");

        valid = false;
      }

      if(!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(this.share_link)) {
        $("#share-link").parent().addClass("error");

        valid = false;
      }

      return valid;
    },

  reset_validation:
    function() {
      clearTimeout(this.validation_timeout);

      $("#copy-twitter").parent().parent().removeClass("error");
      $("#share-link").parent().removeClass("error");
    },

  replace_arr:
    function (value, list) {
      for(var i = 0; i < list.length; i++)
        value = value.replace(new RegExp("{" + list[i].key + "}"), encodeURIComponent(list[i].val));

      return value;
    },

  listen_for_max_chars:
    function (field, max) {
      $(field).keyup(function(e) {
        if($(this).val().length > max) 
          $(this).parent().parent().addClass("error");
      });
    }
};
