var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/monthly.html',
            controller: 'monthlyController'
        })
        .when('/about', {
            templateUrl: 'pages/page-about.html',
            controller: 'aboutController'
        })
        .when('/contact', {
            templateUrl: 'pages/page-contact.html',
            controller: 'contactController'
        })
        .when('/daily', {
            templateUrl: 'pages/daily.html',
            controller: 'dailyController'
        })
        .when('/evolucao', {
            templateUrl: 'pages/evolucao.html',
            controller: 'evolucaoController'
        })
        .when('/compras', {
            templateUrl: 'pages/compras.html',
            controller: 'comprasController'
        })
        .when('/monthly', {
            templateUrl: 'pages/monthly.html',
            controller: 'monthlyController'
        });

        //$locationProvider.html5Mode(true);
    
});


animateApp.controller('listprod', function($scope) {
    $scope.produtos = [];
    $scope.categorias=[];
    $scope.data = {};
    $scope.data.novoProduto = "";
    $scope.statusItem;
    $scope.carregou = true;

    myData = new Firebase("https://listadecompras.firebaseio.com/produtos");
    myData.once('value', function(snapshot){
                
        if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshotProdutos) { //para cada produto
                
                $scope.produtos.push({prodID: childSnapshotProdutos.key(), descricao: childSnapshotProdutos.child('descricao').val(), categoria: childSnapshotProdutos.child('categoria').val(), 'status': childSnapshotProdutos.child('status').val()}); 
                
            });
            $scope.carregou = false;
            $scope.$apply();
        } else {
            $scope.carregou = false;
        }            
    });
    
    $scope.saveProdutos = function(desc, categ){
        if ($scope.data.novoProduto == "") {
            //alert('sim');
            $scope.myValue=true;
            return false;
        } else {
            //alert('nao');
            myData.push({descricao:$scope.data.novoProduto, categoria:$scope.data.singleSelect});
            $scope.data.novoProduto = "";
            $scope.myValue=false;
        }
    };
    
    $scope.inserirLista = function(prodID, prodDesc, prodCateg, statusItem) {                            
        $scope.myData = new Firebase("https://listadecompras.firebaseio.com/produtos/" + prodID);
        $scope.myData.child('status').set(!statusItem); /*! para negar o que vem da tela*/
    };
    
    $scope.categorias = ['Alimentos', 'Bebidas', 'Produtos de Limpeza', 'Carnes e Frios', 'Hortifruti'];
    $scope.data.singleSelect = 'Alimentos';
    //$scope.carregou = false;
    $scope.$apply();
    
});


animateApp.controller('comprasCTRL', ['$scope', function($scope) {
    $scope.produtos = [];
    $scope.categorias=[];
    $scope.data = {};
    $scope.data.novoProduto = "";
    $scope.statusItem;
    $scope.carregou = true;

    myData = new Firebase("https://listadecompras.firebaseio.com/produtos");
    myData.orderByChild("status").equalTo(true).once('value', function(snapshot){
        
        if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshotProdutos) { //para cada produto
                
                $scope.produtos.push({prodID: childSnapshotProdutos.key(), descricao: childSnapshotProdutos.child('descricao').val(), categoria: childSnapshotProdutos.child('categoria').val(), 'status': childSnapshotProdutos.child('status').val()}); 
                
            });
            $scope.carregou = false;
            $scope.$apply();
        } else {
            $scope.carregou = false;
        }            
    });
    
    $scope.categorias = ['Alimentos', 'Bebidas', 'Produtos de Limpeza', 'Carnes e Frios', 'Hortifruti'];
    $scope.data.singleSelect = 'Alimentos';
    //$scope.carregou = false;
    $scope.$apply();
       
}]);


animateApp.controller('comprasController', function($scope) {
    $scope.pageClass = 'page-compras';
});

animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

animateApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';
});

animateApp.controller('evolucaoController', function($scope) {
    $scope.pageClass = 'page-evolucao';
});

animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});

