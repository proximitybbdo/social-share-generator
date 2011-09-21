$ ->
  window.soc_gen = new SocialGenerator()

class SocialGenerator
  constructor: ->
    this.init()

  init: ->
    this.listen_for_max_chars "#copy-twitter", 140

    ref = this

    $("#generator").submit (e) ->
      e.preventDefault()

      ref.generate()

      return false

  generate: ->
    this.store_vars()

    if this.validate_form()
      $("#link-twitter")
        .val this.replace_arr(this.twitter_link, [{key: "text", val: this.copy_twitter}])

      $("#link-fb")
        .val this.replace_arr(this.fb_link, [ {key: "link", val: this.share_link}, 
                                                          {key: "title", val: ""}])

      mail_arr = [  {key: "text", val: this.copy_mail}, 
                    {key: "subject", val: this.subject_mail}, 
                    {key: "link", val: this.share_link}]

      $("#link-hotmail")
        .val this.replace_arr(this.hotmail_link, mail_arr)

      $("#link-gmail")
        .val this.replace_arr(this.gmail_link, mail_arr)
    else
      @validation_timeout = setTimeout this.reset_validation, 5000

  store_vars: ->
      @twitter_link = $("#url-twitter").val()
      @fb_link = $("#url-fb").val()
      @hotmail_link = $("#url-hotmail").val()
      @gmail_link = $("#url-gmail").val()

      @copy_twitter = $("#copy-twitter").val()
      @copy_mail = $("#copy-mail").val()
      @subject_mail = $("#subject-mail").val()
      @share_link = $("#share-link").val()

  validate_form: ->
    valid = true

    this.reset_validation()

    if @copy_twitter.length > 140
    	$("#copy-twitter").parent().parent().addClass "error"

    	valid = false

    if !///(http|https)://([a-zA-Z0-9.]|%[0-9A-Za-z]|/|:[0-9]?)*///.test @share_link)
    	$("#share-link").parent().addClass "error"

    	valid = false

    return valid

  reset_validation: ->
    clearTimeout @validation_timeout

    $("#copy-twitter").parent().parent().removeClass "error"
    $("#share-link").parent().removeClass "error"

  replace_arr: (value, list) ->
    for item in list
    	value = value.replace new RegExp("{" + item.key + "}"), encodeURIComponent item.val

    value

  listen_for_max_chars: (field, max) ->
    $(field).keyup (e) ->
      if $(this).val().length > max
      	$(this).parent().parent().addClass "error"


