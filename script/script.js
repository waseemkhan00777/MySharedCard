//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var cardvalue="";
var namevalue="";
var emailvalue="";
var positionvalue="";
var prev_id = "";
var number_of_connections = 0;
var once = 1;
var flag = false;
$(".next").click(function(){
	
	namevalue = document.forms["user_input_data"]["name"].value;
	emailvalue = document.forms["user_input_data"]["email"].value;
	positionvalue = document.forms["user_input_data"]["position"].value;
	
	if( document.getElementById("cropzee-input").files.length == 0 ){
		var span = document.createElement('span');
        span.innerHTML = ['<p style="background-color:#F2DEDE;margin-top:6px;font-size:16px; ">Please Select an Image</p>'].join('');    
		document.getElementById('message').insertBefore(span, null);

		setTimeout(function(){
			$('#message').hide();
		  }, 4000);
	}
	else
	{
		$("#message").remove();
		if(!namevalue=="" && !emailvalue=="" && !positionvalue=="")
		{
			current_fs = $(this).parent();
			next_fs = $(this).parent().next();
			
			//activate next step on progressbar using the index of next_fs
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			
			//show the next fieldset
			next_fs.show(); 
			current_fs.hide();
		}
		else
		{
			if(namevalue=="")
			{
				document.forms["user_input_data"]["name"].style.borderColor = "red";
				var span = document.createElement('span');
        		span.innerHTML = ['<p style="background-color:#F2DEDE;margin-top:6px;font-size:16px; ">Please enter name</p>'].join('');    
				document.getElementById('name_msg').insertBefore(span, null);

				setTimeout(function(){
					$('#name_msg').hide();
				  }, 2000);
			}
				
			else if(emailvalue=="")
			{
				document.forms["user_input_data"]["name"].style.borderColor = "gray";

				document.forms["user_input_data"]["email"].style.borderColor = "red";
				var span = document.createElement('span');
        		span.innerHTML = ['<p style="background-color:#F2DEDE;margin-top:6px;font-size:16px; ">Please enter email</p>'].join('');    
				document.getElementById('email_msg').insertBefore(span, null);

				setTimeout(function(){
					$('#email_msg').remove();
				  }, 2000);
			}
			else if(!flag){
				var $result = $("#validate_email");
				var email = $("#email").val();
				// $result.text("");

				if (validateEmail(email)) {
					flag = true;
				} else {
					$result.text("please enter valid email e.g abc@xyz.com");
					setTimeout(function(){
						$('#validate_email').hide();
					}, 2000);
				}
			}

			else if(positionvalue=="")
			{
				document.forms["user_input_data"]["name"].style.borderColor = "gray";
				document.forms["user_input_data"]["email"].style.borderColor = "gray";
				document.forms["user_input_data"]["position"].style.borderColor = "red";

				var span = document.createElement('span');
        		span.innerHTML = ['<p style="background-color:#F2DEDE;margin-top:6px;font-size:16px; ">Please enter position</p>'].join('');    
				document.getElementById('pos_msg').insertBefore(span, null);

				setTimeout(function(){
					$('#pos_msg').hide();
				  }, 2000);
			}
		}
	}

});

$(".previous").click(function(){

	document.forms["user_input_data"]["name"].style.borderColor = "gray";
	document.forms["user_input_data"]["email"].style.borderColor = "gray";
	document.forms["user_input_data"]["position"].style.borderColor = "gray";

	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	current_fs.hide();
});

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
  }

//java script for uploading profile image of card
function uploadImage(){
	document.querySelector("#cropzee-input").click();
}

//java script for uploading profile image of card
function uploadImage(){
	document.querySelector("#cropzee-input").click();
}

function displayImage(e){
	if(e.files[0]){
		var reader = new FileReader();

		reader.onload = function(e){
			document.querySelector("#cropzee-input").setAttribute("src", e.target.result);
		}
		reader.readAsDataURL(e.files[0]);
	}
}