animateApp.controller('monthlyController', function($scope, $filter, $interval) {
    
    $scope.pageClass = 'page-monthly';
    
    $scope.ano_mes = moment(new Date()).format('YYYYMM'); //dateFilter(new Date(), 'yyyyMM');
    
    $scope.data_exibir = moment($scope.ano_mes, "YYYYMM").format('MMMM YYYY');
    
    $scope.currentTime = moment(new Date()).format('HH:mm:ss'); //dateFilter(new Date(), 'hh:mm:ss');
    
    var updateTime = $interval(function() {
        $scope.currentTime = moment(new Date()).format('HH:mm:ss');
    }, 1000);
    
    $scope.carregar = function (dat_carregar) {        
        
        $scope.sla          = 0;
        $scope.abertos      = 0;
        $scope.encerrados   = 0;
        $scope.previstos    = 0;
        $scope.no_prazo     = 0;
        $scope.reabertos    = 0;
        
        $scope.carregou = true;
        
        myData = new Firebase("https://itdashboard.firebaseio.com/ambev/volpi/" + dat_carregar);
        myData.once('value', function(snapshot){
            if (snapshot.exists()) {
                $scope.sla          = snapshot.child('sla').val().toFixed(1);
                $scope.abertos      = snapshot.child('abertos').val();
                $scope.encerrados   = snapshot.child('encerrados').val();
                $scope.previstos    = snapshot.child('previstos').val();
                $scope.no_prazo     = snapshot.child('no_prazo').val();
                $scope.reabertos    = snapshot.child('reabertos').val();

                $scope.$apply();
                $scope.carregou = false;

                $scope.data_exibir = moment($scope.ano_mes, "YYYYMM").format('MMMM YYYY');
            } else {
                $scope.carregou = false;
            }            
        });
    };
    
    $scope.before = function() {
        $scope.ano_mes = moment($scope.ano_mes, "YYYYMM").subtract(1, 'months').format('YYYYMM');
        $scope.carregar($scope.ano_mes);
    };
    
    $scope.after = function() {
        $scope.ano_mes = moment($scope.ano_mes, "YYYYMM").add(1, 'months').format('YYYYMM');
        $scope.carregar($scope.ano_mes);
    };
    
});


