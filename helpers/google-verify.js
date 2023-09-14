import {OAuth2Client} from 'google-auth-library'

const client = new OAuth2Client();
async function verify(token_id) {
  const ticket = await client.verifyIdToken({
      idToken: token_id,
      audience: process.env.GOOGLE_CLIENT_ID
      
  });
  const payload = ticket.getPayload();
  
  return {
    name: payload.name,
    email: payload.email,
    image: payload.picture
  }
}

export default verify