//code to set person name and its company name on its card
var btn = document.getElementById("move_to_third_step");
btn.onclick = set_name_and_company;
function set_name_and_company(){
	var n = document.getElementById("name").value;
	document.getElementById("person_name").innerHTML = "<span>" + n + "</span>";

	var job = document.getElementById("position").value;
	document.getElementById("person_job").innerHTML = "<span style=\"font-size:14px\">" + job + "</span>";

	var all_radio_btn = document.getElementsByTagName("input");
	for(var i = 0 ;i < all_radio_btn.length; i++){
		if(all_radio_btn[i].checked){
			var selected_color = all_radio_btn[i].value;

			var cols = document.getElementsByClassName('more_div');
			for(i = 0; i < cols.length; i++) {
			  cols[i].style.borderColor = selected_color;
			}
			
			document.getElementById("outter_div").style.borderColor = selected_color;
			document.getElementById("outter_div").style.borderWidth = "2px solid";
			
			// setting the image background color
			var inner_div = document.getElementById("inner_background_color");
			inner_div.style.backgroundColor = selected_color;
			inner_div.style.borderWidth = "2px solid";
			// setting border of main_connection_div
			var main_div = document.getElementById("main_connection_div");
			main_div.style.borderColor = selected_color;
			// main_div.style.borderWidth = "1px solid";
			// setting border of static_div
			document.getElementById("static_div").style.borderColor = selected_color;
			document.getElementById("static_div").style.borderWidth = ".1rem solid";
		
			var cons_div = document.getElementsByClassName("con_div")
			for(var i=0; i<cons_div.length;i++){
				cons_div[i].style.borderColor = selected_color;
			}

			break;
		}
	}
}

//code to reset bootstrap modal connection option to default for another entry
function reset(){
	document.getElementById("connection_list").selectedIndex = "0";
	document.getElementById("input_con").value = "";
}

//inserting input field in bootstrap modal when connection is selected from list
$('#connection_list').on('change', function(){
	var connection_list = document.getElementById("connection_list");
	var selected_option = connection_list.options[connection_list.selectedIndex].value;
	var connection_input = document.getElementById("input_con");
	
	//for phone number
	if(selected_option == "phone_number"){
		connection_input.setAttribute("placeholder","Enter phone number");
	}
	else if(selected_option == "whatsapp"){
		connection_input.setAttribute("placeholder","Enter phone number");
	}
	else if(selected_option == "sms"){
		connection_input.setAttribute("placeholder","Enter phone number");
	}
	else if(selected_option == "email"){
		connection_input.setAttribute("placeholder","Enter email address");
	}
	else if(selected_option == "website"){
		connection_input.setAttribute("placeholder","Enter website link");
	}
	else if(selected_option == "instagram"){
		connection_input.setAttribute("placeholder","Instagram profile link");
	}
	else if(selected_option == "tiktok"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}
	else if(selected_option == "facebook"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}
	else if(selected_option == "twitter"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}
	else if(selected_option == "snapchat"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}	
	else if(selected_option == "telegram"){
		connection_input.setAttribute("placeholder","Enter ID link");
	}
	else if(selected_option == "skype"){
		connection_input.setAttribute("placeholder","Enter skype ID");
	}
	else if(selected_option == "zoom"){
		connection_input.setAttribute("placeholder","Enter zoom ID");
	}
	else if(selected_option == "pinterest"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}
	else if(selected_option == "tinder"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}
	else if(selected_option == "linkedin"){
		connection_input.setAttribute("placeholder","Enter profile link");
	}
	else if(selected_option == "cashapp"){
		connection_input.setAttribute("placeholder","Enter phone number");
	}
	else if(selected_option == "venmo"){
		connection_input.setAttribute("placeholder","Enter phone number");
	}
	else if(selected_option == "zelle"){
		connection_input.setAttribute("placeholder","Enter phone number");
	}
	else if(selected_option == "paypal"){
		connection_input.setAttribute("placeholder","Enter email address");
	}
	else if(selected_option == "youtube"){
		connection_input.setAttribute("placeholder","Enter channel link");
	}
	else if(selected_option == "address"){
		connection_input.setAttribute("placeholder","Enter your address");
	}
	else if(selected_option == "file"){
		connection_input.setAttribute("placeholder","Enter file link");
	}	
	else if(selected_option == "link"){
		connection_input.setAttribute("placeholder","Enter link");
	}
});

