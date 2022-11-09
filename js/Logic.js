if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded", ready)

} else{
    ready()
}

function ready(){
var removeCartItemButtons=document.getElementsByClassName("btn-danger")
for(var i=0;i<removeCartItemButtons.length;i++)
    {
    var button=removeCartItemButtons[i]
    button.addEventListener("click",removeCartItem)
     }
     // Lets deal with quantityyy
     var quantityInput=document.getElementsByClassName("cart-quantity-input")
     for(var i=0;i<quantityInput.length;i++){
         var input=quantityInput[i]
         input.addEventListener("change",quantityChanged)
     }
      var addToCartButton=document.getElementsByClassName("shop-item-button")
      for(var i=0;i<addToCartButton.length;i++){
        var buttons=addToCartButton[i]
        buttons.addEventListener("click",addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
function purchaseClicked(total) {
        alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    cartTotal()
}

function removeCartItem(event){
    var buttonClicked=event.target 
    buttonClicked.parentElement.parentElement.parentElement.remove() 
        cartTotal();
}

function quantityChanged(event){
    var input=event.target
     if(isNaN(input.value)||input.value<=0){
        input.value=1
     }
     cartTotal()
}

function addToCartClicked(event){
    var button=event.target
    var shopItem=button.parentElement.parentElement
    var title=shopItem.getElementsByClassName("card-title")[0].innerText
    var price=shopItem.getElementsByClassName("shop-item-price")[0].innerText
  addItemtoCart(title,price)
  cartTotal()
}

function addItemtoCart(title,price){
    var cartRow=document.createElement("div")
    cartRow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName("cart-items")[0]
    var cartItemNames=cartItems.getElementsByClassName("card-title")
    for(var i=0;i<cartItemNames.length;i++){
        if (cartItemNames[i].innerText==title)
        {
            alert("This item is already added to cart!")
            return 
        }
    }
    var cartRowCentent=`
    <div class="cart-item cart-column">
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-column cart-quantity">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger cart-quantity-button" type="button">
      <i class="fa fa-times" aria-hidden="true"></i>
    </button>
    </div>  
  </div>`
  cartRow.innerHTML=cartRowCentent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0],addEventListener("change",quantityChanged)
}
// Now we need to deal with the total
function cartTotal(){
    var cartItemContainer=document.getElementsByClassName("cart-items")[0]
    var cartRows=cartItemContainer.getElementsByClassName("cart-row")
    var total=0
    for(var i=0;i<cartRows.length;i++){
        var cartRow=cartRows[i]
        var priceElement=cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement=cartRow.getElementsByClassName("cart-quantity-input")[0]
       var price=parseFloat(priceElement.innerText.replace("$"," "))
       var quantity=quantityElement.value
       total=total+(price*quantity)
    }
    total=Math.round(total*100)/100
    document.getElementsByClassName("cart-total-price")[0].innerText="$"+total
}

    // Lets deal with the search bar
    // const search =() =>{
    //     const searchbox=document.getElementById("kerkim").value.toUpperCase();
    //     const storeitems=document.getElementsByClassName("card");
    //     const product=document.querySelectorAll("card-body");
    //     const pname=storeitems.getElementsByClassName("desc");

    //     for(var i=0;i<pname.length;i++){
    //         let match =product[i].getElementsByClassName("desc")[0];

    //         if (match){
    //             let textvalue=match.textContent || match.innerHTML

    //             if(textvalue.toUpperCase().indexOf(searchbox)> -1){
    //                product[i].style.display=""; 
    //             }else {
    //                 product[i].style.display="none";
    //             }
    //         }
    //     }
    // }