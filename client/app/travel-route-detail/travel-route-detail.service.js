/**
 * Created by Maja on 01.07.2016.
 */
angular.module('travelWithApp').service('routeDetailService', function DetailsForRoute() {
    var routeDetailService = this;
    routeDetailService.id = null;

    var setId = function (new_id) {
        routeDetailService.id = new_id;
    }

    return {
        setId: setId
}
});
