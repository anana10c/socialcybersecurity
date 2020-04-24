function showupdates()
    {
        localStorage.clear();
        var agenda = document.getElementById("agenda").value.split("\n");
        var inputElems = Array.from(document.getElementsByName("attendee"));
        var updates = {};
        inputElems.forEach(function(m) {
            if (m.checked) {
            updates[m.value] = document.getElementById(m.value).value;
            }
        } );
        var strdupdates = JSON.stringify(updates);
        var strdagenda = JSON.stringify(agenda);
        localStorage.setItem("agenda", strdagenda);
        localStorage.setItem("updates", strdupdates);
        console.log( localStorage );

        let obj = {
            agenda: strdagenda,
            updates: strdupdates
        };

        var strdObj = JSON.stringify(obj);
        var txtFile = "meetingnotes.txt"; 
    };