var card = new Card({
    // a selector or DOM element for the form where users will
    // be entering their information
    form: document.querySelector('form'), // *required*
    // a selector or DOM element for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*

 

    width: 350, // optional — default 350px
    formatting: true, // optional - default true

    // Strings for translation - optional
    messages: {
        validDate: 'valido\nhasta', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy', // optional - default 'month/year'
    },

    // Default placeholders for rendered fields - optional
    placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'Nombre completo',
        expiry: '••/••',
        cvc: '•••'
    },

    masks: {
        cardNumber: '' // optional - mask card number
    },

    // if true, will log helpful messages for setting up Card
    debug: false // optional - default false
});


(function() {
    var ccnum  = document.getElementById('ccnum'),
        type   = document.getElementById('ccnum-type'),
        expiry = document.getElementById('expiry'),
        cvc    = document.getElementById('cvc'),
        submit = document.getElementById('submit'),
        result = document.getElementById('result');
  
    payform.cardNumberInput(ccnum);
    payform.expiryInput(expiry);
    payform.cvcInput(cvc);
  
    ccnum.addEventListener('input',   updateType);
  
    submit.addEventListener('click', function() {
      var valid     = [],
          expiryObj = payform.parseCardExpiry(expiry.value);
  
      valid.push(fieldStatus(ccnum,  payform.validateCardNumber(ccnum.value)));
      valid.push(fieldStatus(expiry, payform.validateCardExpiry(expiryObj)));
      valid.push(fieldStatus(cvc,    payform.validateCardCVC(cvc.value, type.innerHTML)));
  
      result.className = 'emoji ' + (valid.every(Boolean) ? 'valid' : 'invalid');
    });
  
    function updateType(e) {
      var cardType = payform.parseCardType(e.target.value);
      type.innerHTML = cardType || 'invalid';
    }
  
  
    function fieldStatus(input, valid) {
      if (valid) {
        removeClass(input.parentNode, 'error');
      } else {
        addClass(input.parentNode, 'error');
      }
      return valid;
    }
  
    function addClass(ele, _class) {
      if (ele.className.indexOf(_class) === -1) {
        ele.className += ' ' + _class;
      }
    }
  
    function removeClass(ele, _class) {
      if (ele.className.indexOf(_class) !== -1) {
        ele.className = ele.className.replace(_class, '');
      }
    }
  })();