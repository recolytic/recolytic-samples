;(function(){
	$(window).load(function(){
		console.log(_rtq);
		var pageType = "landingPage";
		// pageType, memberId, actionWeight,limit, skip, callback 
		_rtq.recommendRecenltyVisited(pageType, null, null, null, null, function(recommendations){
			if(recommendations && recommendations.length > 0){
				var recoholder = $('#recoHolder')[0];
				recommendations.forEach(function(reco) {
				  	var li = document.createElement("div");
					li.innerHTML = '<li class="media"><a href="'+reco.id+'.html?recolytic-id='+reco.id+'&recolytic-s=recently%20visited&recolytic-l='+pageType+'&recolytic-uptake"><img class="media-object pull-left" src="'+reco.media+'" ></a><div class="media-body"><h4>'+reco.title+'</h4></div> </li>';
					while(li.firstChild) {
						recoholder.appendChild(li.firstChild);
					}	
				});
			}
		});
	});
})();