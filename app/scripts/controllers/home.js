
angular.module("yeomanApp").controller("home",["$scope","$http","server","$state","$cookieStore","$cookies",function($scope,$http,server,$state,$cookieStore,$cookies){	
	var coo=$cookies.get("uid")
	
	
	
	$scope.add=function(){
		$state.go("add")
	}
	$scope.dele=function(e){
		console.log(e)
			$http({
			url:server+"item/"+e.id,
			method:"delete"
		}).success(function(){
			$scope.data.splice($scope.data.indexOf(e),1)
		})
	}
	$scope.out=function(){
		$cookies.remove("username")
		$cookies.remove("password")
		$state.go("login")
	}
	var num=0;
			$http({
			url:server+"item",
			method:"GET",
			params:{"$skip":num,"$limit":5,"uid":coo}
		}).success(function(e){
			$scope.data = e
		})
	$scope.shang=function(){
			
			if(num<=0){
				alert("亲，已经是第一页了!")
				return false;
			}else{
				num-=5;
				$http({
			url:server+"item",
			method:"GET",
			params:{"$skip":num,"$limit":5,"uid":coo}
		   }).success(function(e){
				$scope.data=e
		    });
			}
		}
	$scope.xia=function(){
		num+=5;
		$http({
		url:server+"item",
		method:"GET",
		params:{"$skip":num,"$limit":5,"uid":coo}
	   }).success(function(e){
			if(e!=""){
				$scope.data=e
			}else{
				alert("亲，已经是最后一页了!")
				num-=5;
			}
	    });
	}
}])
