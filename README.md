# 🚀 Employee Management System (EMS) - DevOps Project

A full-stack Employee Management System built using **Flask (Python)** with complete DevOps implementation using **Docker, Kubernetes (Kind), GitHub Actions, and AWS EC2**.

This project demonstrates end-to-end application development, containerization, orchestration, and CI/CD automation.

---

## 📌 Features

### Employee Management
- Add Employee
- View Employee List
- Update Employee Details
- Delete Employee

### Dashboard Analytics
- Total Employees
- Active Employees
- Department Count
- Average Salary
- Department Insights
- Workforce Summary

### Search & Filtering
- Live Employee Search
- Department-wise Filtering

### DevOps Features
- Dockerized Flask Application
- Kubernetes Deployment using Kind
- Replica Scaling
- Health Monitoring Endpoint
- GitHub Actions CI Pipeline
- Docker Hub Integration
- AWS EC2 Deployment

---

## 🏗️ Tech Stack

### Backend
- Python
- Flask
- Flask SQLAlchemy
- SQLite

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5

### DevOps & Cloud
- Docker
- Kubernetes (Kind)
- GitHub Actions
- Docker Hub
- AWS EC2
- Git

---

## 📁 Project Structure

```text
employee-management-system/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── routes/
│   │   └── employee_routes.py
│   ├── templates/
│   │   └── index.html
│   ├── static/
│   │   ├── app.js
│   │   └── style.css
│   └── database/
│       └── employee.db
│
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
│
├── .github/
│   └── workflows/
│       └── docker-ci.yml
│
├── kind-config.yaml
│
└── README.md
```

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone https://github.com/innovateabhi/employee-management-system.git
cd employee-management-system
```

### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Run Application

```bash
python app.py
```

Application will be available at:

```text
http://localhost:5000
```

---

## 🐳 Docker Setup

### Build Docker Image

```bash
cd backend
docker build -t ems-backend .
```

### Run Docker Container

```bash
docker run -d -p 5000:5000 --name ems ems-backend
```

### Verify Running Container

```bash
docker ps
```

Application will be available at:

```text
http://localhost:5000
```

---

## ☸️ Kubernetes Deployment (Kind)

### Create Kind Cluster

```bash
kind create cluster --name ems-cluster --config kind-config.yaml
```

### Verify Cluster

```bash
kubectl get nodes
```

### Load Docker Image into Kind

```bash
kind load docker-image ems-backend --name ems-cluster
```

### Deploy Application

```bash
kubectl apply -f k8s/
```

### Verify Deployment

```bash
kubectl get deployments
kubectl get pods
kubectl get svc
```

### Scale Application

```bash
kubectl scale deployment ems-deployment --replicas=3
```

### Verify Scaling

```bash
kubectl get pods
```

---

## 🌐 Application Access

After deployment, access the application using:

```text
http://<EC2_PUBLIC_IP>:30007
```

---

## ❤️ Health Check Endpoint

The application exposes a health endpoint:

```text
GET /health
```

Response:

```json
{
  "status": "healthy"
}
```

---

## 🔁 CI/CD Pipeline

The project uses GitHub Actions for Continuous Integration.

### Pipeline Workflow

1. Trigger on push to main branch
2. Checkout source code
3. Login to Docker Hub
4. Build Docker image
5. Push image to Docker Hub

### Workflow File

```text
.github/workflows/docker-ci.yml
```

---

## 📦 Docker Hub Integration

Pull the latest image:

```bash
docker pull <dockerhub-username>/ems-backend:latest
```

Run the image:

```bash
docker run -d -p 5000:5000 <dockerhub-username>/ems-backend:latest
```

---

## 🏛️ System Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
Docker Image Build
    │
    ▼
Docker Hub Registry
    │
    ▼
Kubernetes (Kind)
    │
    ▼
Deployment
    │
    ▼
Service (NodePort)
    │
    ▼
Flask Application
    │
    ▼
Browser
```

---

## 📈 Kubernetes Components Used

### Deployment
- Manages application pods
- Provides replica scaling
- Ensures desired state

### Service (NodePort)
- Exposes application externally
- Routes traffic to pods

### Pods
- Run Flask application containers

---

## 🔐 DevOps Concepts Implemented

- Containerization using Docker
- Kubernetes Orchestration
- Replica Scaling
- Service Discovery
- Health Monitoring
- Infrastructure as Code
- Continuous Integration
- Container Registry Management
- Cloud Deployment

---

## 📸  Demo



---

## 🚀 Future Enhancements

- Continuous Deployment (CD)
- Kubernetes Ingress Controller
- NGINX Reverse Proxy
- PostgreSQL Database
- Helm Charts
- AWS EKS Deployment
- Prometheus Monitoring
- Grafana Dashboards
- ArgoCD GitOps
- SSL/TLS Configuration

---

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Python Flask Development
- Frontend Integration
- Docker Containerization
- Kubernetes Administration
- CI/CD Pipeline Creation
- AWS EC2 Deployment
- DevOps Best Practices
- Application Scaling
- Cloud-Native Architecture

---

## 👨‍💻 Author

**Abhinandan Roy**

GitHub: https://github.com/innovateabhi

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
