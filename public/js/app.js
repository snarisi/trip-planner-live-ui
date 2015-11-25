/*
TODO:
Select and set the hotel
Select and add a restaurant
Select and add an activity
Remove the hotel
Remove a restaurant
Remove an activity
Add a day
Remove a day
Switch days

ITINERARY ITEM:
<div class="itinerary-item">
<span class="title">Andaz Wall Street</span>
<button class="btn btn-xs btn-danger remove btn-circle">x</button>
</div>
*/
!function() {
    $(function() {
        $('.add-btn').on('click', function() {

            var $this = $(this),
                title = $this.siblings('select').val(),
                dataSet = $this.parent().attr("id"),
                itineraryGroup = '#' + dataSet + '-itinerary';

            var selectedItem = findObject(title, dataSet);
            gmaps.drawLocation(selectedItem.place[0].location, dataSet);
            $list_item = newItineraryItem(title);
            $(itineraryGroup)
                .find('.list-group')
                .append($list_item);
        });

    });

    function findObject(title, set) {
        var data = {
            hotel: all_hotels,
            activity: all_activities,
            restaurant: all_restaurants
        }
        return data[set].filter(function(element) {
            return element.name === title;
        })[0];
    }

    function newItineraryItem(title) {
        var $list_item = $('<div class="itinerary-item"></div>');
        $list_item.append($('<span class="title">' + title + '</span>'))
            .append($('<button class="btn btn-xs btn-danger remove btn-circle">x</button>'));
        return $list_item;
    }
}();
