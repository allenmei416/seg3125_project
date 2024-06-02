// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Add any JavaScript interactions here
});


$(document).ready(function() {
    $('#appointmentForm').submit(function(e) {
        e.preventDefault();
        // Fetch values from the form
        var service = $('#serviceType').val();
        var serviceExpert = $('#serviceExpert').val();
        var appointmentTime = $('#appointmentTime').val();
        var appointmentDate = $('#appointmentDate').val();

        // Update the confirmation message with form values
        $('#serviceMessage').text(service);
        $('#serviceExpertMessage').text(serviceExpert);
        $('#appointmentTimeMessage').text(appointmentTime);
        $('#appointmentDateMessage').text(appointmentDate);

        // Hide the form and display the confirmation message
        $('#appointmentForm').hide();
        $('#appointment_header').hide();
        $('#confirmationMessage').show();
    });
});

