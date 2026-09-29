/** @returns {any} */
function getStorageData() {
    try {
        const raw = localStorage.getItem('hospital_prototype_v3');
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        console.error('Error leyendo datos del dashboard:', e);
        return {};
    }
}

/**
 * @param {any} user
 * @returns {{ stats: object, chartData: object[] }}
 */
export function getOverviewData(user) {
    const data = getStorageData();
    const appointments = data.appointments || [];
    const patients = data.patients || [];
    const doctors = data.doctors || [];
    const triajeRecords = data.triaje || [];

    let filteredAppointments = appointments;
    
    if (user?.role === 'patient' && user?.patientId) {
        filteredAppointments = appointments.filter(/** @param {any} a */ (a) => a.patientId === user.patientId);
    } else if (user?.role === 'doctor' && user?.doctorId) {
        filteredAppointments = appointments.filter(/** @param {any} a */ (a) => a.doctorId === user.doctorId);
    }

    const today = new Date();
    const todayStr = today.toDateString();

    const stats = {
        totalAppointments: filteredAppointments.length,
        todayAppointments: filteredAppointments.filter(/** @param {any} a */ (a) => new Date(a.dateTime).toDateString() === todayStr).length,
        upcomingAppointments: filteredAppointments.filter(/** @param {any} a */ (a) => {
            const aDate = new Date(a.dateTime);
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            return aDate >= today && aDate <= nextWeek && a.status === 'scheduled';
        }).length,
        totalPatients: patients.length,
        totalDoctors: doctors.length,
        pendingAppointments: filteredAppointments.filter(/** @param {any} a */ (a) => a.status === 'scheduled').length,
        completedAppointments: filteredAppointments.filter(/** @param {any} a */ (a) => a.status === 'completed').length,
        triajePending: triajeRecords.filter(/** @param {any} t */ (t) => t.status === 'waiting').length
    };

    // Lógica del gráfico
    const chartData = [];
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 30; i++) {
        const currentDay = new Date(today);
        currentDay.setDate(today.getDate() + i);
        currentDay.setHours(0, 0, 0, 0);

        const count = filteredAppointments.filter(/** @param {any} a */ (a) => {
            const aDate = new Date(a.dateTime);
            aDate.setHours(0, 0, 0, 0);
            return aDate.getTime() === currentDay.getTime();
        }).length;

        chartData.push({
            date: currentDay,
            label: i % 5 === 0 ? currentDay.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : '',
            count
        });
    }

    return { stats, chartData };
}

/** @param {any} user @returns {number} */
export function getClinicalRecordsCount(user) {
    const data = getStorageData();
    const records = data.clinicalRecords || [];
    return records.filter(/** @param {any} r */ (r) => r.patientId === user?.patientId).length;
}