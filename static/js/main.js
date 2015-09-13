$(function() {
    // Hide order form for new customers and those who wasn't reffered to it
    if(window.location.hash.substring(1) != "order_form") {
        $('.order-section').hide();
    }

    // Order buttons
    $('.btn-order').click(function(event) {
        event.preventDefault();
        $.scrollTo($('.order-form-placemark'), 300, {
            offset: 50,
            onAfter: function() {
                var $animated_blocks = $('.order-section').find('.fade-block');

                $animated_blocks.css({opacity: 0});
                $('.order-section').slideDown(400);
                var i = 0;
                $animated_blocks.each(function() {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.animate({opacity: 1}, 350)
                    }, 100*i)
                    i++;
                })

                $('.order-section .form-control[name=NAME]').select();
            }
        });

        return false;
    });

    // Send data from form to Mailchimp
    $('.order-form').submit(function(event) {
        var $form = $(this);
        var $submit_btn = $form.find('button[type=submit]');
        var $submit_btn_text = $submit_btn.find('.btn-text');
        var $spinner = $submit_btn.find('.spinner');
        var $submit_btn_status = $spinner.find('.order-form-activitymark');
        var $form_success_message = $('.order-form-message_success');
        var $form_error_message = $('.order-form-message_error');

        // Prevent double submit
        $submit_btn.addClass('active').attr('disabled', true);

        $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            error: function(err) {
                // URL is wrong or connection error, show sorry message
                $submit_btn.removeAttr('disabled');
                $submit_btn_text.text('Попробовать еще раз');
                $form.slideUp();
                $form_error_message.removeClass('hidden').hide().slideDown();
            },
            success: function(data) {
                console.log(data);
                if (data.result != "success") {
                    // Something went wrong, parse data.msg string and display message
                    $submit_btn.removeAttr('disabled');
                    $submit_btn_text.text('Попробовать еще раз');
                    // TODO: Show validation errors
                } else {
                    // It worked, so hide form and display thank-you message.
                    $submit_btn.removeClass('btn-primary').addClass('btn-success');
                    $spinner.removeClass('spinner');
                    $submit_btn_status.removeClass('fa-refresh fa-spin').addClass('fa-check');
                    $submit_btn_text.text('Заказ отправлен');
                    $form.slideUp();
                    $form_success_message.removeClass('hidden').hide().slideDown();
                }
                $submit_btn.removeClass('active');
            },
            complete: function() {
                $submit_btn.removeClass('active');
            }
        });

        event.preventDefault();
        return false;
    })
});
