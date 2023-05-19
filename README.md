# WeConnect

To run this code :

1. Inside the client directory :
   Create ".env.local" file with the following parameter : NEXT_PUBLIC_API=http://localhost:8000/api
   Run "npm i" command in terminal from client directory(only first time)
   Run "npm run dev" to start frontend
   
2. Inside the server directory:
    Create ".env" file with the following parameters : 
      DATABASE="your_mongo_url"
      PORT=8000
      JWT_SECRET="your_jwt_secret"
      CLIENT_URL=http://localhost:3000

      CLOUDINARY_NAME="your_cloudinary_name"
      CLOUDINARY_KEY="your_cloudinary_key"
      CLOUDINARY_SECRET="your_cloudinary_secret"
    
    Run "npm i" command in terminal from server directory(only first time)
    Run "npm start" to start the backend


