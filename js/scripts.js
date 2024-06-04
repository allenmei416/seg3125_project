$(document).ready(function() {
    $('#appointmentForm').submit(function(e) {
        e.preventDefault();

        let appointments = [];

        $('#appointmentsContainer').each(function() {
            let appointment = {
                fullName: $(this).find('.fullName').val(),
                email: $(this).find('.email').val(),
                serviceType: $(this).find('.serviceType').val(),
                serviceExpert: $(this).find('.serviceExpert').val(),
                appointmentTime: $(this).find('.appointmentTime').val(),
                appointmentDate: $(this).find('.appointmentDate').val(),
                isRecurring: $(this).find('.isRecurring').val(),
                recurringInterval: $(this).find('.recurringInterval').val(),
                familyMembers: []
            };

            $(this).find('.family-members-form').each(function() {
                let familyMember = {
                    name: $(this).find('.memberFullName').val(),
                    serviceType: $(this).find('.serviceType').val(),
                    serviceExpert: $(this).find('.serviceExpert').val()
                };
                if (familyMember.name && familyMember.serviceType && familyMember.serviceExpert) {
                    appointment.familyMembers.push(familyMember);
                }
            });

            appointments.push(appointment);
        });
        showConfirmationMessage(appointments);
    });

    $('.add-appointment-btn').click(function() {
        let newAppointmentBlock = $('.family-members-form:first').clone();
        newAppointmentBlock.find('input').val('');
        $('#appointmentsContainer').append(newAppointmentBlock);
        $('#family-members-form').show();
    });

    $(document).on('change', '.isRecurring', function() {
        if ($(this).val() === 'yes') {
            $(this).closest('.col-md-6').find('.recurringIntervalGroup').show();
        } else {
            $(this).closest('.col-md-6').find('.recurringIntervalGroup').hide();
        }
    });
});

function showConfirmationMessage(appointments) {
    $('#confirmationMessage').empty();

    appointments.forEach(function(appointment, index) {
        let formattedDate = new Date(appointment.appointmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        let confirmationSection = `
            <div class="confirmation-section">
                <h2 class="mb-4">Booking Confirmation</h2>
                <p><strong>Thank you for booking with Stylish Cuts, ${appointment.fullName}!</strong></p>
                <p><strong>Service:</strong> ${appointment.serviceType}</p>
                <p><strong>Service Expert:</strong> ${appointment.serviceExpert}</p>
                <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
        `;

        if (appointment.isRecurring === 'yes') {
            confirmationSection += `
                <h3>Recurring Appointment:</h3>
                <p><strong>Recurring Interval:</strong> Every ${appointment.recurringInterval} days</p>
            `;
        }

        confirmationSection += `
            </div>
        `;

        if (appointment.familyMembers.length > 0) {
            confirmationSection += '<h3>Family Members:</h3>';
            appointment.familyMembers.forEach(function(member, idx) {
                let memberConfirmation = `
                    <div class="family-member-confirmation">
                        <p><strong>Family Member ${idx + 1}:</strong></p>
                        <p><strong>Name:</strong> ${member.name}</p>
                        <p><strong>Service:</strong> ${member.serviceType}</p>
                        <p><strong>Service Expert:</strong> ${member.serviceExpert}</p>
                    </div>
                `;
                confirmationSection += memberConfirmation;
            });
        }

        $('#confirmationMessage').append(confirmationSection);
    });

    $('#appointmentForm').hide();
    $('#appointment_header').hide();
    $('#confirmationMessage').show();
}

var today = new Date().toISOString().split('T')[0];
document.querySelector('.appointmentDate').value = today;
