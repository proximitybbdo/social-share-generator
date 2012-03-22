(function() {
  var SocialGenerator, more_links;

  $(function() {
    window.soc_gen = new SocialGenerator();
    return more_links();
  });

  more_links = function() {
    $('span.extra-fields').css("cursor", "pointer");
    return $('span.extra-fields').click(function(e) {
      $('#share-link, span.extra-fields').css('display', 'none');
      $('#share-link').val('');
      return $('div.extra-fields').show();
    });
  };

  SocialGenerator = (function() {

    function SocialGenerator() {
      this.init();
    }

    SocialGenerator.prototype.init = function() {
      var _this = this;
      this.listen_for_max_chars("#copy-twitter", 140);
      this.multi_share = false;
      return $("#generator").submit(function(e) {
        e.preventDefault();
        _this.generate();
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
            val: this.share_link.length === 0 ? this.share_link_fb : this.share_link
          }, {
            key: "title",
            val: this.share_title
          }, {
            key: "text",
            val: this.copy_fb
          }, {
            key: "image",
            val: this.fb_image
          }
        ]));
        $("#link-linkedin").val(this.replace_arr(this.linkedin_link, [
          {
            key: "link",
            val: this.share_link.length === 0 ? this.share_link_fb : this.share_link
          }, {
            key: "title",
            val: this.share_title
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
        if (this.multi_share) mail_arr[2].val = this.share_link_hotmail;
        $("#link-hotmail").val(this.replace_arr(this.hotmail_link, mail_arr));
        if (this.multi_share) mail_arr[2].val = this.share_link_gmail;
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
      this.linkedin_link = $("#url-linkedin").val();
      this.copy_twitter = $("#copy-twitter").val();
      this.copy_fb = $("#copy-fb").val();
      this.copy_mail = $("#copy-mail").val();
      this.fb_image = $("#image-fb").val();
      this.subject_mail = $("#subject-mail").val();
      this.share_link = $("#share-link").val();
      this.share_title = $("#share-title").val();
      this.multi_share = false;
      if (this.share_link.length === 0) {
        this.multi_share = true;
        this.share_link_fb = $("#share-link-fb").val();
        this.share_link_gmail = $("#share-link-gmail").val();
        return this.share_link_hotmail = $("#share-link-hotmail").val();
      }
    };

    SocialGenerator.prototype.validate_form = function() {
      var valid;
      valid = true;
      this.reset_validation();
      if (this.copy_twitter.length > 140) {
        $("#copy-twitter").parent().parent().addClass("error");
        valid = false;
      }
      if (!this.multi_share && !/(http|https):\/\/([a-zA-Z0-9.]|%[0-9A-Za-z]|\/|:[0-9]?)*/.test(this.share_link)) {
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
