"use strict";
	function loadPage(pwd) {
		var hash= pwd;
		hash= Sha1.hash(pwd);
		var url= hash + '/' ;
        $.ajax({
			url : url,
			dataType : "html",
			success : function(data) {
				window.location= url;
			},
			error : function(xhr, ajaxOptions, thrownError) {
				parent.location.hash= hash;
				//$("#wrongPassword").show();
				$("#password").attr("placeholder","That password is incorrect.");
				$("#password").val("");
			}
		});
	}
//reload page on hashchange event – add support for old boys!
window.onhashchange = function() {
    window.location.reload();
};

	 
	$("#loginbutton").on("click", function() {
		loadPage($("#password").val());
	});
	$("#password").keypress(function(e) {
		if (e.which == 13) {
			
			loadPage($("#password").val());
		}
	});
$("#password").focus();