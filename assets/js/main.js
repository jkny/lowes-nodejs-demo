$(document).ready(function(){

// parse local json file to avoid CORS error
var getRequest = new XMLHttpRequest();
getRequest.open('GET', '/assets/products');
getRequest.onload = function() {
if (getRequest.status >= 200 && getRequest.status < 400) {
var jsonData = JSON.parse(getRequest.responseText);
createHTML(jsonData);
console.log(jsonData);
} else {
console.log("We connected to the server, but it returned an error.");
}
};
getRequest.onerror = function() {
console.log("Connection error");
};
getRequest.send();

//handlebars helper check to add a row every 3 items 
Handlebars.registerHelper('ifThird', function (index, options) {
   if(index%3 == 0 && index != 0){
            return options.fn(this);
       } else {
            return options.inverse(this);
         }
 
});

// render json in html via handlebars
function createHTML(prodData) {
// var rawTemplate = document.getElementById("prodTemplate").innerHTML;
// var compiledTemplate = Handlebars.compile(rawTemplate);
// var ourGeneratedHTML = compiledTemplate(prodData);
// var prodContainer = document.getElementById("prod-container");
// prodContainer.innerHTML = ourGeneratedHTML;

var rawTemplate = $("#prodTemplate").html();
var compiledTemplate = Handlebars.compile(rawTemplate);
var ourGeneratedHTML = compiledTemplate(prodData);
$("#prod-container").html(ourGeneratedHTML);

//alert price when clicking Add To Cart button
$('#alerter').click(function(){
var value = $("#masthead .price").html();
alert(value);
});

//swap content on mouseover function
$("div.item").mouseover(function() {
var itemVal = ($(this).attr('id'));
var imagepath = $("#" + itemVal + " .header_only").attr("src");
$("#masthead_img").attr("src",imagepath);
var value = $("#" + itemVal + " .price").html();
$("#masthead .price").html(value);
var description = $("#" + itemVal + " .desc").html();
$("#masthead .desc").html(description);
var bullet_data = $("#" + itemVal + " .bull").html();
$("#masthead #bullets").html(bullet_data);
});

}
});