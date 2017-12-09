function toggle(el, act) {
  document.getElementById(el).style.visibility = act;
}
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function get_search_results(query){
  $.ajax({
    url: "/api/search/"+query,
    success: function(data){
      NProgress.set(0.8);
      document.getElementById("query_word").innerHTML += query;      
      for(i = 0;i < data.length;i++) {
        document.getElementById("results_list").innerHTML += '<li class="collection-item"><div>'+data[i]+'<a href="#!" class="go_to_user right" style="text-align:right; color:black;" user="'+data[i]+'" class="secondary-content"><i class="material-icons">keyboard_arrow_right</i></a></div></li>';
      }
      NProgress.done();
      $("#search_block").hide();
      $( ".go_to_user" ).on("click", function() {
        var user = this.getAttribute("user");
        console.log(user);
        window.location = "/static/user.html?login="+user;
    });
      $("#results_block").show();
    },
  });
}

$( "#search_button" ).on( "click", function() {
    NProgress.start();
    var query = $("#search_query").val();
    get_search_results(query);
});
function add_user(login, password, blog_name, keywords, birhday){
  $.ajax({
    type: "POST",
    url: "/api/users",
    data: JSON.stringify({'login': login, 'password': password, 'blog_name': blog_name, 'keywords': keywords, 'birthday': birhday}),
    success: function(msg){
      alert('wow'+msg);
    }
 }); 
}
function add_post(login, password, header, content){
  console.log("III")
  $.ajax({
    type: "POST",
    url: "/api/users/"+login+"/posts",
    data: JSON.stringify({'password': password, 'header': header, 'content': content})
 }); 
}
function get_user_data(login){
  $.ajax({
    type: "GET",
    url: "/api/users/"+login,
    success: function(data){
      var user_info = JSON.parse(data)[0];
      var user_posts_num = JSON.parse(data)[1];
      document.getElementById("email_field").innerHTML += user_info['email'];    
      document.getElementById("birthday_field").innerHTML += user_info['birthday'];
      document.getElementById("created_field").innerHTML += user_info['created_date'];
      document.getElementById("blog_field").innerHTML += user_info['blog_name'];
      document.getElementById("key_field").innerHTML += user_info['keywords'];
      document.getElementById("posts_num_field").innerHTML += user_posts_num;
    }
 }); 
}

$( "#reg_send_button" ).on( "click", function() {
  var login = $("#login").val();
  var password = $("#password").val();
  var blog_name = $("#blog_name").val();
  var birhday = $("#birthday").val();
  var keywords = $("#keywords").val();
  add_user(login, password, blog_name, keywords, birhday);
});
$( "#add_post_button" ).on( "click", function() {
  $('#submit_modal').modal('open');
});

$( "#send_post_button" ).on( "click", function() {
  var header = $("#post_header").val();
  var content = quill.getContents()['ops'][0]['insert'];
  var login = $("#login_input").val();
  var password = $("#password_input").val();
  add_post(login, password, header, content);
});
function get_all_user_posts(user) {
  $.ajax({
      url: "/api/users/"+user+"/posts?range=10,0",
      success: function (data) {
          render_user_page(data);
      },
      error: function (error) {
          console.log("ERROR!");
      }
  });
}
function render_user_page(data){
  for(i = 1;i < data.length;i++) {
    document.getElementById("posts_list").innerHTML += '<li class="collection-item"><div>'+data[i]['header']+'<a href="#!" class="secondary-content"><i style="color:black;" class="material-icons">arrow_forward</i></a></div></li>';
    console.log(data[i]);
  }
  setTimeout(
    function(){
      $("#load_data").remove();
      $( "#add_post_button" ).on( "click", function() {
        window.location.href="/static/page.html";
      });
      toggle("ui_content", "visible");
    }
  ,3000);
}