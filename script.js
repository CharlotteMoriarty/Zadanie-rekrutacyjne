$(function() {
    var ratio = $("#ratio").val();
    var sum = 0;
    $("#saveButton").click(function() {
        var name = $("#name").val();
        var priceEur = $("#eur").val();
        var markup =
            '<tr><td class="collapsing"><div class="ui fitted slider checkbox"><input type="checkbox" class="toRemoval"><label></label></div></td><td class="name">' +
            name +
            '</td><td class="priceEur">' +
            priceEur +
            '</td><td class="pricePln">' +
            (ratio * priceEur).toFixed(2) +
            "</td></tr>";
        $("#listing").append(markup);
        updateFields();
        updateBiggestTransaction();
    });

    $("#ratio").bind("change keyup mouseup", function() {
        ratio = $(this).val();
        $("#listing > tr").each(function() {
            var pln = $(this)
            .find($(".priceEur"))
            .text();
            newPrice = (pln * ratio).toFixed(2);
            $(this)
                .find($(".pricePln"))
                .text(newPrice);
        });
        updateFields();
        updateBiggestTransaction();
    });

    $("#removeButton").click(function(){
        $("#listing > tr").each(function() {
            var isChecked = $(this).find($(".toRemoval")).is(":checked");
            if (isChecked == true) {
                $(this).remove();
                updateFields();
                updateBiggestTransaction();
            }
        });
    });

    updateFields = function() {
        var newValue = 0.0;
        $("#listing > tr").each(function() {
            newValue += parseFloat($(this).find($(".pricePln")).text());
        });
        $("#sum").text(newValue.toFixed(2));
    }

    updateBiggestTransaction = function() {
        var biggest = {};
        $("#listing > tr").each(function() {
            var temp = {};
            temp.name = $(this).find($(".name")).text();
            temp.eur = $(this).find($(".priceEur")).text();
            temp.pln = parseFloat($(this).find($(".pricePln")).text());
            b = biggest.pln | 0;
            if (temp.pln > b) {
                biggest = temp;
            };
        });
        var markup = 'Name: ' + biggest.name + '<br />Price (EUR): ' + biggest.eur + '<br />Price (PLN):' + biggest.pln;
        $("#biggestTransaction").html(markup);
    }
});
