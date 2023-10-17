if (document.readyState == 'loading')
{
  document.addEventListener("DOMContentLoaded", ready)
} else
{
  ready();
}

function ready()
{
  var p_mainImgSrc = "";
  var p_itemTitle = "";
  var p_itemPrice = "";
  var p_itemQuantity = "";

  // remove cart item - accessing buttons
  var removeCartItemsBtn = document.getElementsByClassName("fa-times-circle");

  for (var i = 0; i < removeCartItemsBtn.length; i++)
  {
    var button = removeCartItemsBtn[i];
    button.addEventListener('click', removeCartItem);
  }
  // Quantity change - accesing qty inputs

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");

  for (var i = 0; i < quantityInputs.length; i++)
  {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
    input.addEventListener('change', updateSubtotal);
    input.addEventListener('change', updateCartTotal);
  }

  // adding items to cart 

  var cartBody = document.getElementById("cart-body");

  if (cartBody)
  {
    if (localStorage.getItem('cartData') != null)
    {
      var myCartData = JSON.parse(localStorage.getItem('cartData'));

      for (var i = 0; i < myCartData.length; i++)
      {
        var itemData = myCartData[i];

        var subtotal = Number(itemData[2].replace("$", "").trim()) * Number(itemData[3]);


        var cartRow = document.createElement('tr');
        cartRow.classList.add("cart-row");
        cartRow.innerHTML = `<td>
         <i class="far fa-times-circle"></i>
        </td>
        <td><img src="${itemData[0]}" alt="" /></td>
        <td>${itemData[1]}</td>
         <td class="cart-price">${itemData[2]}</td>
         <td><input type="number" value="${itemData[3]}" class="cart-quantity-input" min="1"/></td>
        <td class="cart-item-subtotal">$ ${subtotal}</td>`;

        var cartItems = document.getElementById("cart-body");

        cartItems.appendChild(cartRow);

        cartRow.getElementsByClassName("fa-times-circle")[0].addEventListener('click', removeCartItem);


        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', quantityChanged);
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateSubtotal);
        cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', updateCartTotal);

        updateCartTotal();

      }
    }

    updateCartTotal();

    // purchase btn

    var purchaseBtn = document.getElementById("btn-purchase");

    purchaseBtn.addEventListener('click', purchaseBtnClicked);

  }























}


// update subtotal - function

function updateSubtotal(event)
{
  var input = event.target;

  var curCartRow = input.parentElement.parentElement;

  var curPriceElement = curCartRow.getElementsByClassName("cart-price")[0];
  var curPrice = parseFloat(curPriceElement.innerText.replace("$", "").trim());

  var curQuantity = input.value;

  var subtotal = curQuantity * curPrice;

  curCartRow.getElementsByClassName("cart-item-subtotal")[0].innerText = "$ " + subtotal;

  // var mainImgSrc = document.getElementById("MainImg").src;


}


// Quantity change - function

function quantityChanged(event)
{
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0)
  {
    input.value = 1;
  }
  updateCartTotal();

}

