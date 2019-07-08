

module.exports = {
    userSignUpCheck(req, res, next){
        [
            check('email', 'not email').isEmail(),
        check('password', 'password too short').isLength({min: 6})
        ], (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            console.log("error:")
        }
        }
    }
}