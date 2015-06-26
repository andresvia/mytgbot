
var redis = require('redis');
var URI = require('uri-js');

// REDIS_URL => redis://h:password@host:port"

var redis_uri = URI.parse(process.env.REDIS_URL);

var redis_client = redis.createClient(redis_uri.port, redis_uri.host)
redis_client.auth(redis_uri.userinfo.split(':')[1])


redis_client.on('message', function(ch, m) {
  var msg = JSON.parse(m);

  // {"update_id":38664384,"message":{"message_id":16,"from":{"id":346904,"first_name":"Andres","last_name":"Villarroel Acosta","username":"andresvia"},"chat":{"id":346904,"first_name":"Andres","last_name":"Villarroel Acosta","username":"andresvia"},"date":1435302373,"text":"yo!"}}

  if (msg.message) {
    console.log(msg.message.text);
  }

});

redis_client.subscribe(process.env.BOT_NAME);

