
angular.module("yeomanApp").controller("revise",["$scope","$http","server","$state","$cookieStore","$cookies","$stateParams",function($scope,$http,server,$state,$cookieStore,$cookies,$stateParams){	
	$scope.obj=$stateParams;
	$scope.revise=function(){
		$http({
			url:server+"item/"+$scope.obj.id,
			method:"POST",
			data:$scope.obj
		}).success(function(e){
			alert("保存成功")
			$state.go("home")
		})
	}
}])
