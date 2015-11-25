// {
//     1: {
//         restaurants : [],
//         activities: []
//     }
// }


!function() {
    $(function() {
        //model for storing our itinerary data
        var daysModel = {},
            currentDay = 0;
        //google maps api
        var gmaps = initialize_gmaps();

        $('.add-btn').on('click', function() {

            var $this = $(this),
                title = $this.siblings('select').val(),
                dataSet = $this.parent().attr("id"),
                itineraryGroup = '#' + dataSet + '-itinerary';

            var selectedItem = findObject(title, dataSet);
            //push the itinerary item into the correct array in our days model
            daysModel[currentDay][dataSet].push(selectedItem);
            gmaps.drawLocation(selectedItem, dataSet);
            $list_item = newItineraryItem(title);
            $list_item.data('name', selectedItem.name);
            $(itineraryGroup)
                .find('.list-group')
                .append($list_item);
        });

        $('#itineraries').on('click', '.remove', function(e) {
            var $this = $(this),
                title = $this.siblings('span').text();
            gmaps.removeLocation(title);
            $this.parent().remove();
        });

        $('#add-day').on('click', function(e) {
            var $this = $(this),
                prevDay = parseInt($this.prev().text(), 10),
                dayNum;
            if (typeof prevDay === 'number' && !isNaN(prevDay)) {
                dayNum = prevDay + 1;
            } else {
                dayNum = 1;
            }
            var $button = $('<button class="btn btn-circle day-btn">' + dayNum + '</button>');
            daysModel[dayNum] = {
                activity : [],
                restaurant: [],
                hotel : []
            };
            $this.before($button);
        });

        $('.day-buttons').on('click', '.day-btn', function (e) {
            $this = $(this);
            if ($this.attr('id') === 'add-day'){
                return;
            }
            currentDay = parseInt($this.text(), 10);
            $('.active').removeClass('active');
            $this.addClass('active');
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
