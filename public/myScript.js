

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();  
    
    var counter = 2;
		
    $("#addButton").click(function () {
				
	if(counter>5){
            alert("Only 5 flavors allow");
            return false;
	}   
		
		
	var number;
	if(counter==2){
	    number="2nd";
	}else if(counter==3){
	    number="3rd";
	}else{
	    number=counter+"th";
	}
	var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'splitBox' + counter);
    newTextBoxDiv.addClass("row");
                
	newTextBoxDiv.after().html(
	      ' <div class="col-4">'+
	      '<label class="split">Quantity</label>' +
	      '<input name="Quantity'+counter+'" type="number" class="form-control" placeHolder="N/A">' +
	      '</div>'+
	      ' <div class="col-8">'+
	      ' <label class="split">Type Your '+number+' Flavor</label>'+
          '<input type="text" name="Flavors'+counter+'"  class="form-control" placeHolder="N/A">'+
          '</div>'
	      );
            
	newTextBoxDiv.appendTo("#splitGroup");
   $('input[name=splitNumber]').val(counter-1);
				
	counter++;
     });

     $("#removeButton").click(function () {
	if(counter==1){
          alert("You have at least choose one flavor");
          return false;
       }   
   
	counter--;
     
			
        $("#splitBox" + counter).remove();
		  var split=$('input[name=splitNumber]').val(); 
		  $('input[name=splitNumber]').val(split-1); 
     });
     
     
 $("#frenchFries").click(function() {
  $(".frenchFriesOption").toggle();
  $(".friedRiceOption").hide();
  $('.friedRiceOption input:checked').prop('checked',false);
 
    
  });
   $("#friedRice").click(function() {
    $(".friedRiceOption").toggle();
    $(".frenchFriesOption").hide();
    $('.frenchFriesOption input:checked').prop('checked',false);


    
  });
$("#none").click(function() {
$(".friedRiceOption").css('display','none');
$(".frenchFriesOption").css('display','none');
$('.friedRiceOption input:checked').prop('checked',false);
$('.frenchFriesOption input:checked').prop('checked',false);


    
  });
    
});