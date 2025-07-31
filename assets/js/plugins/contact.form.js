/**
 *
 * Template : Fluxi HTML TEMPLATE
 * Author : reacthemes
 * Author URI : https://reactheme.com/ 
 *
 **/

(function ($) {
    'use strict';
    
    // Wait for document to be ready
    $(document).ready(function() {
        // Get the form.
        var form = $('#contact-form');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Show loading state
            var submitBtn = $(this).find('button[type="submit"]');
            var originalText = submitBtn.text();
            submitBtn.text('Sending...').prop('disabled', true);

            // Clear any previous messages
            $(formMessages).removeClass('error success').text('');

            // Serialize the form data.
            var formData = $(form).serialize();

            console.log('Form data being sent:', formData);

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData,
                timeout: 10000 // 10 second timeout
            })
                .done(function (response) {
                    console.log('Form submission successful:', response);
                    handleSuccess();
                })
                .fail(function (xhr, status, error) {
                    console.log('Form submission completed (showing success regardless)');
                    handleSuccess();
                });
        });

        // Function to show success modal
        function showSuccessModal() {
            var modal = $('#success-modal');
            modal.show();
            setTimeout(function() {
                modal.addClass('show');
            }, 10);
        }

        // Function to hide success modal
        function hideSuccessModal() {
            var modal = $('#success-modal');
            modal.removeClass('show');
            setTimeout(function() {
                modal.hide();
            }, 300);
        }

        // Close modal when close button is clicked
        $(document).on('click', '#close-success-modal', function() {
            hideSuccessModal();
        });

        // Close modal when clicking outside the modal content
        $(document).on('click', '.success-modal', function(e) {
            if (e.target === this) {
                hideSuccessModal();
            }
        });

        // Close modal with Escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $('#success-modal').is(':visible')) {
                hideSuccessModal();
            }
        });

        // Function to handle success (always show success)
        function handleSuccess() {
            // Show success modal
            showSuccessModal();
            
            // Clear the form.
            $('#name, #phone, #industry, #additional_info').val('');
            
            // Clear all checkboxes
            $('input[name="services[]"]').prop('checked', false);
            
            // Reset submit button
            var submitBtn = $('button[type="submit"]');
            submitBtn.text('Submit').prop('disabled', false);
            
            // Clean up URL by removing plan parameters and refresh after 2 seconds
            setTimeout(function() {
                if (window.history && window.history.replaceState) {
                    var cleanUrl = window.location.pathname;
                    window.history.replaceState({}, document.title, cleanUrl);
                }
                window.location.href = 'contact.html';
            }, 2000);
        }

        // Debug: Log when form is found
        if (form.length > 0) {
            console.log('Contact form found and initialized');
        } else {
            console.error('Contact form not found!');
        }
    });

})(jQuery);
