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
    @init()

  init: ->
    @listen_for_max_chars "#copy-twitter", 140

    @multi_share = false

    $("#generator").submit (e) =>
      e.preventDefault()

      @generate()

      return false

  generate: ->
    @store_vars()

    if @validate_form()
      $("#link-twitter")
        .val @replace_arr(@twitter_link, [{key: "text", val: @copy_twitter}])

      $("#link-fb")
        .val @replace_arr(@fb_link, [ {key: "link", val: if @share_link.length == 0 then @share_link_fb else @share_link},
                                      {key: "title", val: @share_title},
                                      {key: "text", val: @copy_fb},
                                      {key: "image", val: @fb_image}])

      $("#link-fb-mobile")
        .val @replace_arr(@fb_link_mobile, [{key: "link", val: if @share_link.length == 0 then @share_link_fb else @share_link},
                                            {key: "title", val: @share_title}])

      $("#link-linkedin")
        .val @replace_arr(@linkedin_link, [ {key: "link", val: if @share_link.length == 0 then @share_link_fb else @share_link},
                                            {key: "text", val: @copy_fb},
                                            {key: "title", val: @share_title}])

      mail_arr = [  {key: "text", val: @copy_mail},
                    {key: "subject", val: @subject_mail},
                    {key: "link", val: @share_link}]

      if @multi_share
        mail_arr[2].val = @share_link_hotmail

      $("#link-hotmail")
        .val @replace_arr(@hotmail_link, mail_arr)

      if @multi_share
        mail_arr[2].val = @share_link_gmail

      $("#link-gmail")
        .val @replace_arr(@gmail_link, mail_arr)
    else
      @validation_timeout = setTimeout @reset_validation, 5000

  store_vars: ->
      @twitter_link = $("#url-twitter").val()
      @fb_link = $("#url-fb").val()
      @fb_link_mobile = $("#url-fb-mobile").val()
      @hotmail_link = $("#url-hotmail").val()
      @gmail_link = $("#url-gmail").val()
      @linkedin_link = $("#url-linkedin").val()

      @copy_twitter = $("#copy-twitter").val()
      @copy_fb = $("#copy-fb").val()
      @copy_mail = $("#copy-mail").val()
      @fb_image = $("#image-fb").val()
      @subject_mail = $("#subject-mail").val()
      @share_link = $("#share-link").val()
      @share_title = $("#share-title").val()
      
      @multi_share = false
  
      if @share_link.length == 0
        @multi_share = true

        @share_link_fb = $("#share-link-fb").val()
        @share_link_gmail = $("#share-link-gmail").val()
        @share_link_hotmail = $("#share-link-hotmail").val()

  validate_form: ->
    valid = true

    @reset_validation()

    if @copy_twitter.length > 140
    	$("#copy-twitter").parent().parent().addClass "error"

    	valid = false

    if !@multi_share && !///(http|https)://([a-zA-Z0-9.]|%[0-9A-Za-z]|/|:[0-9]?)*///.test @share_link
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


