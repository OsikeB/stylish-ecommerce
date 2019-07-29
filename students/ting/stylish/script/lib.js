/* ==========================================================================
   Call API
   ========================================================================== */
// Destination of API
const API = `https://api.appworks-school.tw/api/1.0`;
const APIproducts = `${API}/products/`;


// Set up GET function for API
function callAPI(src, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // This will run when the request is successful
            console.log('API success!');
            const list = JSON.parse(xhr.responseText);
            callback(list);
        } else {
            // This will run when it's not
            console.log('The request failed!');
        };
    }
    xhr.open('GET', src);
    xhr.send();
};

/* ==========================================================================
   Shopping cart to local storage
   ========================================================================== */
/* 
1. Upon loading, check if local storage has 'cart' key
2. If not, add template for 'cart' value
3. If has, update cart icon quantity
*/

// Set up cart local storage layout
let cartDetails = {
    "prime": "", 
    "order": {
        "shipping": "delivery",
        "payment": "credit_card",
        "subtotal": "", 
        "freight": "", 
        "total": "",
        "recipient": {
            "name": "", 
            "phone": "", 
            "email": "",
            "address": "", 
            "time": "", 
        },
        "list": []
    }
};

//Set up cart quantity update function
function setCartQty() {
    let cartQty = JSON.parse(localStorage.getItem("cart")).order.list;
    document.querySelector(".cart-mobile-qty").innerHTML = cartQty.length;
    document.querySelector(".cart-icon-qty").innerHTML = cartQty.length;
};

// Check local storage for 'cart'
if (localStorage.getItem("cart") === null ) {
    localStorage.setItem("cart", `${JSON.stringify(cartDetails)}`);
    setCartQty(); // call setCartQty function
} else {
    localStorage.getItem("cart");
    setCartQty(); // call setCartQty function
};

/* ==========================================================================
   Facebook login
   ========================================================================== */

 // This is called with the results from from FB.getLoginStatus().
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '450421272462212',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.3' // The Graph API version to use for the call
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }