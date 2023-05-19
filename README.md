# WeConnect

To run this code :<br>

1. Inside the client directory :<br>
   Create ".env.local" file with the following parameter : NEXT_PUBLIC_API=http://localhost:8000/api <br>
   Run "npm i" command in terminal from client directory(only first time)<br>
   Run "npm run dev" to start frontend<br>
   
2. Inside the server directory:<br>
    Create ".env" file with the following parameters : <br>
      DATABASE="your_mongo_url"<br>
      PORT=8000<br>
      JWT_SECRET="your_jwt_secret"<br>
      CLIENT_URL=http://localhost:3000<br>

      CLOUDINARY_NAME="your_cloudinary_name"<br>
      CLOUDINARY_KEY="your_cloudinary_key"<br>
      CLOUDINARY_SECRET="your_cloudinary_secret"<br>
    
    Run "npm i" command in terminal from server directory(only first time)<br>
    Run "npm start" to start the backend<br>


