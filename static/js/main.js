$(function() {
    $('.order-form').hide();
    $('.btn-order').click(function(event) {
        event.preventDefault();
        $.scrollTo($('.order-form-placemark'), 500, {
            offset: 50,
            onAfter: function() {
                $('.order-form').slideDown(400);
            }
        });

        return false;
    });
});
