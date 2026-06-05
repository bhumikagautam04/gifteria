$(document).ready(function(){
  $.getJSON("/product/fetch_all_category", function(response){
    //  alert(JSON.stringify(response))
    // Handle the response
    response.data.map((item)=>{
        $("#categoryid").append($("<option>").text(item.categoryname).val(item.categoryid))
    })
     })
  $("#categoryid").change(function(){
    // alert("Changed");
     $("#subcategoryid").empty()
     $("#subcategoryid").append($("<option>").text("-Select Subcategory-"))
    $.getJSON("/product/fetch_all_subcategory_by_categoryid",{categoryid: $("#categoryid").val()}, function(response){
      // alert(JSON.stringify(response));
      response.data.map((item)=>{
        // alert(JSON.stringify(item));
        $("#subcategoryid").append($("<option>").text(item.subcategoryname).val(item.subcategoryid))
      })
    })
  })
  })
