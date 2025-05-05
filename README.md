# 🌸 Lilac – Microservices E-commerce Platform

A scalable, modular e-commerce platform built with **NestJS**, **React**, and **MongoDB**, structured using a **microservices architecture**. Designed for performance, maintainability, and developer productivity.

## 🗂️ Project Structure

```
lilac/
├── order-service/       # Order management microservice (NestJS)
├── product-service/     # Product catalog microservice (NestJS)
├── user-service/        # User auth and profile microservice (NestJS)
├── shopping-web/        # Customer-facing web app (React + TailwindCSS)
├── docker-compose.yml   # Dev orchestration
└── package.json         # Root scripts for multi-service control
```

## 🛠️ Tech Stack

### Backend (Microservices)
- [NestJS](https://nestjs.com/)
- MongoDB + Mongoose
- gRPC (inter-service communication)
- Redis (optional for auth/session caching)

### Frontend
- React 18
- TailwindCSS
- Material UI

### DevOps
- Docker & Docker Compose

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone "https://github.com/mmerlyn/lilac"
cd lilac
```
### 2. Install all services

```bash
npm install
npm run install:all
```
### 3. Run all services in development
```bash
npm run start:all
```

Each service runs on its own port:
- Order Service: `localhost:3001`
- Product Service: `localhost:3002`
- User Service: `localhost:3003`
- Web App: `localhost:3000`

> MongoDB will run on port `27017`.

## 🐳 Running with Docker

Make sure you have [Docker](https://docs.docker.com/get-docker/) installed.

```bash
docker-compose up --build
```

## Scripts

Available in root `package.json`:

| Script            | Description                          |
|-------------------|--------------------------------------|
| `install:all`     | Install dependencies in all services |
| `start:all`       | Start all services concurrently      |
| `build:all`       | Build all services for production    |

## Testing

Each service has its own test suite using **Jest**. Run from inside any service:

```bash
npm run test
```

## 📄 License

This project is licensed under the **MIT License**.

## Contributing

Pull requests and contributions are welcome! For major changes, please open an issue first to discuss what you’d like to change.