//code for displaying connection types when modal is submitted
document.getElementById("add_connection_btn").addEventListener("click",function(){
	// finding selected color
	var selected_color;
	var all_radio_btn = document.getElementsByTagName("input");
	for(var i = 0 ;i < all_radio_btn.length; i++){
		if(all_radio_btn[i].checked){
			selected_color = all_radio_btn[i].value;
			break;
		}
	}
	//var connection = document.getElementById("connection_div");
	
	// selected connection on card

	var connection_list = document.getElementById("connection_list");
	var selected_connection = document.getElementById("connection_list").options[connection_list.selectedIndex].value;	
	
	

	// typed connection information in input field
	var connection_data = document.getElementById("input_con").value;
	var dynamic_div;
	if(selected_connection === "instagram"){
		dynamic_div =
		'<div id="instagram" class="con_div" style="display:flex; flex: 1 1; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/instagram.svg" style="height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" style="margin:5px; margin-top:10px; font-weight: 600;">Instagram</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Instagram</a>'
	}
	else if(selected_connection === "zelle"){
		dynamic_div =
		'<div id="zelle" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/zelle.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Zelle</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Zelle</a>'
	}
	else if(selected_connection === "cashapp"){
		dynamic_div =
		'<div id="chashapp" class="con_div" style="display:flex;width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.is)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/cashapp.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">CashApp</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Cash App</a>'
	}
	else if(selected_connection === "facebook"){
		dynamic_div =
		'<div id="facebook" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" data-toggle="modal" onclick="edit_connection(this.id)" data-target="#edit_Modal">' +
			'<img src="./images/facebook.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Facebook</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Facebook</a>'
	}
	else if(selected_connection === "phone_number"){
		dynamic_div =
		'<div id="phone_number" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" data-toggle="modal" onclick="edit_connection(this.id)" data-target="#edit_Modal">' +
			'<img src="./images/phone.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Phone</p>'	
		'</div>';
		//	'<a href="tel:' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Phone</a>'
	}
	else if(selected_connection === "whatsapp"){
		dynamic_div =
		'<div id="whatsapp" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/whatsapp.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">WhatsApp</p>'
		'</div>';
		//		'<a href="https://wa.me/' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">WhatsApp</a>'
	}
	else if(selected_connection === "sms"){
		dynamic_div =
		'<div id="sms" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/sms.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">SMS</p>'
		'</div>';
		//'<a href="sms:' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">SMS</a>'
	}
	else if(selected_connection === "email"){
		dynamic_div =
		'<div id="email" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/email.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Email</p>'
		'</div>';
		//'<a href="mailto:' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Email</a>'
	}
	else if(selected_connection === "website"){
		dynamic_div =
		'<div id="website" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/website.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Website</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Website</a>'
	}
	else if(selected_connection === "tiktok"){
		dynamic_div =
		'<div id="tiktok" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/tiktok.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Tiktok</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">TikTok</a>'
	}
	else if(selected_connection === "twitter"){
		dynamic_div =
		'<div id="twitter" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/twitter.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Twitter</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Twitter</a>'
	}
	else if(selected_connection === "snapchat"){
		dynamic_div =
		'<div id="snapchat" class="con_div" style="display:flex;width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/snapchat.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Snapchat</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Snapchat</a>'
	}
	else if(selected_connection === "telegram"){
		dynamic_div =
		'<div id="telegram" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/telegram.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Telegram</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Telegram</a>'
	}
	else if(selected_connection === "skype"){
		dynamic_div =
		'<div id="skype" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/skype.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Skype</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Skype</a>'
	}
	else if(selected_connection === "zoom"){
		dynamic_div =
		'<div id="zoom" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/zoom.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Zoom</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Zoom</a>'
	}
	else if(selected_connection === "pinterest"){
		dynamic_div =
		'<div id="pinterest" class="con_div"  style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/pinterest.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Pinterest</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Pinterest</a>'
	}
	else if(selected_connection === "tinder"){
		dynamic_div =
		'<div id="tinder" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/tinder.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Tinder</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Tinder</a>'
	}
	else if(selected_connection === "linkedin"){
		dynamic_div =
		'<div id="linkedin" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/linkedin.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">LinkedIn</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">LinkedIn</a>'
	}
	else if(selected_connection === "venmo"){
		dynamic_div =
		'<div id="venmo" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/venmo.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Venmo</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Venmo</a>'
	}
	else if(selected_connection === "youtube"){
		dynamic_div =
		'<div id="youtube" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/youtube.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">YouTube</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">YouTube</a>'
	}
	else if(selected_connection === "paypal"){
		dynamic_div =
		'<div id="paypal" class="con_div"  style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/paypal.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">PayPal</p>'
		'</div>';
		//	'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">PayPal</a>'
	}
	else if(selected_connection === "address"){
		dynamic_div =
		'<div id="address" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/address.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Address</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Address</a>'
	}
	else if(selected_connection === "file"){
		dynamic_div =
		'<div id="file" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/file.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">File</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">File</a>'
	}
	else if(selected_connection === "link"){
		dynamic_div =
		'<div id="link" class="con_div" style="display:flex; width:50%; height:3rem; border:2px solid ' + selected_color + '" onclick="edit_connection(this.id)" data-toggle="modal" data-target="#edit_Modal">' +
			'<img src="./images/link.svg" style=" height:2rem; margin-top:7px; margin-left:5px;">' +
			'<p title="' + connection_data + '" class="font-weight-bold" style="margin:5px; margin-top:10px; font-weight: 600;">Link</p>'
		'</div>';
		//'<a href="' + connection_data + '" class="font-weight-bold" style="text-decoration:none;color:black; margin:5px; margin-top:10px; font-weight: 600;">Link</a>'
	}
	var static_div = document.getElementById("static_div");
	// connection.insertBefore(dynamic_div , static_div);	
	$(dynamic_div).insertBefore(static_div);

	number_of_connections ++;
	if(number_of_connections <= 5){
		var extra_div = document.getElementById(number_of_connections);
		extra_div.parentNode.removeChild(extra_div);
	}

	//if connection detail is empty raise error
	// var connection_input_check = document.getElementById("input_con");
	// if(connection_input_check.value === " "){
	// 	connection_input_check.style.borderColor = "red";
	// 	// code to dont allow modal submission when connection data field is empty
	// 	// code to dont allow modal submission when list is set to default option
	// }
	// if(document.getElementById("input_con").value === ""){
	// 	//document.getElementById("input_con").focus();
	// 	//return false;
	// }
})

