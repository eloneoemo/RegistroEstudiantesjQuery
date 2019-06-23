function editarEstudiante (id){
    var estudiante;
    for(var i = 0; i < localStorage.length;i++){
        var indice = localStorage.key(i);
        if(indice == id){
            estudiante = $.parseJSON(localStorage.getItem(indice));
            $("#codigo-input").val(estudiante.id);
            $("#nombre-input").val(estudiante.nombre);
            $("#nota-input").val(estudiante.nota);
        }
    };
    listarDatos();
    asignarId();
}
function borrarEstudiante(id) {
    localStorage.removeItem(id);
    listarDatos();
    asignarId();
}
function asignarId(){    
    var contador;
    if(localStorage.length<1){
        contador = 1;
    }else{
        var ids = [];
        for(var i = 0;i<localStorage.length;i++){
            var clave = localStorage.key(i);
            var id = $.parseJSON(localStorage.getItem(clave));
            ids.push(id.id);
        };
        var idMaximo = Math.max.apply(null , ids);
        contador = idMaximo +1;
    }; 
    $('#codigo-input').val(contador)
}
function listarDatos(){
    var template = "";
        if(localStorage.length>=1){
            template +="<table id='tabla'>";
            template +="<tr>";
            template +="<th>Código</th>";
            template +="<th>Nombre</th>";
            template +="<th>Nota</th>";
            template +="<th>Editar</th><th>Borrar</th>";
            template +="</tr>";
            for(var i=0;i<localStorage.length;i++){
                var clave = localStorage.key(i);
                var estudiante =  $.parseJSON(localStorage.getItem(clave));
                template += "<tr><td>"+estudiante.id +"</td><td>"+estudiante.nombre +"</td><td>"+estudiante.nota+"</td><td><button onclick='editarEstudiante(\""+estudiante.id+"\")'>Editar</button></td><td><button onclick='borrarEstudiante(\""+estudiante.id+"\")'>Borrar</button></td></tr>";
            };
            template +="</table>";
        }else{
            template +="No hay registros para mostrar."
        }
        $("#datos").html(template)
}
function limparCampos(){
    var nombre = $('#nombre-input').val("");
    var nota = $('#nota-input').val("");
    asignarId();
    listarDatos();
}
$(document).ready(function(){   
    // Función registrar
    $("#registrar").click(function(){
        var id = $('#codigo-input').val();
        var nombre = $('#nombre-input').val();
        var nota = $('#nota-input').val();

        var estudiante = {
            id : id,
            nombre : nombre,
            nota : nota
        }
        localStorage.setItem(id, JSON.stringify(estudiante));
        limparCampos();        
    });

    $('#mayor-nota').click(function(){
        var nota = [];
        var template = "<h4>El estudiante con la nota más alta es:</h4>";
        for(var i = 0;i<localStorage.length;i++){
            var clave = localStorage.key(i);
            var notasEstudiantes = $.parseJSON(localStorage.getItem(clave));
            nota.push(notasEstudiantes.nota);
        };
        var maximo = Math.max.apply(null , nota);
        
        for(var i = 0; i < localStorage.length;i++){
            var indice = localStorage.key(i);
            var notasTotales = $.parseJSON(localStorage.getItem(indice));
            if(parseInt(notasTotales.nota) === maximo){
                template += "<p>"+notasTotales.nombre+", con una nota de: "+notasTotales.nota+"<p>";
                $("#span-div").html(template)
            };
        };
    });
    $('#menor-nota').click(function(){
        var nota = [];
        var template = "<h4>El estudiante con la nota más baja es:</h4>";
        for(var i = 0;i<localStorage.length;i++){
            var clave = localStorage.key(i);
            var notasEstudiantes = $.parseJSON(localStorage.getItem(clave));
            nota.push(notasEstudiantes.nota);
        };
        var maximo = Math.min.apply(null , nota);
        
        for(var i = 0; i < localStorage.length;i++){
            var indice = localStorage.key(i);
            var notasTotales = $.parseJSON(localStorage.getItem(indice));
            if(parseInt(notasTotales.nota) === maximo){
                template += "<p>"+notasTotales.nombre+", con una nota de: "+notasTotales.nota+"<p>";
                $("#span-div").html(template)
            };
        };
    });
    $('#promedio').click(function(){
        var nota = 0;
        var template = "<h4>La nota total promedio es:</h4>";
        for(var i = 0;i<localStorage.length;i++){
            var clave = localStorage.key(i);
            var notasEstudiantes = $.parseJSON(localStorage.getItem(clave));
            nota+=parseInt(notasEstudiantes.nota);
        };
        nota = (nota)/i;
        template+= "<p>"+nota.toFixed(2)+"</p>";
        $("#span-div").html(template)
    });
    asignarId();
    listarDatos();    
}); // Aqui termina el .ready