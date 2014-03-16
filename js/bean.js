
function cf() {
    var active = $('#product div.opaque');
    var next = (active.next('div.product-img').length > 0) ? active.next() : $('#product div.product-img:first');
    $("#product div.product-img").removeClass("opaque");
    next.addClass("opaque");
}

function showCart() {
    $("#cart-div").fadeIn();
}

function hideCart() {
    $("#cart-div").fadeOut();
}

function divStart(size) {
	return "<div class='small-"+size+" columns'>";
}
function divEnd() {
    return "</div>";
}

function renderCart() {
    var cartList = readCartList();
    $("#cart-body").html("");
    for(var i=0 ; i<cartList.length ; i++) {
	var item = cartList[i];
	var rowHtml = divStart(1) + (i+1) + divEnd() +
	    		divStart(9) + item.name + divEnd() +
			divStart(2) + item.amount + divEnd();
	rowHtml = "<div class='row'>" + rowHtml + "</div>";
	$("#cart-body").append(rowHtml);
    }
}

function readCartList() {
    var cartList = [];
    return (typeof window.cartList === "undefined") ? cartList : window.cartList;
}

function writeCartList(cartList) {
    window.cartList = cartList;
}

function addToCart() {
    $.cookie.json = true;
    // create product object
    var product = {};
    product.name = $("#product-name").html();
    product.amount = parseInt($("#product-amount").val());
    // get list from cookie
    var cartList = readCartList();
    cartList.push(product);
    writeCartList(cartList);

    renderCart();
    showCart();
}

$(function(){
    $(document).foundation();
    // set product background image 
    setInterval('cf()', 7000);
    $("#buy-btn").on("click", addToCart);
    $("#cart-close-btn").on("click", hideCart);
    // set item-image hover effect
    $(".product-item-img").hover(
	function() {
	    if(!$(this).hasClass("active-item-img")) {
		$(this).removeClass("desaturate");
	    }
	},
	function(){
	    if(!$(this).hasClass("active-item-img")) {
		$(this).addClass("desaturate");
	    }
	});

    // set item-img click effect
});
