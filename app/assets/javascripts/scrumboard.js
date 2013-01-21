client.subscribe('/boards/'+gon.boardid, function(message) {
  //alert('Got a message: ' + message.text);
  var obj = $.parseJSON(message.text);
	if(obj!=null){
		if($("#ticket"+obj.id).length != 0){
		$("#ticket"+obj.id+" p").text(obj.text);
		$("#ticket"+obj.id).appendTo("#"+obj.lane);
		}
		else{
		$("#"+obj.lane).append($('<div class="post-it" id="ticket"><div class="window_tools"><span class="ui-icon ui-icon-minusthick">minimize</span><span class="ui-icon ui-icon-plusthick">maximize</span><span class="ui-icon ui-icon-closethick">close</span></div><p>Click to edit</p></div>').addClass(obj.color.toLowerCase()).attr("id","ticket"+obj.id));
		}
	}
});
function touchHandler(event)
{
 var touches = event.changedTouches,
    first = touches[0],
    type = "";

     switch(event.type)
{
    case "touchstart": type = "mousedown"; break;
    case "touchmove":  type="mousemove"; break;        
    case "touchend":   type="mouseup"; break;
    default: return;
}
var simulatedEvent = document.createEvent("MouseEvent");
simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);

first.target.dispatchEvent(simulatedEvent);
var $target = $(event.target);  
if( $target.hasClass('post-it') ) {  
    event.preventDefault();  
}
}
function updateStory(ticket){
client.publish('/boards/'+gon.boardid, {
  text: JSON.stringify(ticket)
});
}
function submitStory(content){
if(content.current!=content.previous){
var id = this.parent().attr('id');
if(content.current==""){
$(this).append("Click to edit");
content.current="Click to edit";
}
var ticket = new Object();
ticket.id=id.split('ticket')[1];
ticket.text=content.current;
ticket.lane =$(this).parent().parent().attr('id');
ticket.color=$(this).parent().attr('class').split(' ')[-1];
ticket.action="editStory";
updateStory(ticket);
//$.put("http://myscrumboard.herokuapp.com/stories/"+ticket.id,{id:id,text:text,color:color,lane:lane});
$.ajax({
  url: "http://myscrumboard.herokuapp.com/stories/"+ticket.id,
  type: 'PUT',
  dataType: 'jsonp',
  data: "id="+ticket.id+"&text="+ticket.text+"&color="+ticket.color+"&lane="+ticket.lane,
  success: function(data) {
    alert('Load was performed.');
  }
});
//$.post("service.php",{id:id,text:content.current,action:"editStory"});
}

}
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
function longpoll(data){
var obj = $.parseJSON(data);
	if(obj!=null){
		if($("#ticket"+obj.id).length != 0){
		$("#ticket"+obj.id+" p").text(obj.text);
		$("#ticket"+obj.id).appendTo("#"+obj.lane);
		}
		else{
		$("#"+obj.lane).append($('<div class="post-it" id="ticket"><div class="window_tools"><span class="ui-icon ui-icon-minusthick">minimize</span><span class="ui-icon ui-icon-plusthick">maximize</span><span class="ui-icon ui-icon-closethick">close</span></div><p>Click to edit</p></div>').addClass(obj.color.toLowerCase()).attr("id","ticket"+obj.id));
		}
	}
var id = $.getUrlVars()['id'];
/*$.ajax({
			type:"GET",
			url: "service.php?action=longpoll&id="+id,
			success: function(data){
			longpoll(data)
			},
			error:function(){
			longpoll()
			},
			async:true,
			cache:false
		});*/
}
$(document).ready(setTimeout(function() {
		document.addEventListener("touchstart", touchHandler, true);
   document.addEventListener("touchmove", touchHandler, true);
   document.addEventListener("touchend", touchHandler, true);
   document.addEventListener("touchcancel", touchHandler, true); 
		$("#addStory").click(function(e)
			{
			var id = $.getUrlVars()['id'];
			var color = $("#colorselect").val();
			$.post("service.php",{scrumboardid:id,color:color,action:"addStory"},function(data) {
				 $("#take-off").append($('<div class="post-it" id="ticket"><div class="window_tools"><span class="ui-icon ui-icon-minusthick">minimize</span><span class="ui-icon ui-icon-plusthick">maximize</span><span class="ui-icon ui-icon-closethick">close</span></div><p>Click to edit</p></div>').addClass(color.toLowerCase()).attr("id","ticket"+data));
			   $("#ticket"+data+" p").editable({onSubmit:submitStory,type:'textarea'});
			   $(".ui-icon-closethick").click(function(e){
			var id = $(this).parent().parent().attr('id');
			$(this).parent().parent().remove();
			$.post("service.php",{id:id,action:"deleteStory"});
		});
		$(".ui-icon-plusthick").click(function(e){
			$(this).parent().parent().animate({'height':"139px"});
		});
		$(".ui-icon-minusthick").click(function(e){
			$(this).parent().parent().animate({'height':"16px"});
		});
		
			   });
			});
		$( "#take-off, #in-flight,#landed" ).sortable({
			connectWith: ".column",
			placeholder: 'ui-state-highlight',
			receive: function(event, ui) {
			var id=ui.item.attr('id');
			var lane = ui.item.parent().attr('id');
			ticket = new Object();
			
			ticket.id=id.split('ticket')[1];
			ticket.text=ui.item.children("p").text();
			ticket.lane =ui.item.parent().attr('id');
			ticket.color=ui.item.attr('class').split(' ')[1];
			ticket.action="moveStory";
			updateStory(ticket);
			
			}
		}).disableSelection();
		$(".post-it p").editable({onSubmit:submitStory,type:'textarea'});
		$(".ui-icon-closethick").click(function(e){
			var id = $(this).parent().parent().attr('id');
			$(this).parent().parent().remove();
			$.post("service.php",{id:id,action:"deleteStory"});
		});
		$(".ui-icon-plusthick").click(function(e){
			$(this).parent().parent().animate({'height':"139px"});
		});
		$(".ui-icon-minusthick").click(function(e){
			$(this).parent().parent().animate({'height':"16px"});
		});
		longpoll();
	},1000));