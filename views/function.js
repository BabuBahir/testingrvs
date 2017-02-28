function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i<arr.length; i++) {
        var city = arr[i].name; 
         city=city.replace(/\s+/g, ''); 
        console.log(city)
        out += "<tr><td>"+arr[i].name+"</td><td><input type='text' class='pick-me' data-state="+city+" data-stage='zone-1'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='zone-2'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='zone-3'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='zone-4'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='zone-5'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='soil-1'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='soil-2'></td><td><input type='text' class='pick-me' data-state="+city+" data-stage='soil-3'></td></tr>";
    }
    document.getElementById("id01").innerHTML = "<thead><tr><th style='border:2px solid gray'>State</th><th id='dd'></th><th id='dd'></th><th id='dd'>EarthQuake Zone</th><th id='dd'></th><th id='dd'></th><th  style='border-left:2px solid gray;border-bottom:2px solid gray'></th><th id='dd'>Soil</th><th id='dd'></th></tr></thead>"+out;
}