/*novo daily====================*/
animateApp.controller('dailyController', function($scope, $filter, $interval) {

    $scope.pageClass = 'page-daily';
    
    var registro = function(sistema, volume) {
        this.sistema = sistema;
        this.volume = volume
    };
    
    var dados = [];
    
    
    $scope.dataSourceOri = [];
    $scope.dataSourceTOP5 = [];
    $scope.dataSourceCateg = [];
    
    $scope.ano_mes_dia = moment(new Date()).format('YYYYMMDD');//dateFilter(new Date(), 'yyyyMMdd');
    $scope.data_exibir = moment($scope.ano_mes_dia, "YYYYMMDD").format('DD MMMM YYYY');
    
    $scope.currentTime = moment(new Date()).format('HH:mm:ss');//dateFilter(new Date(), 'hh:mm:ss');
    
    var updateTime = $interval(function() {
        $scope.currentTime = moment(new Date()).format('HH:mm:ss');
    }, 1000);
    
    
    $scope.carregar = function (dat_carregar) {        
        
        $scope.sla          = 0;
        $scope.abertos      = 0;
        $scope.encerrados   = 0;
        $scope.previstos    = 0;
        $scope.no_prazo     = 0;
        $scope.reabertos    = 0;
        
        $scope.sla=0;
        $scope.vol_acum=0;
        $scope.reabertos=0;
        $scope.vcto_no_dia=0;
        
        var no_prazo = 0;
        var reabertos = 0;
        var vcto_no_dia = 0;
        var sla = 0;

        $scope.carregou = true;
        
        
        
        myData = new Firebase("https://itdashboard.firebaseio.com/ambev/volpi/" + dat_carregar.substring(0,6) + "/d" + $scope.ano_mes_dia);
        myData.on('value', function(snapshot){
            
            if (snapshot.exists()) {
                
                myDataChamados = new Firebase("https://itdashboard.firebaseio.com/ambev/volpi/" + dat_carregar.substring(0,6) + "/d" + $scope.ano_mes_dia + "/chamados");
                myDataChamados.on('value', function(snapshotChamados){    

                    $scope.dataSourceOri = [];
                    $scope.dataSourceTOP5 = [];
                    $scope.dataSourceCateg = [];

                    //$scope.sla          = snapshot.child('sla').val().toFixed(1);
                    $scope.abertos      = snapshot.child('abertos').val();
                    $scope.encerrados   = snapshot.child('encerrados').val();
                    $scope.previstos    = snapshot.child('previstos').val();
                    $scope.no_prazo     = snapshot.child('no_prazo').val();
                    $scope.reabertos    = snapshot.child('reabertos').val();                

                    snapshotChamados.forEach(function(childSnapshotChamados) { //para cada chamado

                            if (childSnapshotChamados.child('abertura').val().toString().substring(0,8) === $scope.ano_mes_dia) {                    

                                $scope.dataSourceOri.push({sistema: childSnapshotChamados.child('sistema').val().toString().substring(0,8), vol: 1});    
                                $scope.dataSourceCateg.push({categoria: childSnapshotChamados.child('categoria').val(), val: 1});

                            }

                    });
                    
                    $scope.dataSourceOri = groupBySistema($scope.dataSourceOri);            
                    var dChart = $("#bar-5").dxChart("instance");
                    dChart.option({ dataSource: $scope.dataSourceOri });
                    dChart._render();

                    $scope.dataSourceCateg = groupByCateg($scope.dataSourceCateg);
                    var dChartCateg = $("#bar-10").dxPieChart("instance");
                    dChartCateg.option({ dataSource: $scope.dataSourceCateg });
                    dChartCateg._render();
                    
                    $scope.$apply();
                });
                
                $scope.carregou = false;

            } else {
                
                $scope.carregou = false;
            
            }
            
        });
        
        $scope.data_exibir = moment($scope.ano_mes_dia, "YYYYMMDD").format('DD MMMM YYYY');
    };
    
    $scope.before = function() {
        $scope.ano_mes_dia = moment($scope.ano_mes_dia, "YYYYMMDD").subtract(1, 'day').format('YYYYMMDD');
        $scope.carregar($scope.ano_mes_dia);
    };
    
    $scope.after = function() {
        $scope.ano_mes_dia = moment($scope.ano_mes_dia, "YYYYMMDD").add(1, 'day').format('YYYYMMDD');
        $scope.carregar($scope.ano_mes_dia);
    };
    
    function groupBySistema(data) {
        
        var result = [];
        var cont = 0;
        var encontrou = 0;
        
        for	(i = 0; i < data.length; i++) {
            if(cont === 0){
                result.push({sistema: data[i].sistema, vol: data[i].vol});
                cont = 1;
            } else {
                //$scope.currentTime = data[i].sistema;
                encontrou = 0;
                for	(j = 0; j < result.length; j++) {
                    if(data[i].sistema === result[j].sistema) {
                        result[j].vol = result[j].vol + data[i].vol;
                        //$scope.currentTime = data[i].sistema + ' - ' + result[j].sistema;
                        //return result;
                        encontrou = 1;
                    }
                }
                if(encontrou === 0){
                    result.push({sistema: data[i].sistema, vol: data[i].vol});
                }
            }            
        }     
        result.sort(sortArray);
        return result;
    };
    
    function sortArray(a, b) {
        if(a.length === 0){
            return 0;
        }
        
        if (a.vol === b.vol) {
            return 0;
        }
        else {
            return (a.vol < b.vol) ? -1 : 1;
        }
    };
    
    
    function groupByCateg(data) {
        
        var result = [];
        var cont = 0;
        var encontrou = 0;
        
        for	(i = 0; i < data.length; i++) {
            if(cont === 0){
                result.push({categoria: data[i].categoria, val: data[i].val});
                cont = 1;
            } else {
                //$scope.currentTime = data[i].sistema;
                encontrou = 0;
                for	(j = 0; j < result.length; j++) {
                    if(data[i].categoria === result[j].categoria) {
                        result[j].val = result[j].val + data[i].val;
                        //$scope.currentTime = data[i].sistema + ' - ' + result[j].sistema;
                        //return result;
                        encontrou = 1;
                    }
                }
                if(encontrou === 0){
                    result.push({categoria: data[i].categoria, val: data[i].val});
                }
            }            
        }     
        //result.sort(sortArray);
        return result;
    };
    
});
