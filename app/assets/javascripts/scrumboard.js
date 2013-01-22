$.ajaxSetup({
    'beforeSend': function (xhr) {
        var token = $("meta[name='csrf-token']").attr("content");
        xhr.setRequestHeader("X-CSRF-Token", token);
    }
});
client.subscribe('/boards/' + gon.boardid, function (message) {
    var obj = $.parseJSON(message.text);
    var destroy = message.destroy;

    if (destroy) {
        $("#ticket" + obj.id).remove();
    }
    else {

        if (obj != null) {
            if ($("#ticket" + obj.id).length != 0) {
                $("#ticket" + obj.id + " p").text(obj.text);
                $("#ticket" + obj.id).appendTo("#" + obj.lane);
            }
            else {
                $("#" + obj.lane).append($('<div class="post-it" id="ticket"><div class="window_tools"><span class="ui-icon ui-icon-minusthick">minimize</span><span class="ui-icon ui-icon-plusthick">maximize</span><span class="ui-icon ui-icon-closethick">close</span></div><p>Click to edit</p></div>').addClass(obj.color.toLowerCase()).attr("id", "ticket" + obj.id));

                var newTicket = $("#ticket" + obj.id);

                newTicket.children("p").editable({ onSubmit: editStory, type: 'textarea' });

                $(".ui-icon-closethick").click(function (e) {
                    var id = $(this).parent().parent().attr('id');
                    $(this).parent().parent().remove();
                    deleteStory(id.split('ticket')[1]);
                    //$.post("service.php",{id:id,action:"deletestory"});
                });
                $(".ui-icon-plusthick").click(function (e) {
                    $(this).parent().parent().animate({ 'height': "139px" });
                });
                $(".ui-icon-minusthick").click(function (e) {
                    $(this).parent().parent().animate({ 'height': "16px" });
                });

            }
        }
    }
});
function touchHandler(event) {
    var touches = event.changedTouches,
    first = touches[0],
    type = "";

    switch (event.type) {
        case "touchstart": type = "mousedown"; break;
        case "touchmove": type = "mousemove"; break;
        case "touchend": type = "mouseup"; break;
        default: return;
    }
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    var $target = $(event.target);
    if ($target.hasClass('post-it')) {
        event.preventDefault();
    }
}

function deleteStory(id) {
    var token = $("meta[name='csrf-token']").attr("content");

    $.ajax({
        url: "/stories/" + id,
        type: 'post',
        data: {
            _method: "DELETE", authenticity_token: token
        },
        headers: {
            "X-CSRF-Token": token  //for object property name, use quoted notation shown in second
        },
        success: function (data) {
            console.info(data);
        }

    });
}

function editStory(content) {
    if (content.current != content.previous) {
        var id = this.parent().attr('id');
        if (content.current == "") {
            $(this).append("Click to edit");
            content.current = "Click to edit";
        }
        var ticket = new Object();
        ticket.id = id.split('ticket')[1];
        ticket.text = content.current;
        ticket.lane = $(this).parent().parent().attr('id');
        ticket.color = $(this).parent().attr('class').split(' ')[1];
        var token = $("meta[name='csrf-token']").attr("content");
        $.ajax({
            url: "/stories/" + ticket.id,
            type: 'post',
            data: {
                _method: "PUT", authenticity_token: token, story: ticket
            },
            headers: {
                "X-CSRF-Token": token  //for object property name, use quoted notation shown in second
            },
            success: function (data) {
                console.info(data);
            }
        });
    }
}
$(document).ready(function () {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
    $("#addStory").click(function (e) {
        var id = gon.boardid;
        var color = $("#colorselect").val();
        var token = $("meta[name='csrf-token']").attr("content");
        var ticket = new Object();
        ticket.boardid = id;
        ticket.color = color.toLowerCase();
        ticket.lane = "take-off";
        ticket.text = "Click to edit";
        $.ajax({
            url: "/stories/",
            type: 'post',
            data: {
                _method: "POST", authenticity_token: token, story: ticket
            },
            headers: {
                "X-CSRF-Token": token  //for object property name, use quoted notation shown in second
            },
            success: function (data) {
                console.info(data);
            }

        });
    });
    $("#take-off, #in-flight,#landed").sortable({
        connectWith: ".column",
        placeholder: 'ui-state-highlight',
        receive: function (event, ui) {
            var id = ui.item.attr('id');
            var lane = ui.item.parent().attr('id');
            ticket = new Object();

            ticket.id = id.split('ticket')[1];
            ticket.text = ui.item.children("p").text();
            ticket.lane = ui.item.parent().attr('id');
            ticket.color = ui.item.attr('class').split(' ')[1];
            ticket.action = "moveStory";
            updateStory(ticket);

        }
    }).disableSelection();
    $(".post-it p").editable({ onSubmit: editStory, type: 'textarea' });
    $(".ui-icon-closethick").click(function (e) {
        var id = $(this).parent().parent().attr('id');
        $(this).parent().parent().remove();
        deleteStory(id.split('ticket')[1]);
    });
    $(".ui-icon-plusthick").click(function (e) {
        $(this).parent().parent().animate({ 'height': "139px" });
    });
    $(".ui-icon-minusthick").click(function (e) {
        $(this).parent().parent().animate({ 'height': "16px" });
    });
});