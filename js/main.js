$(document).ready(function () {
  $('.team-efforts-row').on('mouseover', function () {
    const $this = $(this);
    console.log($this.data('message'));
    $('.team-efforts-message').text($this.find('p').data('message'));
    $this.css('font-weight', 'bold');
    $this.find('img').css('-webkit-filter', 'drop-shadow(5px 5px 5px #999)');
  });

  $('.team-efforts-row').on('mouseleave', function () {
    $('.team-efforts-message').text('');
    const $this = $(this);
    $this.css('font-weight', 'normal');
    $this.find('img').css('-webkit-filter', '');
  });

  /**
   * Handle contact form submissions
   */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const formEl = e.target;
    const formData = new FormData(formEl);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      $('#alert').removeClass('hidden');
      return false;
    }

    $('#contact-submit').attr('disabled', true);
    const url =
      'https://script.google.com/macros/s/AKfycbwO4EW7Gq1cnTNTkTVao-6Lpk6s_eP9czaWmiifrgrChsldmvc/exec';

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const req = new Request(url, {
      method: 'POST',
      mode: 'no-cors',
      headers,
      body: JSON.stringify([new Date(), name, email, message]),
    });

    fetch(req)
      .then(() => {
        document.querySelector('#contact-form').classList.add('hidden');
        document.querySelector(
          '.lead'
        ).innerText = `Your message was recorded successfully. I'll be in touch soon.`;
      })
      .catch((err) => console.log(err));
  } // end of handle contact form submissions

  $('#scroll-to-top').on('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      $('#scroll-to-top').css('display', 'block');
    } else {
      $('#scroll-to-top').css('display', 'none');
    }
  }
});
