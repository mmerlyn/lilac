# Lilac – Microservices E-commerce Platform

A scalable, modular e-commerce platform built with **NestJS**, **React**, and **MongoDB**, structured using a **microservices architecture**. Designed for performance, maintainability, and developer productivity.

## Project Structure

```
lilac/
├── order-service/       # Order management microservice (NestJS)
├── product-service/     # Product catalog microservice (NestJS)
├── user-service/        # User auth and profile microservice (NestJS)
├── shopping-web/        # Customer-facing web app (React + TailwindCSS)
├── docker-compose.yml   # Dev orchestration
└── package.json         # Root scripts for multi-service control
```

## Tech Stack

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

## 📄 License

This project is licensed under the **MIT License**.

## Contributing

Pull requests and contributions are welcome! For major changes, please open an issue first to discuss what you’d like to change.