function edit_connection(clicked_div_id){//setting if of div when it is clicked
	prev_id = clicked_div_id;
	document.getElementById(clicked_div_id).setAttribute("id","clicked");

}

//change connection
var div_btn = document.getElementById("edit_connection_btn");
div_btn.addEventListener("click",function(){
	//new connection to be added in place of current connetion
	var edited_connection = document.getElementById("edit_connection")
	var edit_connection = edited_connection.options[edited_connection.selectedIndex].value;
	var text_part = edited_connection.options[edited_connection.selectedIndex].textContent;
	if(edit_connection != "select"){
		//removing current connection image
		var tag = document.getElementById("clicked")
		tag.innerHTML = '';

		//adding new connecion image
		var img = document.createElement("img");
		img.setAttribute("src","./images/"+ edit_connection +".svg")
		img.setAttribute("style"," height:2rem; margin-top:7px; margin-left:5px;")
		tag.appendChild(img);

		//adding new connection input data
		var edit_text = document.createElement("p");
		edit_text.textContent = text_part;
		edit_text.setAttribute("title",edit_input_con.value)
		edit_text.setAttribute("class","font-weight-bold")
		edit_text.setAttribute("style","margin:5px; margin-top:10px; font-weight: 600;")
		tag.appendChild(edit_text);
		
		document.getElementById("clicked").setAttribute("id",edit_connection);
		// tag.setAttribute('id',edit_connection);
	}
})

