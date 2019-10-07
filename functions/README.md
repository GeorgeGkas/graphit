This directory includes all the configurations that are used in the Firebase powered back-end. We take advantage of Cloud Functions to set up a simple Express server that communicates directly to Firestore database and handle all the appropriate authentication operations.

To be able run the app, you have to initialize the environmental variables located under root-level `config` folder under the `Firebase back-end` section.

When building/serving or deploying, make sure to set the appropriate `NODE_ENV` on either `production` or `development`.
