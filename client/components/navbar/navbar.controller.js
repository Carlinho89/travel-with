'use strict';

class NavbarController {
    //end-non-standard

    //start-non-standard
    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.menu = [
            {
                title: 'Requests',
                state: 'requests'
            },
        ];
    }

}

angular.module('travelWithApp').controller('NavbarController', NavbarController);