function change_back_id(){
	document.getElementById("clicked").setAttribute("id",prev_id);
}


//removeing the connection
var div_btn = document.getElementById("remove_connection");
div_btn.addEventListener("click",function(){
	var element = document.getElementById("clicked");
	element.parentNode.removeChild(element);
})

//function for showing preview of card
function show_preview(){

	// finding selected color
	var selected_color;
	var all_radio_btn = document.getElementsByTagName("input");
	for(var i = 0 ;i < all_radio_btn.length; i++){
		if(all_radio_btn[i].checked){
			selected_color = all_radio_btn[i].value;
			break;
		}
	}

	//by default selecting design style div for 6 buttons
	document.getElementById("round_color").style.backgroundColor = selected_color;
	
	//showing last 6 buttons
	var buttons = 
				'<div id="last_buttons">' +

					'<div class="final_button_mail_div">' +
						'<div class="final_button_div" > <div class="button_div" style="background-color:'+ selected_color +'"> <img class="final_button" src="./images/icons/addhome.svg" alt=""> </div> <p class="button_text">Add Contact</p> </div>' +
						'<div class="final_button_div"><div class="button_div" style="background-color:'+ selected_color +'"><img class="final_button" src="./images/icons/addcontact.svg"    alt="" /> </div> <p class="button_text"class="button_text">Add to home</p> </div>' +
						'<div class="final_button_div"><div class="button_div" style="background-color:'+ selected_color +'"> <img class="final_button" src="./images/icons/sharecard.svg"  alt="" /> </div> <p class="button_text">Share Card</p> </div>' +
					'</div>' 
					+
					'<div class="final_button_mail_div">' +
						'<div class="final_button_div"><div class="button_div" style="background-color:'+ selected_color +'"><img class="final_button" src="./images/icons/scan.svg"       alt="" > </div> <p class="button_text">Scan Card</p> </div>' +
						'<div class="final_button_div"><div class="button_div" style="background-color:'+ selected_color +'"><img class="final_button" src="./images/icons/register.svg"       alt="" > </div> <p class="button_text">Get a Card</p> </div>' +
						'<div class="final_button_div"><div class="button_div" style="background-color:'+ selected_color +'"><img class="final_button" src="./images/icons/link.svg"       alt="" > </div> <p class="button_text">Copy Link</p> </div>' +
					'</div>' 
					+
				'</div>';
	if(once === 1){
		$("#main_connection_div").append(buttons);
		once = 2;
	}
	else{
		var btns = document.getElementsByClassName("button_div");
		for(var i=0; i < btns.length; i++){
			btns[i].style.backgroundColor = selected_color;
		}
		
		var divs = document.getElementsByClassName("final_button_div");
		for(var i=0; i < btns.length; i++){
			divs[i].style.display = "flex";
		}
	}
	
	document.getElementById("outter_div").style.borderColor = selected_color;
	document.getElementById("outter_div").style.borderWidth = "2px solid";

	for(var id = 1; id <= 5; id++){
		try{
			// exception will occur if connection are less than 5
			document.getElementById(id).style.display = "none";
		}
		catch(err){
			// catching and ingnoring exception
		}
	}
	
	document.getElementById("static_div").style.display = "none";

	var pre = document.getElementById("preview");
	pre.innerHTML = document.getElementById("to_show_preview").innerHTML;

	$("#connection_div div").each(function(){
		$(this).removeAttr("data-toggle");
	});

}

