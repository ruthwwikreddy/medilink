// Script to interact with the back-end APIs
document.addEventListener('DOMContentLoaded', function() {
    // Initial Load
    loadMenu();
    loadContent('home');

    // Event listeners for navigation
    document.getElementById('menu').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            loadContent(page);
            window.location.hash = page;
        }
    });
    
    // Load content based on page
    function loadContent(page) {
        fetch(`/api/templates/${page}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
                initializePage(page);
            })
            .catch(err => console.error('Error loading content:', err));
    }

    // Initialize page-specific functionalities
    function initializePage(page) {
        switch(page) {
            case 'home':
                // Initialize Home page if needed
                break;
            case 'patient_dashboard':
                loadPatientDashboard();
                break;
            case 'medicine_inventory':
                loadMedicineInventory();
                break;
            case 'patient_appointments':
                loadAppointments();
                break;
            case 'medical_records':
                loadMedicalRecords();
                break;
            case 'patient_prescription':
                loadPrescriptions();
                break;
            // Add cases for other pages
            default:
                console.log('Page not recognized:', page);
        }
    }

    // Load Navigation Menu
    function loadMenu() {
        fetch('/templates/menu.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('menu').innerHTML = html;
            })
            .catch(err => console.error('Error loading menu:', err));
    }

    // ----- Patient Portal Functions -----

    // Load Patient Dashboard
    function loadPatientDashboard() {
        fetch('/api/patients')
            .then(response => response.json())
            .then(patients => {
                const dashboard = document.getElementById('patient-dashboard');
                dashboard.innerHTML += `<p>Total Patients: ${patients.length}</p>`;
                // Add more dashboard details as needed
            })
            .catch(err => console.error('Error loading dashboard:', err));
    }

    // Load Medical Records
    function loadMedicalRecords() {
        fetch('/api/patients') // Assuming medical records are part of patient data
            .then(response => response.json())
            .then(patients => {
                const recordsList = document.getElementById('records-list');
                recordsList.innerHTML = '';

                patients.forEach(patient => {
                    recordsList.innerHTML += `<li>${patient.name} - DOB: ${patient.dob} - Doctor: ${patient.assignedDoctor}</li>`;
                });
            })
            .catch(err => console.error('Error loading medical records:', err));
    }

    // Load Prescriptions
    function loadPrescriptions() {
        fetch('/api/prescriptions')
            .then(response => response.json())
            .then(prescriptions => {
                const prescriptionList = document.getElementById('prescription-list');
                prescriptionList.innerHTML = '';

                prescriptions.forEach(rx => {
                    prescriptionList.innerHTML += `<li>${rx.medication} - ${rx.dosage}, ${rx.frequency}, Refills left: ${rx.refills}</li>`;
                });
            })
            .catch(err => console.error('Error loading prescriptions:', err));
    }

    // Load Appointments
    function loadAppointments() {
        fetch('/api/appointments')
            .then(response => response.json())
            .then(appointments => {
                const appointmentList = document.getElementById('appointments-list');
                appointmentList.innerHTML = '';

                appointments.forEach(app => {
                    appointmentList.innerHTML += `<li>${app.date} ${app.time}: Consultation with ${app.doctor}</li>`;
                });

                // Initialize form submission
                document.getElementById('book-appointment-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const date = document.getElementById('appointment-date').value;
                    const time = document.getElementById('appointment-time').value;
                    const doctor = document.getElementById('appointment-doctor').value;

                    if(date && time && doctor) {
                        const newAppointment = { date, time, doctor };
                        fetch('/api/appointments', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newAppointment)
                        })
                        .then(response => response.json())
                        .then(app => {
                            appointmentList.innerHTML += `<li>${app.date} ${app.time}: Consultation with ${app.doctor}</li>`;
                            document.getElementById('book-appointment-form').reset();
                            document.getElementById('appointment-status').textContent = 'Appointment booked successfully!';
                        })
                        .catch(err => console.error('Error booking appointment:', err));
                    }
                });
            })
            .catch(err => console.error('Error loading appointments:', err));
    }

    // Load Medicine Inventory
    function loadMedicineInventory() {
        fetch('/api/inventory')
            .then(response => response.json())
            .then(inventory => {
                const inventoryList = document.getElementById('inventory-list');
                inventoryList.innerHTML = '';

                inventory.forEach(item => {
                    inventoryList.innerHTML += `<li>${item.item} - Quantity: ${item.quantity} - Expiry: ${item.expirationDate}</li>`;
                });

                // Initialize restock reminder form
                document.getElementById('restock-reminder-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const medicineName = document.getElementById('medicine-name').value;
                    const reminderDate = document.getElementById('reminder-date').value;

                    if(medicineName && reminderDate) {
                        // Placeholder for actual reminder logic
                        alert(`Restock reminder set for ${medicineName} on ${reminderDate}`);
                        document.getElementById('restock-reminder-form').reset();
                    }
                });
            })
            .catch(err => console.error('Error loading inventory:', err));
    }

    // ----- Hospital Portal Functions -----

    // Load Hospital Dashboard
    function loadHospitalDashboard() {
        fetch('/api/patients')
            .then(response => response.json())
            .then(patients => {
                fetch('/api/appointments')
                    .then(response => response.json())
                    .then(appointments => {
                        fetch('/api/inventory')
                            .then(response => response.json())
                            .then(inventory => {
                                const dashboard = document.getElementById('hospital-dashboard');
                                dashboard.innerHTML += `
                                    <ul>
                                        <li>Bed Occupancy Rate: ${calculateBedOccupancy()}%</li>
                                        <li>Inventory Status: ${inventoryStatus(inventory)}</li>
                                        <li>Number of Registered Patients: ${patients.length}</li>
                                    </ul>
                                `;
                            });
                    });
            })
            .catch(err => console.error('Error loading hospital dashboard:', err));
    }

    // Placeholder function to calculate bed occupancy
    function calculateBedOccupancy() {
        // Implement actual logic based on beds data
        return 75; // Example value
    }

    // Placeholder function to determine inventory status
    function inventoryStatus(inventory) {
        // Implement actual logic based on inventory data
        return 'Sufficient'; // Example value
    }

    // Load Bed Management
    function loadBedManagement() {
        fetch('/api/bedmanagement')
            .then(response => response.json())
            .then(beds => {
                const bedList = document.getElementById('bed-list');
                bedList.innerHTML = '';

                beds.forEach(bed => {
                    bedList.innerHTML += `<li>Bed ${bed.bedNumber}: ${bed.status}</li>`;
                });
            })
            .catch(err => console.error('Error loading bed management:', err));
    }

    // Load Inventory Management
    function loadInventoryManagement() {
        fetch('/api/inventory')
            .then(response => response.json())
            .then(inventory => {
                const inventoryList = document.getElementById('inventory-list');
                inventoryList.innerHTML = '';

                inventory.forEach(item => {
                    inventoryList.innerHTML += `<li>${item.item} - Quantity: ${item.quantity} - Expiry: ${item.expirationDate}</li>`;
                });

                // Initialize add inventory form
                document.getElementById('add-inventory-form').addEventListener('submit', function(e) {
                    e.preventDefault();
                    const itemName = document.getElementById('item-name').value;
                    const itemQuantity = document.getElementById('item-quantity').value;
                    const expirationDate = document.getElementById('expiration-date').value;

                    if(itemName && itemQuantity && expirationDate) {
                        const newItem = { item: itemName, quantity: parseInt(itemQuantity), expirationDate };
                        fetch('/api/inventory', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newItem)
                        })
                        .then(response => response.json())
                        .then(item => {
                            inventoryList.innerHTML += `<li>${item.item} - Quantity: ${item.quantity} - Expiry: ${item.expirationDate}</li>`;
                            document.getElementById('add-inventory-form').reset();
                        })
                        .catch(err => console.error('Error adding inventory item:', err));
                    }
                });
            })
            .catch(err => console.error('Error loading inventory management:', err));
    }

    // Placeholder functions for other hospital portal functionalities
    // Implement similar to above functions as needed
});
