(function(){
    "use strict";

    var events = [
        "app.record.create.change.郵便番号",
        "app.record.edit.change.郵便番号"
    ];

    kintone.events.on(events, function(event){
        var zipcode = event.record.郵便番号.value;
        kintone.proxy(
            'http://zipcloud.ibsnet.co.jp/api/search?zipcode=' + zipcode,'GET',{}, {},function(body) {
            var response = JSON.parse(body);
            var record = kintone.app.record.get();
            if (response.status == 200) {
                record.record.県名.value = response.results[0]["address1"]
                record.record.所在地.value = response.results[0]["address2"];
                record.record.所在地.value += response.results[0]["address3"];
                kintone.app.record.set(record);
            } else if (response.message) {
                alert("正常に通信できませんでした");
            } else {
                alert('郵便番号検索に失敗しました');
            }
            },function(body) {
                alert('APIリクエストできませんでした');
            }
        );
        
        return event;
    });
})();
    
    