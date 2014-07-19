;(function(){

	function getProductId(){
    	var elem = $("meta[property='og\\:url']");
    	if(elem && elem.attr('content')) return elem.attr('content');
    	else return false;
  	}	
	//pluginAvailable(function(){
	$(window).load(function(){		
		var resourceId =  getProductId();
		if(resourceId){
			var pageType = "productPage";
			//pageType, resourceId, isScoped, limit, skip, callback
			_rtq.recommendItemToItem(pageType, resourceId, null, null, null, function(recommendations){
				if(recommendations && recommendations.length > 0){
					var recoholder = $('#recoHolder')[0];
					recommendations.forEach(function(reco) {
				  		var li = document.createElement("div");
						li.innerHTML = '<li> <div class="span2 text-center" style="margin-left:0px;"><a  href="'+reco.id+'.html?recolytic-id='+reco.id+'&recolytic-s=item%20to%20item&recolytic-l='+pageType+'&recolytic-uptake"  class="thumbnail"><img src="'+reco.media+'" ></a><div class="caption"><h4>'+reco.title+'</h4></div></div></li> ';
						while(li.firstChild) {
    						recoholder.appendChild(li.firstChild);
						}	
					});
				}
			})
		}
	});
})();