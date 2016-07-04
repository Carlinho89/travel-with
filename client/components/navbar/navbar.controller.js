'use strict';

class NavbarController {
    //end-non-standard

    //start-non-standard
    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.travelRoutesDropdown = [
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
        this.messagesMenuItem = {
            tabText: 'Messages',
            state: 'messages'
        };
    }

}

angular.module('travelWithApp').controller('NavbarController', NavbarController);
