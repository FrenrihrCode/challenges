const ImageKit = require('imagekit');
const uuid = require('uuid');
require('dotenv').config();

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const urlEndpoint = process.env.URL_ENDPOINT;

export function get(req, res, next) {
    try {
        const imagekit = new ImageKit({
            publicKey,
            privateKey,
            urlEndpoint
        });
        const token = uuid.v4();
        
        const expiration = parseInt(Date.now()/1000)+ (60 * 10); // Default expiration in 10 mins

        const signatureObj = imagekit.getAuthenticationParameters(token, expiration);
        //res.status(200).send(signatureObj);
		res.writeHead(200);
        
        res.end(JSON.stringify(signatureObj));
        
    } catch (err) {
        console.log(err);
        console.log("Error while responding to auth request:", JSON.stringify(err));

		res.writeHead(404);

		res.end("Internal Server Error");
    }
}