$(function() {

  var makeAnotherRequest = function(deckId) {
    $.ajax({
      url: 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=2',
      method: 'GET',
    }).then(function(data) {
      console.log(data);
      $('.target-image').prop('src', data.cards[0].image);
    }).catch(function(err) {
      // try bad endpoint, see an error
      console.log('we got an error!');
      console.log(err);
    });
  };

  $('.load-stuff').on('click', function(event) {
    var _this = this;

    $.ajax({
      url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
      method: 'GET',
    }).then(function(data) {
      makeAnotherRequest(data.deck_id);
    }).catch(function(err) {
      // try bad endpoint, see an error
      console.log('we got an error!');
      console.log(err);
    });

  });

});
