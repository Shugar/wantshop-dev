import $ from 'jquery'
import swal from 'sweetalert2'
import Swiper from 'swiper'

function onCloseClick () {
  $('.menu-close').on('click', function (e) {
    e.stopPropagation()
    $('body').css('overflow', 'auto')

    $('.menu')
      .css('display', 'none')
      .show()
      .removeClass('menu--active')
      .delay(300)
      .fadeOut(0)
  })
}

function onBurgerClick () {
  $('.menu-burger').on('click', function () {
    $('body').css('overflow', 'hidden')
    $('.menu')
      .css('display', 'flex')
      .hide()
      .fadeIn(0)
      .addClass('menu--active')
  })
}

function isSubscribed(data, onSuccess) {
  if (data.title === "Member Exists") {
    // ga('send', 'event', 'subscribe', 'alreadySubscribed');
    swal({
      title: "Sorry",
      text: "The email is already in the list.",
      type: "warning"
    })
  } else if (data.status === 400) {
    swal({
      title: "Error",
      text: data.detail,
      type: "warning"
    })
  } else {
    // ga('send', 'event', 'subscribe', 'success');
    // if (typeof yaCounter45756288 !== 'undefined')
    //   yaCounter45756288.reachGoal('SUBSCRIBE_SUCCESS');

    swal({
      title: "Thank you!",
      text: "We've sent you a confirmation email",
      type: "success"
    })

    onSuccess()
  }
}

function checkEmptyEmail(userEmail) {
  if (userEmail === "") {
    swal({
      title: "Please, enter your email address.",
      text: "",
      type: "error"
    })

    return false
  }

  return true
}

function subscribeEmail(userEmail, onSuccess) {
  if (checkEmptyEmail(userEmail)) {
    // ga('send', 'event', 'knopka', 'podtverdit');
    // ga('send', 'event', 'subscribe', 'buttonPress');
    // if (typeof yaCounter45756288 !== 'undefined')
    //   yaCounter45756288.reachGoal('SUBSCRIBE_CLICKED');
    $.post('/subscribe.php', {
      email: userEmail
    }, (data) => {
      isSubscribed(data, onSuccess)
    }).fail(function () {
      swal({
        title: "Error",
        text: "Please, try again later.",
        type: "error"
      })
    })
  }
}

function isStringEmpty(element) {
  return $(element).val().trim() === ''
}

function contactForm () {
  if (isStringEmpty($('.contacts-name')) && isStringEmpty($('.contacts-contact')) && isStringEmpty($('.contacts-message'))) {
    return swal({
      title: 'Error!',
      text: "Please fill in all fields",
      type: 'error',
    })
  }

  return $.ajax({
    type: 'POST',
    url: 'https://matterlist.com/ml-mailer.php',
    data: $('.contacts-form').serializeArray(),
    success: data => {
      if (data.error) {
        return swal({
          title: 'Error!',
          text: data.error,
          type: 'error'
        })
      }

      return swal({
        title: 'Success!',
        text: "We'll contact you as soon as possible",
        type: 'success'
      })
    }
  })
}

$(document).on('click', '.js-email-subscribe-submit', () => {
  let userEmail = $('.js-email-subscribe-value').val()
  let onSuccess = () => { $('.js-email-subscribe-value').val('') }
  subscribeEmail(userEmail, onSuccess)
})

$(document).on('click', '.contacts-submit', (e) => {
  e.preventDefault()
  contactForm()
})

$(document).ready(function () {
  onBurgerClick()
  onCloseClick()

  $('a[href^="#"]').on('click', function () {
    var el = $(this).attr('href')
    $('body').animate({ scrollTop: $(el).offset().top }, 500)
  })

  if ($('body').hasClass('home-page')) {
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      pagination: '.swiper-pagination',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      paginationClickable: true,
      loop: true
    })
  }
})