# SecondHand 🛒 Mart for Buying & Selling Used Items

![Banner](https://media-hosting.imagekit.io//3f9a6e33d08c433e/Screenshot%202025-03-06%20195158.png?Expires=1835877189&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1d~sCWknfGSgiZBaEj-W521-XYNIbPVTwbbfLDeDwahyAxYunegw6kVS-fa~Ck-R5o~XpMUV7sxB9xezeqAHZnQemZlKTYdby~ilrDAEmcYzwoW-wO13sSQCh9ZgJJ81wOsmw158paXCV9sDlzGRSPl86tytSGZyV9tMvpGJe8tkFN4ZOdYI3pm2ib8SvVs1vn81WY2kTsQyBs3c1aysxg-auUr4R~dGnIezucd6HKGt7e09w8f4kSSwb3oJ5OB8m8kuXqq9yTOMjmX7VmT59UCvfvs73ZONNhWmDMKvRFTwgaUk0bYInxDzi4Uv~6uTQTRQ9C4uesN89GFSC0kuLQ__)


 🎉 Welcome to **SecondHand Mart**—a seamless platform for buying and selling used items. Whether you're a seller looking to declutter or a buyer hunting for a great deal, this web app is designed to provide a smooth, secure experience.


## 👨‍💻 Live Demo

You can explore the live version of the SecondHand Mart here:

🔗 [**SecondHand Mart Live**](https://secondhand-mart.vercel.app)  

## Features

### User Authentication
- **Custom login system** via email or phone number with JWT authentication.
- **Password protection** with bcrypt hashing.

### User Dashboard
- **Post items for sale**: Add listings with descriptions, images, pricing, and categories.
- **Manage your listings**: Edit or remove items from the platform.
- **Track purchases & sales**: Access detailed history of transactions.
- **Edit Profile**: Manage your personal details and settings.
- **Wishlist**: Save items you're interested in for later.

### Listings & Search
- **Create and list items**: Post items with price, condition, and images.
- **Advanced filtering**: Search by category, price, condition, or location.
- **Mark as sold**: Update the status of your sold items.

### Messaging & Transactions
- **Chat**: Communicate directly with sellers before making a purchase.
- **Order tracking**: Keep track of the transaction status.

### Admin Panel
- **User management**: Ban or unban users when necessary.
- **Listing moderation**: Delete inappropriate listings.

## Tech Stack

- **Frontend**: 

  🚀 Next.js (Server-Side Rendering)

  🚀 TypeScript (Type safety)
  
- **Backend**:

  🚀 Express.js (REST API)

  🚀 MongoDB (NoSQL database for data storage)

  🚀 JWT (Authentication)

  🚀 bcrypt (Password hashing)

- **Deployment**:

  🧑‍💻 Frontend: Vercel

  🧑‍💻 Backend: Vercel
## Routes

### User Routes
- `/`: **Home Page** – Overview of available items.
- `/login`: **Login Page** – Authenticate users.
- `/products`: **Products Page** – Browse all listings.
- `/dashboard`: **User Dashboard** – Manage your profile and items.
  - `/dashboard/purchase-history`: View your purchase history.
  - `/dashboard/listing`: Manage your item listings.
  - `/dashboard/sales-history`: Track your sales.
  - `/dashboard/profile`: Edit your personal details.
- `/messages`: **Messages Page** – Direct communication between buyers and sellers.

### Admin Routes
- `/dashboard/admin`: **Admin Dashboard** – Admin panel for user and listing management.
- `/dashboard/admin/user-management`: Ban or unban users.
- `/dashboard/admin/listings`: Review or delete inappropriate listings.

## Database Schema

- **Users**: Store user info (name, email, phone, password, role).
- **Listings**: Store item details (title, description, price, images, status, sellerID).
- **Transactions**: Store transaction history (buyerID, sellerID, itemID, status).
- **Messages**: Store communication between users (senderID, receiverID, message).


# Thank You! 🎉

Thank you for visiting **SecondHand Marketplace**! We appreciate your interest in our project. If you have any questions, feedback, or suggestions, feel free to reach out. Happy browsing and selling! 😊

If you enjoyed this project, don't forget to star ⭐ the repository!

---
*Made with ❤️ by Badhon Roy*


