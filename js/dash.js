var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    
    $scope.prod_incluir = "";
    
    $scope.categorias = [{
      id: 1,
      label: 'Alimentos'
    }, {
      id: 2,
      label: 'Bebidas'
    }];
    
    $scope.selected = $scope.categorias[0];
    
    $scope.unidades = [{
      ID: 1,
      UF: 'SP',
      label: 'F. Jaguariúna',
      status: true,   
      TME: '2,3,4,5,2,3,4,4,2,3,1,2,1',
      total_nfs_dia: 165,
      ultima_nf: 143234,
      emissao: '13/04/2017 14:22',
      tempo_emissao: '00:02:11'    
    }, {
      ID: 2,
      UF: 'RJ',
      label: 'F. Nova Rio',
      status: false,
      TME: '2,3,4,5,2,3',
      total_nfs_dia: 125,
      ultima_nf: 155555,
      emissao: '13/04/2017 14:32',
      tempo_emissao: '00:03:11'    
    }, {
      ID: 3,
      UF: 'MG',
      label: 'F. Nova Minas',
      status: true,
      TME: '2,3,4,5,2,3',
      total_nfs_dia: 18,
      ultima_nf: 15777,
      emissao: '13/04/2017 16:32',
      tempo_emissao: '00:08:11'    
    }, {
      ID: 4,        
      UF: 'MG',
      label: 'F. Minas',
      status: false,
      TME: '2,3,4,5,2,4',
      total_nfs_dia: 88,
      ultima_nf: 23453,
      emissao: '16/04/2017 16:32',
      tempo_emissao: '00:01:21'    
    }];
    
    $scope.saveProduct = function(desc, categ){
        //alert(desc + " - " + categ);
        if (desc != "") {
            $scope.produtos.push({id:10, label: desc, categ: categ});
            $scope.prod_incluir = "";
        }    
    };
    
});