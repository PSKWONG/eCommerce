//---------------------- Import Modules --------------------
// Passport
const passport = require('passport');
// Bcrypt
const bcrypt = require('bcrypt');
// UserDB
const { UserDB } = require('../../model/users');




// ---------------------- Local Strategy -----------
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async (username, password, done) => {

        try {
            // Find user by email
            const user = await UserDB.findByEmail(username);
            if (!user) {
                return done(null, false);
            }         
            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return done(null, false);
            }
            // If user is found and password is correct
            return done(null, user);

        } catch (error) {
            done(error);
        }
    }
));

// ---------------------- Serialize User -----------
passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

// ---------------------- Deserialize User -----------
passport.deserializeUser(async (user_id, done) => {
    try {
        const user = await UserDB.findById(user_id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


module.exports = passport;