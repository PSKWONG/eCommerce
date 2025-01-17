//---------------------- Import Modules --------------------
require('dotenv').config();


// Passport
const passport = require('passport');
// Bcrypt
const bcrypt = require('bcrypt');
// UserDB
const { UserDB } = require('../../model/users');

//---------------------- Helper Functions --------------------
const callbackURLConstructor = (provider) => {
    const environment = process.env.NODE_ENV || 'development';
    const baseURL = environment === 'development' ? process.env.DEV_BACKEND_SERVER_URL : process.env.PRO_BACKEND_SERVER_URL;
    return `${baseURL}/api/authen/login/${provider}/callback`;
};

// ---------------------- Global Variable-----------
let provider;


// ---------------------- Local Strategy -----------
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async (username, password, done) => {

        try {
            // Find user by email
            const user = await UserDB.findByEmail(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // If user is found and password is correct
            return done(null, user);

        } catch (error) {
            done(error);
        }
    }
));
// ---------------------- Facebook Strategy -----------
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: callbackURLConstructor('facebook'),
    },
    async (accessToken, refreshToken, profile, done) => {
        // Declare Variables
        provider = 'facebook';

        const userProfile =
        {
            id: profile.id,
            username: profile.displayName || 'User',
            accessToken: accessToken,
            profile
        }

        const { id, username } = profile;


        try {
            //Check if the user already exists
            const user = await UserDB.findByProviderId(provider, id);
            // If user exists, return user
            if (user) {
                return done(null, user);
            }
            const newUser = await UserDB.createUserByPRovider(provider, username, userProfile);
            done(null, newUser);
        } catch (error) {
            done(error);
        }
    }
))


// ---------------------- Serialize User -----------
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

// ---------------------- Deserialize User -----------
passport.deserializeUser(async (user_id, done) => {
    try {
        const user = await UserDB.findById(user_id);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
});


module.exports = passport;