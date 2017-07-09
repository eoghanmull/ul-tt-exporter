  $("body").css("display", "none");
$( document ).ready(function() {
      if (top.location.pathname === '/landing')

{
     $("body").show();
}
    else
{
     $("body").css("display", "none");
     $("body").animate({width:'toggle'},2000);
}
   
    console.log( "ready!" );
 $( "#export" ).click(function() {
 $("body").fadeOut(1000, index);
              router.get("/", (req, res) => {
    res.render("/");
});

     });

    $( "#submitBtn" ).click(function() {

        
        $( "#inputId" ).fadeOut( "slow", function() {
    
        });
        $( "#submit" ).fadeOut( "slow", function() {
            showLoader();
        });
        var idInput = document.getElementById("S").value;
        var result = checkInput(idInput);
        if(result=="OK"){
            setTimeout(function() {
                console.log("Next page");
                //window.location.href = '/login'
                $("body").fadeOut(1000, loginPage);
              router.get("/login", (req, res) => {
    res.render("login");
});
            }, 2500);
        }
        else{
           setTimeout(function() {
                $("#loader").hide();
                $( "#inputId" ).fadeIn( "slow", function() {
                });
                $( "#submit" ).fadeIn( "slow", function() {
                });
                //console.log(flag);
               // alert(flag);
               Materialize.toast(result, 6000);
            }, 2500);
        }
    });
});

function showLoader(callback){
    $("#loader").fadeIn("slow", function(){
    });
}

function checkInput(idInput){
    var flag = "";
    var n = idInput.length;
    console.log(n);
    var check = /^\d+$/.test(idInput);
    //console.log(check);
    //console.log(idInput);
    if(n!=8){
        flag = "Not enough characters (8 digits expected) ";
        console.log("Invalid ID number -",flag);
    }
    if(!check){
        //test this line
        flag = flag + "ID consists of digits only";
        console.log("Invalid ID number - ",flag);
    }
    if(n==8 && check){
        flag = "OK"
    }
    return flag;
}

  function loginPage() {
        window.location.href = '/login';
        $("body").hide();
       
    }