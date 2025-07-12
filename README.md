# Pegawaiku - Employee Management Application

Pegawaiku is a web application for managing employee data efficiently and effectively. Built with a modern technology stack to provide the best user experience.

## Tech Stack

- React with TypeScript
- TailwindCSS for styling
- React Hook Form for form handling
- Zod for form validation

## Demo Accounts

| Name            | Email              | Password    |
| --------------- | ------------------ | ----------- |
| Budi Santoso    | budi@example.com   | Password123 |
| Windah Basudara | windah@example.com | Password123 |
| Ahmad Hidayat   | ahmad@example.com  | Password123 |

## Browser Compatibility

For the best experience, please use **Google Chrome** browser to access this application. Some features may not work properly in other browsers.

## Features

- Authentication
- Employee data management
- Profile management
- Form validation
- Responsive design
- Modern UI/UX

---

## 🛠️ Setup Instructions

### 1. Clone the Backend Repository

```bash
git clone https://github.com/farisfian06/Pegawaiku-Be.git
```

### 2. Install Backend Dependencies

```bash
composer install
```

### 3. Setup Backend Environment

- Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

- Configure your database credentials in `.env`

```env
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

- Generate application key

```bash
php artisan key:generate
```

- Run migration and (optional) seeders

```bash
php artisan migrate --seed
```

### 4. Run Backend Server

```bash
php artisan serve
```

Backend will run at `http://localhost:8000`

---

### 5. Clone the Frontend Repository

```bash
git clone https://github.com/farisfian06/Pegawaiapps.git
cd pegawaiku-frontend
```

### 6. Install Frontend Dependencies

```bash
npm install
```

### 7. Setup Frontend Environment

- Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

- Set your backend API URL:

```env
VITE_API_URL=http://localhost:8000/api
```

### 8. Run Frontend Application

```bash
npm run dev
```

Frontend will be accessible at `http://localhost:5173`
