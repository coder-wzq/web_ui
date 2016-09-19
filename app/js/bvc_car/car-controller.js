'use strict';

BlueViewApp.controller('CarController',
        ['$scope', '$rootScope','$location','CarService','_test_result',
          function($scope, $rootScope,$location,CarService,_test_result) {
    $scope.$on('$viewContentLoaded', function() {
    });
    //save as img
    var mychar = echarts.getInstanceByDom(($('#testChar')[0]).children[0]);
    var aDom = document.createElement("a");
    aDom.hidden = true;
    aDom.download = "chartPic";
    aDom.setAttribute("href",mychar.getDataURL());
    aDom.click();





    var base = +new Date(2016, 8, 3);
	var oneDay = 24 * 3600 * 1000;

	var data = [];
	for (var i = 1; i < 100; i++) {
	    var now = new Date(base += oneDay);
	    data.push({x:[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),y:Math.round((Math.random()) * 100)});
	}
	var pageload = {
        name: 'value',
        datapoints: data
    };
    $scope.data1 = [ pageload ];


	var data = [];
	for (var i = 1; i < 10; i++) {
	    var now = new Date(base += oneDay);
	    data.push({x:[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),y:Math.round((Math.random()) * 100)});
	}
	var pageload = {
        name: '',
        datapoints: data
    };
    $scope.data2 = [ pageload ];

    var data = [];
	for (var i = 1; i < 50; i++) {
	    var now = new Date(base += oneDay);
	    data.push({x:[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),y:Math.round((Math.random()) * 100)});
	}
	var pageload = {
        name: 'value',
        datapoints: data
    };
    $scope.data3 = [ pageload ];


    $scope.config = {
        // title: '',
        // subtitle: '',
        yAxis: { scale: true },
        debug: true,
        stack: true,
        width:500,
        height:300,
        showLegend:false
    };

    $scope.rowCollection = [
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102},
        {title: 'Laurent', net: 'Renard', createTime: '1987-05-21', reply: 102}
    ];

//'infographic', 'macarons', 'shine', 'dark', 'blue', 'green', 'red'
    $scope.pieConfig = {
        title: 'Pie Chart',
        subtitle: 'Pie Chart Subtitle',
        width:500,
        height:290,
        showLegend:true,
        center:['45%', '55%'],
        radius:'75%',
        theme:'macarons',
        debug: true
    };
    $scope.pieData = [ {
        name: '情感分析',
        datapoints: [
            { x: '好', y: 33 },
            { x: '一般', y: 44 },
            { x: '不好', y: 22 }
        ]
    } ];



    console.log(_test_result.data);
    console.log('car page');
    //-----------------------------------
    $scope.testWords = [{text:'wzq',size:100,test:'good'},{text:'qqqq',size:10,test:'good'},{text:'wwww',size:20,test:'good'},{text:'eeee',size:30,test:'good'},
          {text:'rrrr',size:50,test:'good'},{text:'tttt',size:70,test:'good'},{text:'yyyy',size:20,test:'good'},
          {text:'rrrr1',size:50,test:'good'},{text:'ttt1t',size:70,test:'good'},{text:'yyyy1',size:20,test:'good'},
          {text:'rrr2r',size:50,test:'good'},{text:'t2ttt',size:70,test:'good'},{text:'yy2yy',size:20,test:'good'},
          {text:'rrr3r',size:50,test:'good'},{text:'tt3tt',size:70,test:'good'},{text:'yyy3y',size:20,test:'good'},
          {text:'rr4rr',size:50,test:'good'},{text:'tt4tt',size:70,test:'good'},{text:'yy4yy',size:20,test:'good'},
          {text:'rr5rr',size:50,test:'good'},{text:'tt5tt',size:70,test:'good'},{text:'yy5yy',size:20,test:'good'},
          {text:'rr6rr',size:50,test:'good'},{text:'tt6tt',size:70,test:'good'},{text:'yyy6y',size:20,test:'good'}];


    var data = [];
    var netName = ['网易','搜狐','新浪','baidu','汽车之家','车行千里'];
    for (var i = 1; i < 7; i++) {
        var now = new Date(base += oneDay);
        data.push({x:netName[i-1],y:Math.round((Math.random()) * 100)});
    }
    var pageload = {
        name: '',
        datapoints: data
    };
    $scope.data7 = [ pageload ];

    var data = [];
    var netName = ['论坛','微信','微博','官方'];
    for (var i = 1; i < 5; i++) {
        var now = new Date(base += oneDay);
        data.push({x:netName[i-1],y:Math.round((Math.random()) * 100)});
    }
    var pageload = {
        name: '',
        datapoints: data
    };
    $scope.data8 = [ pageload ];


}]);
	