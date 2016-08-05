angular.module('app', [])
    .controller('test1', [function() {
        var self = this;


        self.list = [{
            id: 1,
            ort: "",
            cnt: ""
                // ort: "recursive",
                // cnt: "{test}"
        }];

        // self.inputbox = "This is a \{test\} text containing some escaped \\\{bar\} tokens, \\lots of \\\\\\\\backslashes \\\\\{test\} and even \{recursive\} tokens!";
        // self.inputbox = "even {recursive}!";


        self.removeButton = function(delid) {
            for (var i = 0; i < self.list.length; i++) {
                if (self.list[i].id == delid) {
                    self.list.splice(i, 1);
                }
            }
        };

        self.addButton = function() {
            self.list.push({
                id: self.list.length + 1,
                ort: "",
                cnt: ""
            });
        };

        self.replaceAction = function() {
            var originString = "";
            var changeString = "";
            originString = self.inputbox;
            changeString = originString;
            if (typeof(originString) != "undefined") {
                for (var i = 0; i < self.list.length; i++) {

                    changeString = scan(changeString, self.list[i].ort, self.list[i].cnt);
                }
                self.outputbox = changeString;
            }
        };

        // function escapeRegExp(changeString, str) {
        //     return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        // };


        function scan(changeString, ort, cnt) {
            var tempChangeString = changeString;

            for (var i = 0; i <= tempChangeString.length; i++) {
                if (tempChangeString.substring(i, i + ort.length).indexOf(ort) != -1 || tempChangeString.substring(i - 4, i).indexOf("\\\\\\\\") != -1) {

                    if ((i - 3) >= 0 && tempChangeString.substring(i - 3, i + 1 + ort.length).indexOf("\\\\\{" + ort + "\}") != -1) {
                        // \\{test}
                        console.log("function 1");
                        tempChangeString = tempChangeString.replace("\\\{" + ort + "\}", cnt);
                    } else if ((i - 2) >= 0 && tempChangeString.substring(i - 2, i + 1 + ort.length).indexOf("\\\{" + ort + "\}") != -1) {
                        // \{test}
                        console.log("function 2");
                    } else if ((i - 1) >= 0 && tempChangeString.substring(i - 1, i + 1 + ort.length).indexOf("\{" + ort + "\}") != -1) {
                        // {test}
                        console.log("function 3");
                        tempChangeString = tempChangeString.replace("\{" + ort + "\}", cnt);
                    } else if ((i - 2) >= 0 && tempChangeString.substring(i - 2, i + ort.length).indexOf("\\\\" + ort) != -1) {
                        // \\test
                        console.log("function 4");
                        tempChangeString = tempChangeString.replace("\\\\" + ort, cnt);
                    } else if ((i - 1) >= 0 && tempChangeString.substring(i - 1, i + ort.length).indexOf("\\" + ort) != -1) {
                        // \test
                        console.log("function 5");
                    } else if (tempChangeString.substring(i, i + ort.length).indexOf(ort) != -1) {
                        // test
                        console.log("function 6");
                        tempChangeString = tempChangeString.replace(ort, cnt);
                    } else if (tempChangeString.substring(i - 4, i).indexOf("\\\\\\\\") != -1) {
                        // test
                        console.log("function 7");
                        tempChangeString = tempChangeString.replace("\\\\\\\\", "\\\\");
                    }

                }
                if (i == tempChangeString.length) {
                    changeString = tempChangeString;
                    console.log("\"" + ort + "\" change to \"" + cnt + "\" : " + changeString)
                    return changeString;
                }

            }
        };
    }]);
