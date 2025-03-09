# MERN Shop

## Overview
MERN Shop is a full-stack e-commerce platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to browse products, manage their shopping carts, and complete purchases. The platform also includes an admin panel for managing products and orders.

## Features
- **User Authentication** – Secure login and registration system using JWT
- **Product Management** – Admin panel for adding, editing, and deleting products
- **Shopping Cart & Checkout** – Users can add items, view their cart, and place orders
- **Order Management** – Admins can track and manage user orders
- **Responsive UI** – Optimized for both desktop and mobile devices

## Tech Stack
- **Frontend:** React, React Router, Context API, Axios, Tailwind CSS (or your styling choice)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
- **Database:** MongoDB (hosted locally or on a cloud provider like MongoDB Atlas)
- **State Management:** Context API (or Redux if applicable)
- **Package Manager:** Yarn / npm

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v14+)
- MongoDB (local or cloud instance)

### Clone the Repository
```sh
git clone https://github.com/mahdi4k/jsShop.git
cd jsShop
```

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

## Environment Variables
Create a `.env` file in the **backend** directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Usage
- Open `http://localhost:3000/` in your browser
- Register/Login to start using the shop
- Admin users can manage products and orders from the admin panel

## Contributing
Feel free to fork this repository and submit pull requests to improve the project.

## License
This project is licensed under the MIT License.
