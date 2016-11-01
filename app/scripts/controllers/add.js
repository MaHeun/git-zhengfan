
angular.module("yeomanApp").controller("add",["$scope","$http","server","$state","$cookieStore","$cookies",function($scope,$http,server,$state,$cookieStore,$cookies){	

$scope.tian=function(){
		var uid=$cookies.get("uid")
		$scope.obj.uid = uid

		$http({
			url:server+"item",
			method:"POST",
			data:$scope.obj
		}).success(function(e){
			$state.go("home")
		})
	}
	
}])
