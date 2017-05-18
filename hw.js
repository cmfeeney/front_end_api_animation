$(function() {
  $('.load-stuff').on('click', function(event) {
    var _this = this;
    var mykey = config.key;
    var secret_key = config.secret_key;
    var market = {}
    market['RDU'] = 366
    market['ATL'] = 220
    market['LA'] = 324
    var choice = $('select[name="cities"]').val();
    var mar_value = market[choice];
   $.ajax({
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?size=5&dmaId='+mar_value+'&apikey='+mykey,
      method: 'GET',
    }).then(function(data) {
      console.log(data);

       $('.table tbody > tr').remove();
       var list = data["_embedded"]["events"]
      // var sorted = sortBy(list, { prop: ["dates"]["start"].localDate });
      function compare(a, b)
      {

        if (a["dates"]["start"].localDate < b["dates"]["start"].localDate) return -1;
        if (a["dates"]["start"].localDate > b["dates"]["start"].localDate) return 1;
        return 0;
      }
     list.sort(compare);
     list.forEach(function(item){
        console.log(item);
        var pic = item["images"][0].url;
        var pic_tag = '<img src="' + pic + '" height = "200" width = "200"/>';
        //var pic_tag = $("<img />").prop('src', pic);
        var artist = item.name;
        var date = item["dates"]["start"].localDate;
        var venue = item["_embedded"]["venues"]["0"].name;
        var add = "<tr align=center><td>" + pic_tag + "</td><td>" + artist + "</td><td>" + date + "</td><td>" + venue + "</td></tr>";
          $(add).attr("align","center")
          $('.table').append(add)
      });



    }).catch(function(err) {
      // try bad endpoint, see an error
      console.log('we got an error!');
      console.log(err);
    });

  });

});
