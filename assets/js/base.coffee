$ ->
  window.soc_gen = new SocialGenerator()

  more_links()

more_links = ->
  $('span.extra-fields').css "cursor", "pointer"

  $('span.extra-fields').click (e) ->
    $('#share-link, span.extra-fields').css 'display', 'none'
    $('#share-link').val ''

    $('div.extra-fields').show()

class SocialGenerator
  constructor: ->
    this.init()

  init: ->
    this.listen_for_max_chars "#copy-twitter", 140

    @multi_share = false

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
        .val this.replace_arr(this.fb_link, [ {key: "link", val: if this.share_link.length == 0 then this.share_link_fb else this.share_link}, 
                                                          {key: "title", val: ""}])

      mail_arr = [  {key: "text", val: this.copy_mail}, 
                    {key: "subject", val: this.subject_mail}, 
                    {key: "link", val: this.share_link}]

      if this.multi_share
        mail_arr[2].val = this.share_link_hotmail

      $("#link-hotmail")
        .val this.replace_arr(this.hotmail_link, mail_arr)

      if this.multi_share
        mail_arr[2].val = this.share_link_gmail

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
      
      this.multi_share = false
  
      if @share_link.length == 0
        this.multi_share = true

        @share_link_fb = $("#share-link-fb").val()
        @share_link_gmail = $("#share-link-gmail").val()
        @share_link_hotmail = $("#share-link-hotmail").val()

  validate_form: ->
    valid = true

    this.reset_validation()

    if @copy_twitter.length > 140
    	$("#copy-twitter").parent().parent().addClass "error"

    	valid = false

    if !this.multi_share && !///(http|https)://([a-zA-Z0-9.]|%[0-9A-Za-z]|/|:[0-9]?)*///.test @share_link
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


