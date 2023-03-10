const { campgroundSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/reviews');



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You Must Be Signed In First!');
        return res.redirect('/login');
    }
    next();
};


// const url = require('url');
// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         console.log(url.parse(req.originalUrl).pathname)
//         req.session.returnTo = url.parse(req.originalUrl).pathname
//         req.flash('error', 'You Must Be Signed In First!');
//         return res.redirect('/login');
//     }
//     next();
// };


module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campgroundAuthorization = await Campground.findById(id);
    if (!campgroundAuthorization.author.equals(req.user._id)) {
        req.flash('error', "You don't have the permission to do that !")
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You don't have the permission to do that !")
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
};


module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};