function display_buttons(id){
	// finding selected color
	var selected_color;
	var all_radio_btn = document.getElementsByTagName("input");
	for(var i = 0 ;i < all_radio_btn.length; i++){
		if(all_radio_btn[i].checked){
			selected_color = all_radio_btn[i].value;
			break;
		}
	}
	//setting design div style colors
	document.getElementById(id).style.backgroundColor = selected_color;
	if(id === "round_color"){
		
		document.getElementById("square_color").style.backgroundColor = "white";
		var btns = document.getElementsByClassName("button_div");
		for(var i=0; i < btns.length; i++){
			btns[i].style.borderRadius = "50px";
		}
		//changing image background to round border
		var back_div = document.getElementById("inner_background_color");
		back_div.style.borderTopLeftRadius = "1rem";
		back_div.style.borderTopRightRadius = "1rem";
		back_div.style.borderBottomRightRadius = "85%";
		back_div.style.borderBottomLeftRadius = "85%";

		var pre = document.getElementById("preview");
		pre.innerHTML = document.getElementById("to_show_preview").innerHTML;
	}
	else{
		document.getElementById("round_color").style.backgroundColor = "white";
		var btns = document.getElementsByClassName("button_div");
		for(var i=0; i < btns.length; i++){
			btns[i].style.borderRadius = "0px";
		}
		//changing image background to straight line
		var back_div = document.getElementById("inner_background_color");
		back_div.style.borderTopLeftRadius = "1rem";
		back_div.style.borderTopRightRadius = "1rem";
		back_div.style.borderBottomRightRadius = "0%";
		back_div.style.borderBottomLeftRadius = "0%";

		var pre = document.getElementById("preview");
		pre.innerHTML = document.getElementById("to_show_preview").innerHTML;
	}
}

//function to change things to normal when back is clicked
function revert(){
	//document.getElementById("static_div").style.visibility = "visible"
	document.getElementById("static_div").style.display = "inline";
}

//hiding 6 buttons when moving backward from preview page
function preview_back(){
	document.getElementById("static_div").style.display = "flex";

	var btns = document.getElementsByClassName("final_button_div");
	for(var i=0; i < btns.length; i++){
		btns[i].style.display = "none";
	}
	// $("#linkedin").each(function(){
	// 	//$(this).removeAttr("data-target");
	// 	$(this).attr("data-target","#edit_Modal");
	// });
	var con_div = document.getElementsByClassName("con_div")
	for(var i=0; i < con_div.length; i++){
		con_div[i].setAttribute("data-toggle","modal");
	}
	$("#static_div").each(function(){
		$(this).removeAttr("data-toggle");
		 $(this).attr("data-toggle","modal");
		// $(this).attr("id","static_div");
	});
}
//localstorage code 

// function handleFileSelect(evt) {
//     var files = evt.target.files; // FileList object

//     // Loop through the FileList and render image files as thumbnails.
//     for (var i = 0, f; f = files[i]; i++) {

//       // Only process image files.
//       if (!f.type.match('image.*')) {
//         continue;
//       }

//       var reader = new FileReader();

//       // Closure to capture the file information.
//       reader.onload = (function(theFile) {
//         return function(e) {
//           // Render thumbnail.
//           var span = document.createElement('span');
//           span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                             '" title="', escape(theFile.name), '"/>'].join('');
            
//             document.getElementById('list').insertBefore(span, null);
// 		  	// document.getElementById('displayImage').insertBefore(span, null);
//           localStorage.setItem('img', e.target.result);
//         };
//       })(f);

//       // Read in the image file as a data URL.
//       reader.readAsDataURL(f);
//     }
//   }

//   document.getElementById('image_cropper').addEventListener('change', handleFileSelect, false);


//   if(localStorage.img) { 

//          var span = document.createElement('span');
//           span.innerHTML += ['<img class="thumb" src="', localStorage.img,
//                             '" title="test"/>'].join('');
//     }