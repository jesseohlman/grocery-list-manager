module.exports = class Authorizer {
    constructor(user, model){
        this.user = user;
        this.model = model;
    };

    _isOwner(){
        return !!this.user && (this.user.id === this.model.userId);
    }

    _isSignedIn(){
        return !!this.user;
    }
}