// remove cart item - function
function removeCartItem(event)
{
  var buttonClicked = event.target;

  var cartRow = buttonClicked.parentElement.parentElement;

  var cartTitle = cartRow.getElementsByTagName('td')[2].innerHTML;

  var existingCartData = JSON.parse(localStorage.getItem('cartData'));

  for (var i = 0; i < existingCartData.length; i++)
  {
    if (existingCartData[i][1] == cartTitle)
    {
      existingCartData.splice(i, 1);
    }

  }

  localStorage.setItem('cartData', JSON.stringify(existingCartData));

  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// update cart total - function
function updateCartTotal()
{
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];

  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;

  for (var i = 0; i < cartRows.length; i++)
  {
    var cartRow = cartRows[i];
    var subtotalElement = cartRow.getElementsByClassName("cart-item-subtotal")[0];

    var subtotal = parseFloat(subtotalElement.innerText.replace("$", "").trim());

    var total = total + subtotal;

  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("cart-subtotal")[0].innerText = "$ " + total;
  document.getElementsByClassName("cart-total")[0].innerText = "$ " + total;

}

// Purchase clicked - function

function purchaseBtnClicked(event)
{
  if(localStorage.getItem("cartData") != null)
  {
    localStorage.removeItem('cartData');
  
    alert("Processing your Payment. \nPlease wait. . .")
    location.href='loader.html';
    
  }else{
    
    alert("Shopping cart Empty. Please Add Items to Your cart!")
  }






}

// coupon invalid

function coupon(){
  alert("Please Enter Valid Coupon Code!")
}

class Order {
  constructor(id, items) {
      this.id = id;
      this.items = items;
      this.status = 'processing';
  }

  notifyCustomer() {
      const customerEmail = 'customer@email.com';
      const orderId = this.id;
      const subject = 'Your Order is Being Processed';
      const body = `Your order with id: ${orderId} is being processed. You will receive another email when your order is on its way.`;

      sendEmail(customerEmail, subject, body); // Apelul funcției sendEmail pentru a notifica clientul
  }

  processPayment() {
    class Order {
      constructor(id, items) {
          this.id = id;
          this.items = items;
          this.status = 'processing';
      }
    
      notifyCustomer() {
          const customerEmail = 'epicgamesro23@gmail.com';
          const orderId = this.id;
          const subject = 'Comanda ta este în curs de procesare';
          const body = `Comanda ta cu id-ul: ${orderId} este în curs de procesare. Vei primi un alt e-mail când comanda ta va fi trimisă.`;
    
          sendEmail(customerEmail, subject, body);
      }
    
      processPayment() {
          // Simulare procesare plată
          console.log('Procesare plată în curs...');
          setTimeout(() => {
              console.log('Plata procesată cu succes!');
              this.updateStatus('Plata procesată');
              this.fulfillOrder();
          }, 2000);
      }
    
      fulfillOrder() {
          // Adaugă logica pentru finalizarea comenzii aici
          this.updateStatus('Comanda finalizată');
          this.prepareShipment();
      }
    
      prepareShipment() {
          // Adaugă logica pentru pregătirea expedierii aici
          this.updateStatus('Expediere în curs');
          this.notifyCustomer();
      }
    
      updateStatus(newStatus) {
          this.status = newStatus;
          console.log(`Status actualizat: ${this.status}`);
      }
    }
    
    function sendEmail(to, subject, body) {
      console.log(`Trimite email către: ${to}`);
      console.log(`Subiect: ${subject}`);
      console.log(`Mesaj: ${body}`);
    }
    
    // Utilizare
    const newOrder = new Order(1, ['Produs 1', 'Produs 2']);
    newOrder.processPayment();
    
  }

  fulfillOrder() {
      class Order {
  constructor(id, items) {
      this.id = id;
      this.items = items;
      this.status = 'processing';
  }

  notifyCustomer() {
      const customerEmail = 'epicgamesro23@gmail.com';
      const orderId = this.id;
      const subject = 'Comanda ta este în curs de procesare';
      const body = `Comanda ta cu id-ul: ${orderId} este în curs de procesare. Vei primi un alt e-mail când comanda ta va fi trimisă.`;

      sendEmail(customerEmail, subject, body);
  }

  processPayment() {
      // Simulare procesare plată
      console.log('Procesare plată în curs...');
      setTimeout(() => {
          console.log('Plata procesată cu succes!');
          this.updateStatus('Plata procesată');
          this.fulfillOrder();
      }, 2000);
  }

  fulfillOrder() {
      // Simulare finalizare comandă
      console.log('Finalizare comandă în curs...');
      setTimeout(() => {
          console.log('Comanda finalizată cu succes!');
          this.updateStatus('Comanda finalizată');
          this.prepareShipment();
      }, 1500);
  }

  prepareShipment() {
      // Adaugă logica pentru pregătirea expedierii aici
      this.updateStatus('Expediere în curs');
      this.notifyCustomer();
  }

  updateStatus(newStatus) {
      this.status = newStatus;
      console.log(`Status actualizat: ${this.status}`);
  }
}

function sendEmail(to, subject, body) {
  console.log(`Trimite email către: ${to}`);
  console.log(`Subiect: ${subject}`);
  console.log(`Mesaj: ${body}`);
}

// Utilizare
const newOrder = new Order(1, ['Produs 1', 'Produs 2']);
newOrder.processPayment();

  }

  prepareShipment() {
      // Adaugă logica de pregătire a expedierii aici
  }

  updateStatus(newStatus) {
      this.status = newStatus; // Actualizează starea comenzii
  }
}

function sendEmail(to, subject, body) {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
}

// Exemplu de utilizare a clasei Order
const newOrder = new Order(1, ['Item 1', 'Item 2']);
newOrder.processPayment(); // Procesează plata comenzii
newOrder.fulfillOrder(); // Finalizează comanda
newOrder.prepareShipment(); // Pregătește expedierea
newOrder.notifyCustomer(); // Notifică clientul prin email








