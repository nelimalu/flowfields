window.addEventListener('load', (event) => {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == "program") 
        {
            console.log(sParameterName[1]);

            var p5 = document.createElement('script');
            p5.src = `p5.min.js`;
            document.body.appendChild(p5);

            var script = document.createElement('script');
            script.src = `artiterations/${sParameterName[1]}.js`;
            document.body.appendChild(script);

            console.log("appended");
        }
    }
});
