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
                tabText: 'Travel Routes',
                menuItems: [
                    {
                        itemText: 'My Travel Routes',
                        state: 'list-travel-routes',
                    },
                    {
                        itemText: 'Create New Route',
                        state: 'add-travel-routes',
                    }
                ]
            }
        ];
    }

}

angular.module('travelWithApp').controller('NavbarController', NavbarController);
