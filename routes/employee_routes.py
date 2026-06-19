from flask import Blueprint, request, jsonify
from models import db, Employee

employee_bp = Blueprint("employee_bp", __name__)

# CREATE
@employee_bp.route("/employees", methods=["POST"])
def create_employee():
    data = request.get_json()

    emp = Employee(
        employee_id=data["employee_id"],
        name=data["name"],
        email=data["email"],
        department=data["department"],
        designation=data["designation"],
        salary=data["salary"]
    )

    db.session.add(emp)
    db.session.commit()

    return jsonify({"message": "Employee created"}), 201


# READ ALL
@employee_bp.route("/employees", methods=["GET"])
def get_employees():
    employees = Employee.query.all()
    return jsonify([e.to_dict() for e in employees])


# READ ONE
@employee_bp.route("/employees/<int:id>", methods=["GET"])
def get_employee(id):
    emp = Employee.query.get_or_404(id)
    return jsonify(emp.to_dict())


# UPDATE
@employee_bp.route("/employees/<int:id>", methods=["PUT"])
def update_employee(id):
    emp = Employee.query.get_or_404(id)
    data = request.get_json()

    emp.name = data.get("name", emp.name)
    emp.email = data.get("email", emp.email)
    emp.department = data.get("department", emp.department)
    emp.designation = data.get("designation", emp.designation)
    emp.salary = data.get("salary", emp.salary)
    emp.status = data.get("status", emp.status)

    db.session.commit()

    return jsonify({"message": "Employee updated"})


# DELETE
@employee_bp.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):
    emp = Employee.query.get_or_404(id)

    db.session.delete(emp)
    db.session.commit()

    return jsonify({"message": "Employee deleted"})