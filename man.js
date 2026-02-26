const apptForm = document.getElementById("appointmentForm");
const apptGrid = document.getElementById("appointmentGrid");
const counterText = document.getElementById("apptCounter");

let appointments =
  JSON.parse(localStorage.getItem("dhakhtar_appointments")) || [];

const saveToLocal = () => {
  localStorage.setItem("dhakhtar_appointments", JSON.stringify(appointments));
};

const renderAppointments = () => {
  if (appointments.length === 0) {
    apptGrid.innerHTML =
      "<p style='text-align:center; width:1000px; color: #ef4444;'>There is no appointments</p>";
    counterText.innerText = "0 Appointments";
  } else {
    const htmlCards = appointments
      .map(
        (appt, index) => `
            <div class="appt-card">
                <h4><i class="fa-solid fa-user user"></i> ${appt.name}</h4>
                <p><i class="fa-solid fa-phone"></i> ${appt.phone}</p>
                <p><i class="fa-solid fa-stethoscope"></i> ${appt.specialty}</p>
                <p><i class="fa-solid fa-calendar-days"></i> ${appt.date}</p>
                <div class="actions">
                    <button class="btn-edit" onclick="editAppointment(${index})">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button class="btn-del" onclick="deleteAppointment(${index})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `,
      )
      .join("");

    apptGrid.innerHTML = htmlCards;
  }

  counterText.innerText = `${appointments.length} Appointments`;
  saveToLocal();
};

const deleteAppointment = (index) => {
  if (confirm("Ma hubtaa inaad tirtirto ballantan?")) {
    appointments.splice(index, 1);
    renderAppointments();
  }
};

const editAppointment = (index) => {
  const appt = appointments[index];

  document.getElementById("patientName").value = appt.name;
  document.getElementById("patientEmail").value = appt.phone;
  document.getElementById("specialty").value = appt.specialty;
  document.getElementById("appointmentDate").value = appt.date;

  appointments.splice(index, 1);
  renderAppointments();
};

apptForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newAppointment = {
    name: document.getElementById("patientName").value,
    phone: document.getElementById("patientEmail").value,
    specialty: document.getElementById("specialty").value,
    date: document.getElementById("appointmentDate").value,
  };

  appointments.push(newAppointment);

  apptForm.reset();

  renderAppointments();
});

renderAppointments();
