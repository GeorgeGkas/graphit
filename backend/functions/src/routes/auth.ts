import * as express from 'express'
import * as admin from 'firebase-admin'

export async function validateUserAuth(req: express.AugmentedRequest, res: express.Response, next: express.NextFunction) {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
    return res.status(403).send('Unauthorized');
  }

  const idToken = req.headers.authorization.split('Bearer ')[1];

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);

    req.author = decodedIdToken;
    return next();
  } catch (error) {
    return res.status(403).send('Unauthorized');
  }
};
