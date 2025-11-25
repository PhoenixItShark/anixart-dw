    Java.perform(function () {
        var OkHttpClient = Java.use('okhttp3.OkHttpClient');
        var Request = Java.use('okhttp3.Request');
        var Response = Java.use('okhttp3.Response');

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
            } catch (e) {
                console.log("Error: " + e);
            }
            return req;
        };

        // Intercept responses
        var Call = Java.use("okhttp3.RealCall");
        Call.execute.implementation = function () {
            var res = this.execute();
            try {
                console.log("\n[RESPONSE]");
                console.log("From: " + res.request().url());
                console.log("Status: " + res.code());
            } catch (e) {}
            return res;
        };
    });


///------------------------------------------------------

  