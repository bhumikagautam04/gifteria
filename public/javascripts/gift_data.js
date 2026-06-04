$(document).ready(function(){
  $.get("/product/fetch_all_category", function(response){
    //  alert(JSON.stringify(response))
    // Handle the response
    response.data.map((item)=>{
        $("#categoryid").append($("<option>").text(item.categoryname).val(item.categoryid))
    })
  })
})