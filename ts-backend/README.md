.env keys:
PORT
DATABASE_URL
SECRET_KEY
MONGODB_URI


generate certificate [openssl req -nodes -new -x509 -keyout server.key -out server.cert ]

generate random 32bit key [node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"]