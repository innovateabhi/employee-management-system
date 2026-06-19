let employeesData = [];

// ---------------- NAVIGATION ----------------
function showSection(section) {

    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("employeesSection").style.display = "none";
    document.getElementById("addSection").style.display = "none";

    if (section === "dashboard") {
        document.getElementById("dashboardSection").style.display = "block";
    }

    if (section === "employees") {
        document.getElementById("employeesSection").style.display = "block";
        loadEmployees();
    }

    if (section === "add") {
        document.getElementById("addSection").style.display = "block";
    }
}

// ---------------- LOAD EMPLOYEES ----------------
async function loadEmployees() {

    const res = await fetch("/employees");
    employeesData = await res.json();

    document.getElementById("totalEmp").innerText = employeesData.length;

    populateDeptFilter();
    renderTable(employeesData);

    updateDashboard(employeesData);
}

// ---------------- DASHBOARD STATS ENGINE ----------------
function updateDashboard(data) {

    if (!data || data.length === 0) {
        document.getElementById("activeEmp").innerText = 0;
        document.getElementById("deptCount").innerText = 0;
        document.getElementById("avgSalary").innerText = 0;
        document.getElementById("topDept").innerText = "No data";
        document.getElementById("summaryText").innerText = "No employees available.";
        return;
    }

    let active = 0;
    let totalSalary = 0;
    let deptSet = new Set();
    let deptCountMap = {};

    data.forEach(emp => {

        // ACTIVE (safe fallback)
        if (emp.status && emp.status.toLowerCase() === "active") {
            active++;
        }

        // SALARY (safe conversion)
        totalSalary += Number(emp.salary) || 0;

        // DEPARTMENTS
        if (emp.department) {
            deptSet.add(emp.department);

            deptCountMap[emp.department] =
                (deptCountMap[emp.department] || 0) + 1;
        }
    });

    // AVG SALARY
    let avgSalary = data.length
        ? (totalSalary / data.length).toFixed(0)
        : 0;

    document.getElementById("activeEmp").innerText = active;
    document.getElementById("deptCount").innerText = deptSet.size;
    document.getElementById("avgSalary").innerText = avgSalary;

    // TOP DEPARTMENT (safe reduce)
    let topDept = "-";

    if (Object.keys(deptCountMap).length > 0) {
        topDept = Object.keys(deptCountMap).reduce((a, b) =>
            deptCountMap[a] > deptCountMap[b] ? a : b
        );
    }

    document.getElementById("topDept").innerText =
        "Most populated department: " + topDept;

    document.getElementById("summaryText").innerText =
        `You have ${data.length} employees across ${deptSet.size} departments.`;
}

// ---------------- RENDER TABLE ----------------
function renderTable(data) {

    let table = document.getElementById("empTable");
    table.innerHTML = "";

    data.forEach(emp => {
        table.innerHTML += `
        <tr>
            <td>${emp.employee_id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department}</td>
            <td>${emp.designation}</td>
            <td>${emp.salary}</td>
            <td>
                <button onclick="openEdit(${emp.id})">Edit</button>
                <button onclick="deleteEmp(${emp.id})">Delete</button>
            </td>
        </tr>
        `;
    });
}

// ---------------- LIVE SEARCH + FILTER ----------------
function applyFilters() {

    let search = document.getElementById("searchInput").value.toLowerCase();
    let dept = document.getElementById("deptFilter").value;

    let filtered = employeesData.filter(emp => {

        let matchSearch =
            (emp.name || "").toLowerCase().includes(search) ||
            (emp.email || "").toLowerCase().includes(search) ||
            (emp.employee_id || "").toLowerCase().includes(search);

        let matchDept = (dept === "all") || (emp.department === dept);

        return matchSearch && matchDept;
    });

    renderTable(filtered);
}

// ---------------- DEPARTMENT FILTER ----------------
function populateDeptFilter() {

    let select = document.getElementById("deptFilter");

    let departments = [...new Set(
        employeesData.map(e => e.department).filter(Boolean)
    )];

    select.innerHTML = `<option value="all">All Departments</option>`;

    departments.forEach(d => {
        select.innerHTML += `<option value="${d}">${d}</option>`;
    });
}

// ---------------- ADD EMPLOYEE ----------------
async function addEmployee() {

    const empData = {
        employee_id: document.getElementById("emp_id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        designation: document.getElementById("designation").value,
        salary: document.getElementById("salary").value
    };

    await fetch("/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empData)
    });

    showSection("employees");
}

// ---------------- DELETE ----------------
async function deleteEmp(id) {

    await fetch(`/employees/${id}`, { method: "DELETE" });

    loadEmployees();
}

// ---------------- EDIT ----------------
function openEdit(id) {

    let emp = employeesData.find(e => e.id === id);

    if (!emp) return;

    document.getElementById("edit_id").value = emp.id;
    document.getElementById("edit_name").value = emp.name;
    document.getElementById("edit_email").value = emp.email;
    document.getElementById("edit_department").value = emp.department;
    document.getElementById("edit_designation").value = emp.designation;
    document.getElementById("edit_salary").value = emp.salary;

    document.getElementById("editModal").style.display = "block";
}

function closeEdit() {
    document.getElementById("editModal").style.display = "none";
}

// ---------------- UPDATE ----------------
async function updateEmployee() {

    let id = document.getElementById("edit_id").value;

    let empData = {
        name: document.getElementById("edit_name").value,
        email: document.getElementById("edit_email").value,
        department: document.getElementById("edit_department").value,
        designation: document.getElementById("edit_designation").value,
        salary: document.getElementById("edit_salary").value
    };

    await fetch(`/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empData)
    });

    closeEdit();
    loadEmployees();
}

// INIT
showSection("dashboard");
loadEmployees();