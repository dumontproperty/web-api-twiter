angular.module('app-templates', []).run(['$templateCache', function($templateCache) {
$templateCache.put("views/404.html",
"<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Page Not Found :(</title><style>::-moz-selection {\n" +
"        background: #b3d4fc;\n" +
"        text-shadow: none;\n" +
"      }\n" +
"\n" +
"      ::selection {\n" +
"        background: #b3d4fc;\n" +
"        text-shadow: none;\n" +
"      }\n" +
"\n" +
"      html {\n" +
"        padding: 30px 10px;\n" +
"        font-size: 20px;\n" +
"        line-height: 1.4;\n" +
"        color: #737373;\n" +
"        background: #f0f0f0;\n" +
"        -webkit-text-size-adjust: 100%;\n" +
"        -ms-text-size-adjust: 100%;\n" +
"      }\n" +
"\n" +
"      html,\n" +
"      input {\n" +
"        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n" +
"      }\n" +
"\n" +
"      body {\n" +
"        max-width: 500px;\n" +
"        padding: 30px 20px 50px;\n" +
"        border: 1px solid #b3b3b3;\n" +
"        border-radius: 4px;\n" +
"        margin: 0 auto;\n" +
"        box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\n" +
"        background: #fcfcfc;\n" +
"      }\n" +
"\n" +
"      h1 {\n" +
"        margin: 0 10px;\n" +
"        font-size: 50px;\n" +
"        text-align: center;\n" +
"      }\n" +
"\n" +
"      h1 span {\n" +
"        color: #bbb;\n" +
"      }\n" +
"\n" +
"      h3 {\n" +
"        margin: 1.5em 0 0.5em;\n" +
"      }\n" +
"\n" +
"      p {\n" +
"        margin: 1em 0;\n" +
"      }\n" +
"\n" +
"      ul {\n" +
"        padding: 0 0 0 40px;\n" +
"        margin: 1em 0;\n" +
"      }\n" +
"\n" +
"      .container {\n" +
"        max-width: 380px;\n" +
"        margin: 0 auto;\n" +
"      }\n" +
"\n" +
"      /* google search */\n" +
"\n" +
"      #goog-fixurl ul {\n" +
"        list-style: none;\n" +
"        padding: 0;\n" +
"        margin: 0;\n" +
"      }\n" +
"\n" +
"      #goog-fixurl form {\n" +
"        margin: 0;\n" +
"      }\n" +
"\n" +
"      #goog-wm-qt,\n" +
"      #goog-wm-sb {\n" +
"        border: 1px solid #bbb;\n" +
"        font-size: 16px;\n" +
"        line-height: normal;\n" +
"        vertical-align: top;\n" +
"        color: #444;\n" +
"        border-radius: 2px;\n" +
"      }\n" +
"\n" +
"      #goog-wm-qt {\n" +
"        width: 220px;\n" +
"        height: 20px;\n" +
"        padding: 5px;\n" +
"        margin: 5px 10px 0 0;\n" +
"        box-shadow: inset 0 1px 1px #ccc;\n" +
"      }\n" +
"\n" +
"      #goog-wm-sb {\n" +
"        display: inline-block;\n" +
"        height: 32px;\n" +
"        padding: 0 10px;\n" +
"        margin: 5px 0 0;\n" +
"        white-space: nowrap;\n" +
"        cursor: pointer;\n" +
"        background-color: #f5f5f5;\n" +
"        background-image: -webkit-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
"        background-image: -moz-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
"        background-image: -ms-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
"        background-image: -o-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
"        -webkit-appearance: none;\n" +
"        -moz-appearance: none;\n" +
"        appearance: none;\n" +
"      }\n" +
"\n" +
"      #goog-wm-sb:hover,\n" +
"      #goog-wm-sb:focus {\n" +
"        border-color: #aaa;\n" +
"        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n" +
"        background-color: #f8f8f8;\n" +
"      }\n" +
"\n" +
"      #goog-wm-qt:hover,\n" +
"      #goog-wm-qt:focus {\n" +
"        border-color: #105cb6;\n" +
"        outline: 0;\n" +
"        color: #222;\n" +
"      }\n" +
"\n" +
"      input::-moz-focus-inner {\n" +
"        padding: 0;\n" +
"        border: 0;\n" +
"      }</style></head><body><div class=\"container\"><h1>Not found <span>:(</span></h1><p>Sorry, but the page you were trying to view does not exist.</p><p>It looks like this was the result of either:</p><ul><li>a mistyped address</li><li>an out-of-date link</li></ul><script>var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;</script><script src=\"//linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js\"></script></div></body></html>");
$templateCache.put("views/createuser.html",
"<div class=\"card\"><div class=\"card-header\"><h2>New user <small>Create a new user</small></h2></div><div class=\"card-body card-padding\"><form role=\"form\"><div class=\"form-group fg-line\"><label for=\"userRole\">User role</label><br><select id=\"userRole\" ng-model=\"newUser.role\" style=\"min-width: 200px\"><option ng-value=\"admin\" ng-repeat=\"userRole in userRoles\">{{userRole}}</option></select></div><div class=\"form-group fg-line\"><label for=\"userName\">Username</label><input type=\"text\" class=\"form-control input-sm\" id=\"userName\" ng-model=\"newUser.name\" placeholder=\"username\"></div><div class=\"form-group fg-line\"><label for=\"email\">Email address</label><input type=\"email\" class=\"form-control input-sm\" id=\"email\" ng-model=\"newUser.email\" placeholder=\"email\"></div><button type=\"submit\" ng-click=\"signUp(newUser)\" class=\"btn btn-primary btn-sm m-t-10 waves-effect\">Create</button></form><div ng-show=\"successMessage !== ''\" class=\"alert alert-success\" style=\"margin-top:2%\" role=\"alert\">{{successMessage}}</div><div ng-show=\"errorMessage\" class=\"alert alert-danger\" style=\"margin-top:2%\" role=\"alert\">{{errorMessage}}</div></div></div>");
$templateCache.put("views/footer.html",
"<footer id=\"footer\">Copyright &copy; 2015 Material Admin<ul class=\"f-menu\"><li><a href=\"\">Home</a></li><li><a href=\"\">Dashboard</a></li><li><a href=\"\">Reports</a></li><li><a href=\"\">Support</a></li><li><a href=\"\">Contact</a></li></ul></footer>");
$templateCache.put("views/home.html",
"<div class=\"container\"><div class=\"card\"><div class=\"card-header\"><h2>Twit stream <small></small></h2><ul class=\"actions\"><li><a href=\"\"><i class=\"zmdi zmdi-refresh-alt\"></i></a></li><li><a href=\"\"><i class=\"zmdi zmdi-download\"></i></a></li><li class=\"dropdown\"><a href=\"\" data-toggle=\"dropdown\"><i class=\"zmdi zmdi-more-vert\"></i></a><ul class=\"dropdown-menu dropdown-menu-right\"><li><a href=\"\">Change Date Range</a></li><li><a href=\"\">Change Graph Type</a></li><li><a href=\"\">Other Settings</a></li></ul></li></ul></div><div class=\"card-body\"><button class=\"btn btn-login btn-success\" ng-click=\"startStream()\">startStream</button> <button class=\"btn btn-login btn-danger\" ng-click=\"stopStream()\">stopStream</button> <button class=\"btn btn-login btn-success\" ng-click=\"getTwit()\">show list</button><div class=\"mini-charts-item bgm-lightgreen\" class=\"chart-edge\" ng-repeat=\"twit in twits\"><p>screenName: {{twit.screenName}}<br>location: {{twit.location}}</p></div></div></div></div>");
$templateCache.put("views/login.html",
"<div class=\"login-content\" ng-controller=\"LoginController\"><div class=\"lc-block toggled\" id=\"l-login\"><div class=\"lcb-form\"><div class=\"input-group m-b-20\"><span class=\"input-group-addon\"><i class=\"zmdi zmdi-account\"></i></span><div class=\"fg-line\"><input type=\"text\" class=\"form-control\" placeholder=\"Email address\" ng-model=\"user.email\"></div></div><div class=\"input-group m-b-20\"><span class=\"input-group-addon\"><i class=\"zmdi zmdi-male\"></i></span><div class=\"fg-line\"><input type=\"password\" class=\"form-control\" placeholder=\"Password\" ng-model=\"user.password\"></div></div><div class=\"checkbox\"><label><input type=\"checkbox\" ng-click=\"automaticLogin()\" ng-if=\"!isAutomaticLogin\"> <input type=\"checkbox\" ng-click=\"automaticLogin()\" ng-if=\"isAutomaticLogin\" checked=\"checked\"> <i class=\"input-helper\"></i> Keep me signed in</label></div><a href=\"\" class=\"btn btn-login btn-success btn-float\" ng-click=\"loginUser(user)\"><i class=\"zmdi zmdi-arrow-forward\"></i></a><div ng-show=\"successMessage !== ''\" class=\"alert alert-success\" role=\"alert\">{{successMessage}}</div><div ng-show=\"errorMessage !== ''\" class=\"alert alert-danger\" role=\"alert\">{{errorMessage}}</div></div><div class=\"lcb-navigation\"><a href=\"\" data-ma-action=\"login-switch\" data-ma-block=\"#l-forget-password\" ng-click=\"onGoToForgotPasswordView()\" style=\"width: 150px; padding:6px; text-align: center\">Forgot Password ?</a></div></div><div class=\"lc-block\" id=\"l-forget-password\"><div class=\"lcb-form\"><p class=\"text-left\">Enter your email address to reset your password.</p><div class=\"input-group m-b-20\"><span class=\"input-group-addon\"><i class=\"zmdi zmdi-email\"></i></span><div class=\"fg-line\"><input type=\"text\" class=\"form-control\" placeholder=\"Email Address\" ng-model=\"user.email\"></div></div><a href=\"\" class=\"btn btn-login btn-success btn-float\" ng-click=\"sendRessetPasswordEmail(user)\"><i class=\"zmdi zmdi-check\"></i></a><div ng-show=\"successMessage !== ''\" class=\"alert alert-success\" role=\"alert\">{{successMessage}}</div><div ng-show=\"errorMessage !== ''\" class=\"alert alert-danger\" role=\"alert\">{{errorMessage}}</div></div><div class=\"lcb-navigation\"><a href=\"\" data-ma-action=\"login-switch\" data-ma-block=\"#l-login\" ng-click=\"onGoToLoginView()\"><i class=\"zmdi zmdi-long-arrow-right\"></i> <span>Sign in</span></a></div></div></div>");
$templateCache.put("views/menu.html",
"<div><aside id=\"sidebar\" class=\"sidebar c-overflow\"><div class=\"s-profile\"><a href=\"\" data-ma-action=\"profile-menu-toggle\"><div class=\"sp-pic\"><img src=\"assets/profile-pics/2.jpg\" alt=\"\"></div><div class=\"sp-info\">Welcome {{USER_NAME}} ! <i class=\"zmdi zmdi-caret-down\"></i></div></a><ul class=\"main-menu\"><li><a href=\"/profile\"><i class=\"zmdi zmdi-account active\"></i>Profile</a></li><li><a href=\"\" ng-click=\"logout()\"><i class=\"zmdi zmdi-time-restore\"></i>Logout</a></li></ul></div><ul class=\"main-menu\"><li class=\"active\"><a href=\"/home\"><i class=\"zmdi zmdi-home\"></i>Home</a></li><li class=\"\"><a href=\"/createUser\"><i class=\"zmdi zmdi-account-add\"></i>Add user</a></li></ul></aside></div>");
$templateCache.put("views/navbar.html",
"<header id=\"header\" class=\"clearfix\" data-ma-theme=\"blue\"><ul class=\"h-inner\"><li class=\"hi-trigger ma-trigger\" data-ma-action=\"sidebar-open\" data-ma-target=\"#sidebar\"><div class=\"line-wrap\"><div class=\"line top\"></div><div class=\"line center\"></div><div class=\"line bottom\"></div></div></li><li class=\"hi-logo hidden-xs\"><a href=\"#\">web-api-twitter</a></li></ul></header>");
$templateCache.put("views/resetpassword.html",
"<div class=\"card reset-password\"><div class=\"card-header\"><h2>Reset your password <small>Set your new password.</small></h2></div><div class=\"card-body card-padding\"><form class=\"row\" role=\"form\"><div class=\"col-sm-3\"><div class=\"form-group fg-line\"><label class=\"sr-only\" for=\"holdPassword\">last password</label><input type=\"password\" class=\"form-control input-sm\" id=\"holdPassword\" ng-model=\"userPassword.newPassword\" placeholder=\"new password\"></div></div><div class=\"col-sm-3\"><div class=\"form-group fg-line\"><label class=\"sr-only\" for=\"confirmPassword\">new password</label><input type=\"password\" class=\"form-control input-sm\" id=\"confirmPassword\" ng-model=\"userPassword.confirmPassword\" placeholder=\"confirm your password\"></div></div><div class=\"col-sm-4\"><button type=\"submit\" class=\"btn btn-primary btn-sm m-t-5 waves-effect\" ng-click=\"reset(userPassword)\">Ok</button></div></form><div ng-show=\"logSuccess\" class=\"alert alert-success\" style=\"margin-top:2%\" role=\"alert\">{{logMessage}}</div><div ng-show=\"logError\" class=\"alert alert-danger\" style=\"margin-top:2%\" role=\"alert\">{{logMessage}}</div></div></div>");
$templateCache.put("views/userprofile.html",
"<div class=\"block-header\"><h2>{{globalUserInformation.name}} <small>{{globalUserInformation.role}}</small></h2></div><div class=\"card\" id=\"profile-main\"><div class=\"pm-body clearfix\"><ul class=\"tab-nav tn-justified\"><li ng-class=\"{'active' : ABOUT}\"><a href=\"\" ng-click=\"navigate('ABOUT')\">About</a></li><li ng-class=\"{'active' : CHANGE_PASSWORD}\"><a href=\"\" ng-click=\"navigate('CHANGE_PASSWORD')\">Change password</a></li></ul><div ng-if=\"ABOUT\"><div class=\"pmb-block\"><div class=\"pmbb-header\"><h2><i class=\"zmdi zmdi-equalizer m-r-10\"></i> Summary</h2><ul class=\"actions\"><li class=\"dropdown\"><a href=\"\" data-toggle=\"dropdown\"><i class=\"zmdi zmdi-more-vert\"></i></a><ul class=\"dropdown-menu dropdown-menu-right\"><li><a data-ma-action=\"profile-edit\" href=\"\">Edit</a></li></ul></li></ul></div><div class=\"pmbb-body p-l-30\"><div class=\"pmbb-view\">Summary innerview account.</div><div class=\"pmbb-edit\"><div class=\"fg-line\"><textarea class=\"form-control\" rows=\"5\" placeholder=\"Summary...\">Sed eu est vulputate, fringilla ligula ac, maximus arcu. Donec sed felis vel magna mattis ornare ut non turpis. Sed id arcu elit. Sed nec sagittis tortor. Mauris ante urna, ornare sit amet mollis eu, aliquet ac ligula. Nullam dolor metus, suscipit ac imperdiet nec, consectetur sed ex. Sed cursus porttitor leo.</textarea></div><div class=\"m-t-10\"><button class=\"btn btn-primary btn-sm waves-effect\">Save</button> <button data-ma-action=\"profile-edit-cancel\" class=\"btn btn-link btn-sm waves-effect\">Cancel</button></div></div></div></div><div class=\"pmb-block\"><div class=\"pmbb-header\"><h2><i class=\"zmdi zmdi-account m-r-10\"></i> Basic Information</h2><ul class=\"actions\"><li class=\"dropdown\"><a href=\"\" data-toggle=\"dropdown\"><i class=\"zmdi zmdi-more-vert\"></i></a><ul class=\"dropdown-menu dropdown-menu-right\"><li><a data-ma-action=\"profile-edit\" href=\"\">Edit</a></li></ul></li></ul></div><div class=\"pmbb-body p-l-30\"><div class=\"pmbb-view\"><dl class=\"dl-horizontal\"><dt>User name</dt><dd>{{globalUserInformation.name}}</dd></dl><dl class=\"dl-horizontal\"><dt>Email Address</dt><dd>{{globalUserInformation.email}}</dd></dl><dl class=\"dl-horizontal\"><dt>User role</dt><dd>{{globalUserInformation.role}}</dd></dl></div><div class=\"pmbb-edit\"><dl class=\"dl-horizontal\"><dt class=\"p-t-10\">User name</dt><dd><div class=\"fg-line\"><input type=\"text\" class=\"form-control\" placeholder=\"eg. Mallinda Hollaway\"></div></dd></dl><div class=\"m-t-30\"><button class=\"btn btn-primary btn-sm waves-effect\">Save</button> <button data-ma-action=\"profile-edit-cancel\" class=\"btn btn-link btn-sm waves-effect\">Cancel</button></div></div></div><div ng-show=\"errorMessage !== ''\" class=\"alert alert-danger\" role=\"alert\">{{errorMessage}}</div><div ng-show=\"successMessage !== ''\" class=\"alert alert-success\" role=\"alert\">{{successMessage}}</div></div></div><div ng-if=\"CHANGE_PASSWORD\"><div class=\"pmb-block\"><div class=\"pmbb-header\"><h2><i class=\"zmdi zmdi-equalizer m-r-10\"></i> Change password</h2></div><div class=\"card-body card-padding\"><form class=\"row\" role=\"form\"><div class=\"col-sm-3\"><div class=\"form-group fg-line\"><label class=\"sr-only\" for=\"holdPassword\">last password</label><input type=\"password\" class=\"form-control input-sm\" id=\"holdPassword\" ng-model=\"userPassword.holdPassword\" placeholder=\"old password\"></div></div><div class=\"col-sm-3\"><div class=\"form-group fg-line\"><label class=\"sr-only\" for=\"newPassword\">new password</label><input type=\"password\" class=\"form-control input-sm\" id=\"newPassword\" ng-model=\"userPassword.newPassword\" placeholder=\"new password\"></div></div><div class=\"col-sm-4\"><button type=\"submit\" class=\"btn btn-primary btn-sm m-t-5 waves-effect\" ng-click=\"changePassword(userPassword)\">modifier</button></div></form></div><div ng-show=\"errorMessage !== ''\" class=\"alert alert-danger\" role=\"alert\">{{errorMessage}}</div><div ng-show=\"successMessage !== ''\" class=\"alert alert-success\" role=\"alert\">{{successMessage}}</div></div></div></div></div>");
}]);
