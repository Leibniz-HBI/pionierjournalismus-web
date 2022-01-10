/*
 * https://mc.us16.list-manage.com/subscribe/post-json?
 * u={uid}&id={id}&c={callback}&EMAIL={address};
 */

const jsonpRequest = (url, callback) => {
  let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  let script = document.createElement('script');

  window[callbackName] = data => {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  script.onerror = e => {
    console.info('error:', e);
  };

  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'c=' + callbackName;
  document.body.appendChild(script);
};

const toggleStatus = ({ status }) => {
  const statusBoxLoading = document.querySelector('.status-box--loading');
  const statusBoxError = document.querySelector('.status-box--error');
  const statusBoxSuccess = document.querySelector('.status-box--success');

  document.querySelector('.signup-box').hidden = true;
  document.querySelectorAll('.status-box').forEach(item => {
    item.classList.add('status-box--hidden');
  });

  switch (status) {
  case 'loading':
    statusBoxLoading.classList.remove('status-box--hidden');
    document.querySelector('.signup-box').classList.remove('signup-inactive');
    window.setTimeout(e => statusBoxLoading.classList.add('status-box--hidden'), 5000);
    break;
  case 'error':
    statusBoxError.classList.remove('status-box--hidden');
    document.querySelector('.signup-box').classList.remove('signup-inactive');
    window.setTimeout(e => statusBoxError.classList.add('status-box--hidden'), 5000);
    break;
  case 'success':
    statusBoxSuccess.classList.remove('status-box--hidden');
    document.querySelector('.signup-box').classList.remove('signup-inactive');
    window.setTimeout(e => statusBoxSuccess.classList.add('status-box--hidden'), 8000);
    break;
  }
};

const handleFormSubmit = e => {
  const form = document.querySelector('.signup-form');
  const formInput = document.querySelector('.signup-form input[type=email]');
  const formInputTitle = document.querySelector('.signup-form input[name=form-title]');
  const formInputWebsite = document.querySelector('.signup-form input[name=form-website]');
  const url = `${form.getAttribute('action')}&EMAIL=${formInput.value}&FNAME=${formInputTitle.value}&WEBSITE=${formInputWebsite.value}`;

  return new Promise((resolve, reject) => {
    jsonpRequest(url, data => {
      console.info(data);
      resolve(data);
    });
  })

};


export default handleFormSubmit
