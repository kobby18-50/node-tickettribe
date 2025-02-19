# Ticket Tribe

## Overview

This is a full-stack event ticketing application built with Node.js, Express, and MongoDB. The app allows users to browse, and manage events and tickets seamlessly.

## Features

- User authentication (Sign up, Login, Logout, Forgot Password, Reset Password)
- Event creation and management
- Ticket purchase
- Email notifications for ticket confirmations
- Admin dashboard for event organizers

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** SendGrid and Nodemailer
- **Deployment:** Render

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)

Ensure you have the following
- [Sendgrid account](https://sendgrid.com/en-us)
- [Cloudinary account](https://cloudinary.com/)

### Steps to Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kobby18-50/node-tickettribe.git
   cd node-tickettribe
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**

   - Create a `.env` file in the root directory
   - Add the required variables:

   ```ini
   MONGO_URI = your_mongodb_url
   JWT_SECRET = your_jwt_secret
   JWT_LIFETIME = your_jwt_lifetime
   SENDGRID_API_KEY = your_sendgrid_api_key
   MAX_SIZE = your_max_size_for_image_upload
   CLOUD_NAME = your_cloudinary_cloud_name
   CLOUD_API_KEY = your_cloudinary_api_key
   CLOUD_API_SECRET = your_cloudinary_api_secret
   JWT_SECRET=your_secret_key
   ```


4. **Start the server:**

```sh
npm start
`````

## API Endpoints

End Points can be found on https://ticket-tribe.onrender.com/


## Contact

For inquiries, reach out to **edwardkobby18@gmail.com**.
