    Java.perform(function () {
        // Intercept building of the request
        var RequestBuilder = Java.use("okhttp3.Request$Builder");
        RequestBuilder.build.implementation = function () {
            var req = this.build();
            try {
                console.log("\n[REQUEST]");
                console.log("URL: " + req.url().toString());
                console.log("Method: " + req.method());
                
                var headers = req.headers();
                console.log("Headers: " + headers.toString());
                console.log("\n[REQUEST]");
            } catch (e) {
                console.log("\n[REQUEST ERROR]");
                console.log("Error: " + e);
                console.log("\n[REQUEST ERROR]");
            }
            return req;
        };

        var ResponseBody = Java.use('okhttp3.ResponseBody');
        ResponseBody.string.implementation = function () {
            var bodyString = this.string();
            try {
               console.log("\n[RESPONSE BODY]");
                console.log("Body: " + bodyString);
                console.log("\n[RESPONSE BODY]");
            } catch (e) {
                console.log("\n[RESPONSE ERROR]");
                console.log("Error: " + e);
                console.log("\n[RESPONSE ERROR]");
            }
            
        };
    });
///------------------------------------------------------

  