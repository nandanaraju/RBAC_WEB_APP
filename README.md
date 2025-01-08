# 🏥 **ONLINE PHARMACY WEB APP**

**📄 PROJECT OVERVIEW**

The Online Pharmacy Web Application is a digital platform for purchasing medicines. It uses **Role-Based Access Control (RBAC)** with three roles: **Admin**, **Pharmacist**, and **User**. The application is built with the **MERN stack** and Docker for seamless functionality, ensuring a secure and efficient experience for all users.

---

**🔑 FEATURES**

### **👤 User**
- **Login & Signup**: Secure user authentication.
- **Home**: Browse product information without login.
- **🛒 Product Page**: View each medicine’s details, including name, description, price, and available stock.
- **🛍️ Cart Management**: Add, edit, or delete products in the cart.
- **📞 Contact Us**: Messaging system for user inquiries.
- **📝 Checkout**: Upload prescriptions for order processing.
- **🚪 Logout**: End the session securely.

### **🔒 Pharmacist**
- **📄 Prescription Management**: Review and approve uploaded prescriptions.
- **✅ Order Confirmation**: Confirm orders based on prescription reviews.

### **🔒 Admin**
- **Admin Authentication**: Secure login through an admin passphrase.
- **🧑‍💻 User Management**: Add, edit, or delete users with specific roles (user or pharmacist).
- **📊 Product Management**: Add, edit, or delete products.
- **📩 Message Management**: Access and manage messages from users.
- **🚪 Logout**: End the session securely.

---

**⚙️ TECHNOLOGIES USED**

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker

---

**🛠️ OTHER TOOLS**

- **Multer**: Handles prescription uploads.
- **JWT (JSON Web Tokens)**: Secures user authentication and manages sessions.
- **RBAC**: Role-based access control system for user, pharmacist, and admin roles.

---


**🧑‍💻 USER ROLES AND PERMISSIONS**

| **Role**      | **Permissions**                                                                 |
|---------------|---------------------------------------------------------------------------------|
| **Admin**     | User management, product management, message management, prescription review    |
| **Pharmacist**| Prescription management, order confirmation                                     |
| **User**      | Browse products, manage cart, upload prescriptions, place orders                |

---

**🛡️ SECURITY**

- **JWT Authentication**: Ensures secure login sessions.
- **RBAC**: Limits functionality based on roles (admin, pharmacist, user).
- **Environment Variables**: Sensitive data stored in `.env`.

---

**📌 FUTURE UPGRADES**

1. **Analytics Dashboard**: Insights on user activity, sales, and prescriptions.
2. **Notifications**: Real-time updates for users and pharmacists.
3. **Payment Gateway Integration**: For seamless order payments.

---

**🚀 GETTING STARTED**

**Prerequisites**
1.Install Node.js and Docker.

2. **Clone the Repository**: `git clone <repository-url>`
3. **Setup Environment Variables**: Create a `.env` file in the project root with the following:
   ```env
   JWT_SECRET=<your-jwt-secret>
   ADMIN_PASSPHRASE=<your-admin-passphrase>
   ```
4.**Docker Setup**: Run the following command:
```
docker compose up --build
```
5.**Access the Application** 
Open http://localhost:3001 in your browser.
