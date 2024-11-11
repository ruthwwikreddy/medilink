// Script to dynamically load medical records and inventory
document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation menu
    loadMenu();

    // Load the Home page by default
    loadContent('home');

    // Event listeners for navigation
    document.getElementById('menu').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            loadContent(page);
            // Update URL hash
            window.location.hash = page;
        }
    });

    // Function to load content dynamically
    function loadContent(page) {
        const content = document.getElementById('content');
        fetch(`templates/${getTemplatePath(page)}`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                // After loading HTML, initialize the specific page
                switch(page) {
                    case 'home':
                        // Any home-specific JS can be initialized here
                        break;
                    case 'patient-dashboard':
                        loadPatientDashboard();
                        break;
                    case 'medical-records':
                        loadMedicalRecords();
                        break;
                    case 'prescription':
                        loadPrescriptions();
                        break;
                    case 'health-tipsandresources':
                        loadHealthTips();
                        break;
                    case 'patient-appointments':
                        loadAppointments();
                        break;
                    case 'patient-inventory':
                        loadMedicationInventory();
                        break;
                    case 'hospital-dashboard':
                        loadHospitalDashboard();
                        break;
                    case 'hospital-bedmanagement':
                        loadBedManagement();
                        break;
                    case 'hospital-inventory':
                        loadInventory();
                        // Initialize form submission
                        document.getElementById('add-inventory-form').addEventListener('submit', function(e) {
                            e.preventDefault();
                            addInventoryItem();
                        });
                        break;
                    case 'hospital-registerpatient':
                        initializeRegisterPatient();
                        break;
                    case 'hospital-searchpatient':
                        initializeSearchPatient();
                        break;
                    // Add more cases as needed
                }
            });
    }

    // Function to map page to template path
    function getTemplatePath(page) {
        const mapping = {
            'home': 'Home/home.html',
            'patient-dashboard': 'Patients/patient_dashboard.html',
            'medical-records': 'Patients/patient_medicalrecords.html',
            'prescription': 'Patients/patient_prescription.html',
            'health-tipsandresources': 'Patients/patient_tipsandresources.html',
            'patient-appointments': 'Patients/patient_appointments.html', // To be created
            'patient-inventory': 'Patients/medicine_inventory.html',
            'hospital-dashboard': 'healthcare/hospital_dashboard.html',
            'hospital-bedmanagement': 'healthcare/hospital_bedmanagement.html',
            'hospital-inventory': 'healthcare/hospital_inventory_management.html',
            'hospital-registerpatient': 'healthcare/register_patient.html',
            'hospital-searchpatient': 'healthcare/search_patient.html'
            // Add more mappings as needed
        };
        return mapping[page] || 'Home/home.html';
    }

    // Function to load the navigation menu
    function loadMenu() {
        fetch('templates/menu.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('menu').innerHTML = html;
            });
    }

    // ----- Patient Portal Functions -----

    // Load Patient Dashboard
    function loadPatientDashboard() {
        // Any dashboard-specific JS can be initialized here
    }

    // Load Medical Records
    function loadMedicalRecords() {
        const records = document.getElementById('records-list');
        // Placeholder data
        const data = [
            { date: '2023-01-10', description: 'Annual Checkup', doctor: 'Dr. Smith' },
            { date: '2023-03-22', description: 'Blood Test', doctor: 'Dr. Lee' }
        ];
        records.innerHTML = data.map(record => `<li>${record.date}: ${record.description} by ${record.doctor}</li>`).join('');
    }

    // Load Prescriptions
    function loadPrescriptions() {
        const prescriptions = document.getElementById('prescription-list');
        const data = [
            { medication: 'Amoxicillin', dosage: '500mg', frequency: '3 times a day' },
            { medication: 'Ibuprofen', dosage: '200mg', frequency: 'as needed' }
        ];
        prescriptions.innerHTML = data.map(p => `<li>${p.medication} - ${p.dosage}, ${p.frequency}</li>`).join('');
    }

    // Load Health Tips
    function loadHealthTips() {
        const tips = document.getElementById('tips-list');
        const data = [
            'Stay hydrated by drinking at least 8 glasses of water a day.',
            'Exercise regularly to maintain a healthy weight.',
            'Get at least 7-8 hours of sleep each night.'
        ];
        tips.innerHTML = data.map(tip => `<li>${tip}</li>`).join('');
    }

    // Load Appointments (Placeholder Implementation)
    function loadAppointments() {
        const content = document.getElementById('content');
        content.innerHTML = `
            <div id="appointments">
                <h2>Your Appointments</h2>
                <ul id="appointments-list">
                    <li>2023-05-15: Consultation with Dr. Adams</li>
                    <li>2023-06-20: Follow-up with Dr. Lee</li>
                </ul>
                <h3>Book a New Appointment</h3>
                <form id="book-appointment-form">
                    <input type="date" id="appointment-date" required>
                    <input type="time" id="appointment-time" required>
                    <input type="text" id="appointment-doctor" placeholder="Doctor's Name" required>
                    <button type="submit">Book Appointment</button>
                </form>
                <div id="appointment-status"></div>
            </div>
        `;

        // Initialize form submission
        document.getElementById('book-appointment-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const date = document.getElementById('appointment-date').value;
            const time = document.getElementById('appointment-time').value;
            const doctor = document.getElementById('appointment-doctor').value;
            if(date && time && doctor) {
                const appointmentList = document.getElementById('appointments-list');
                const newAppointment = document.createElement('li');
                newAppointment.textContent = `${date} ${time}: Consultation with ${doctor}`;
                appointmentList.appendChild(newAppointment);
                // Clear form fields
                document.getElementById('book-appointment-form').reset();
                document.getElementById('appointment-status').textContent = 'Appointment booked successfully!';
            }
        });
    }

    // Load Medication Inventory
    function loadMedicationInventory() {
        const medicines = document.getElementById('medicine-list');
        const data = [
            { medication: 'Amoxicillin', dosage: '500mg', refills: 2 },
            { medication: 'Ibuprofen', dosage: '200mg', refills: 5 }
        ];
        medicines.innerHTML = data.map(med => `<li>${med.medication} - ${med.dosage}, Refills left: ${med.refills}</li>`).join('');
    }

    // ----- Hospital Portal Functions -----

    // Load Hospital Dashboard (Placeholder Implementation)
    function loadHospitalDashboard() {
        // Placeholder data
        document.getElementById('bed-occupancy').textContent = '75%';
        document.getElementById('inventory-status').textContent = 'Sufficient';
        document.getElementById('registered-patients').textContent = '120';
    }

    // Load Bed Management
    function loadBedManagement() {
        const bedList = document.getElementById('bed-list');
        const data = [
            { bedNumber: 'B101', status: 'Occupied' },
            { bedNumber: 'B102', status: 'Available' },
            { bedNumber: 'B103', status: 'Occupied' },
            { bedNumber: 'B104', status: 'Available' }
        ];
        bedList.innerHTML = data.map(bed => `<li>Bed ${bed.bedNumber}: ${bed.status}</li>`).join('');
    }

    // Load Inventory
    function loadInventory() {
        const inventory = document.getElementById('inventory-list');
        const data = [
            { item: 'Face Masks', quantity: 100 },
            { item: 'Gloves', quantity: 200 },
            { item: 'Syringes', quantity: 150 }
        ];
        inventory.innerHTML = data.map(inv => `<li>${inv.item}: ${inv.quantity}</li>`).join('');

        // Listen for form submission to add inventory
    }

    // Add Inventory Item
    function addInventoryItem() {
        const itemName = document.getElementById('item-name').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        const inventoryList = document.getElementById('inventory-list');

        if(itemName && itemQuantity) {
            const newItem = document.createElement('li');
            newItem.textContent = `${itemName}: ${itemQuantity}`;
            inventoryList.appendChild(newItem);

            // Clear form fields
            document.getElementById('add-inventory-form').reset();
        }
    }

    // Initialize Register Patient Form
    function initializeRegisterPatient() {
        const form = document.getElementById('register-patient-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('patient-name').value;
            const dob = document.getElementById('patient-dob').value;
            const doctor = document.getElementById('patient-doctor').value;
            const status = document.getElementById('registration-status');

            if(name && dob && doctor) {
                // Placeholder for actual registration logic
                status.textContent = `Patient ${name} registered successfully!`;
                form.reset();
            }
        });
    }

    // Initialize Search Patient Form
    function initializeSearchPatient() {
        const form = document.getElementById('search-patient-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('search-query').value.toLowerCase();
            const results = document.getElementById('search-results');
            results.innerHTML = '';

            // Placeholder data
            const patients = [
                { id: 'P001', name: 'John Doe', doctor: 'Dr. Smith' },
                { id: 'P002', name: 'Jane Smith', doctor: 'Dr. Lee' },
                { id: 'P003', name: 'Alice Johnson', doctor: 'Dr. Adams' }
            ];

            const filtered = patients.filter(p => p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query));

            if(filtered.length > 0) {
                filtered.forEach(p => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${p.id} | Name: ${p.name} | Doctor: ${p.doctor}`;
                    results.appendChild(li);
                });
            } else {
                results.textContent = 'No patients found.';
            }
        });
    }

    // Load Notification on Hash Change
    window.addEventListener('hashchange', function() {
        const page = window.location.hash.substring(1);
        loadContent(page);
    });
});
