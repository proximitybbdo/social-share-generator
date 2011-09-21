(function() {
  var SocialGenerator;
  $(function() {
    return window.soc_gen = new SocialGenerator();
  });
  SocialGenerator = (function() {
    function SocialGenerator() {
      this.init();
    }
    SocialGenerator.prototype.init = function() {
      var ref;
      this.listen_for_max_chars("#copy-twitter", 140);
      ref = this;
      return $("#generator").submit(function(e) {
        e.preventDefault();
        ref.generate();
        return false;
      });
    };
    SocialGenerator.prototype.generate = function() {
      var mail_arr;
      this.store_vars();
      if (this.validate_form()) {
        $("#link-twitter").val(this.replace_arr(this.twitter_link, [
          {
            key: "text",
            val: this.copy_twitter
          }
        ]));
        $("#link-fb").val(this.replace_arr(this.fb_link, [
          {
            key: "link",
            val: this.share_link
          }, {
            key: "title",
            val: ""
          }
        ]));
        mail_arr = [
          {
            key: "text",
            val: this.copy_mail
          }, {
            key: "subject",
            val: this.subject_mail
          }, {
            key: "link",
            val: this.share_link
          }
        ];
        $("#link-hotmail").val(this.replace_arr(this.hotmail_link, mail_arr));
        return $("#link-gmail").val(this.replace_arr(this.gmail_link, mail_arr));
      } else {
        return this.validation_timeout = setTimeout(this.reset_validation, 5000);
      }
    };
    SocialGenerator.prototype.store_vars = function() {
      this.twitter_link = $("#url-twitter").val();
      this.fb_link = $("#url-fb").val();
      this.hotmail_link = $("#url-hotmail").val();
      this.gmail_link = $("#url-gmail").val();
      this.copy_twitter = $("#copy-twitter").val();
      this.copy_mail = $("#copy-mail").val();
      this.subject_mail = $("#subject-mail").val();
      return this.share_link = $("#share-link").val();
    };
    SocialGenerator.prototype.validate_form = function() {
      var valid;
      valid = true;
      this.reset_validation();
      if (this.copy_twitter.length > 140) {
        $("#copy-twitter").parent().parent().addClass("error");
        valid = false;
      }
      alert("--" + this.share_link);
      if (!/(http|https):\/\/([a-zA-Z0-9.]|%[0-9A-Za-z]|\/|:[0-9]?)*/.test(this.share_link)) {
        $("#share-link").parent().addClass("error");
        valid = false;
      }
      return valid;
    };
    SocialGenerator.prototype.reset_validation = function() {
      clearTimeout(this.validation_timeout);
      $("#copy-twitter").parent().parent().removeClass("error");
      return $("#share-link").parent().removeClass("error");
    };
    SocialGenerator.prototype.replace_arr = function(value, list) {
      var item, _i, _len;
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        value = value.replace(new RegExp("{" + item.key + "}"), encodeURIComponent(item.val));
      }
      return value;
    };
    SocialGenerator.prototype.listen_for_max_chars = function(field, max) {
      return $(field).keyup(function(e) {
        if ($(this).val().length > max) {
          return $(this).parent().parent().addClass("error");
        }
      });
    };
    return SocialGenerator;
  })();
}).call(this);
