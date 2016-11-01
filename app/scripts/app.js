
angular.module("yeomanApp",["ui.router","ngCookies"]).constant("server","http://www.somenote.cn:1510/").config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state(
				"login",{
					url:"/login",
					templateUrl:"views/login.html",
					controller:"kzq"
				}
			).state(
				"sign",{
					url:"/sign",
					templateUrl:"views/sign.html",
					controller:"kzq"
				}
			).state(
				"home",{
					url:"/home",
					templateUrl:"views/home.html",
					controller:"home"
				}
			).state(
				"add",{
					url:"/add",
					templateUrl:"views/add.html",
					controller:"add"
				}
			).state(
				"revise",{
					url:"/revise?id&title&content",
					templateUrl:"views/revise.html",
					controller:"revise"
				}
			)
			$urlRouterProvider.when("","/login");
		}).controller("kzq",["$scope","$http","server","$state","$cookieStore","$cookies",function($scope,$http,server,$state,$cookieStore,$cookies){	
		
		if($cookies.get("username")&& $cookies.get("password")){
	 	 var username = $cookies.get("username")
		 var password = $cookies.get("password")
		 $scope.obj={
		 	username:username,
		 	password:password
		 }
		$scope.hide=false;
		$scope.me = "免登录启用中";
		$http({
			url:server+"users/login",
			method:"POST",			
			data:$scope.obj
			}).success(function(){
				alert("登录成功")
				$state.go("home")
			}).error(function(e){
				alert(e.message)
			})
	 }else if($cookies.get("username")){
	 	var username=$cookies.get("username")
	 	 $scope.obj={
		 	username:username
		 }
	 	 	$scope.hide=true;
			$scope.me ="7天免登录";
	 }else{
		 	$scope.hide=true;
			$scope.me ="7天免登录";
	 }
	$scope.remove = function(){
		$cookies.remove("username")
		$cookies.remove("password")
	}
	$scope.ck = function(){
		$http({
			url:server+"users",
			method:"POST",
			data:$scope.obj
		}).success(function(e){
			alert("注册成功")
			$cookies.put("username",$scope.obj.username);
//			$cookieStore.put("password",$scope.sign.password);
			$state.go("login")
		}).error(function(e){
			alert("注册失败")
		})
	}
	$scope.login = function(){
		if($scope.check==true){
			$http({
			url:server+"users/login",
			method:"POST",
			data:$scope.obj
		}).success(function(e){
			var exp = new Date();
  				exp.setDate(exp.getDate() + 7);
			$cookies.put("username",$scope.obj.username,{"expires":exp});
			$cookies.put("password",$scope.obj.password,{"expires":exp});
			$cookies.put("uid",e.uid,{"expires":exp});
			alert("登录成功")
			$state.go("home")
		}).error(function(e){
			alert("登录失败")
		})
	}else{
			$http({
			url:server+"users/login",
			method:"POST",
				data:$scope.obj
			}).success(function(e){
				alert("登录成功")
				$cookies.put("username",$scope.obj.username);
				$cookies.put("password",$scope.obj.password);
				$cookies.put("uid",e.uid);
				$state.go("home")
			}).error(function(e){
				alert("登录失败")
			})
		}
	}
	

//	$http({
//		url:server+"users/item",
//		method:"get"
//	}).success(function(e){
//		console.log(e)
//	})
//	
}])
