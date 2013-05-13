function test() {
    //RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
    pvkey = new RSAKeyPair("0", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");
    pbkey = new RSAKeyPair("10001", "0", "30db31542ace0f7d37a629ee5eba28cb");

    ciphertext = encryptedString(pbkey, "abc");
    plaintext = decryptedString(pvkey, ciphertext);
}

function test1() {
    //RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
    pvkey1 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "0", "30db31542ace0f7d37a629ee5eba28cb");
    pbkey1 = new RSAKeyPair("0", "10001", "30db31542ace0f7d37a629ee5eba28cb");

    ciphertext = encryptedString(pvkey1, "abc");
    plaintext = decryptedString(pbkey1, ciphertext);
}

function test2() {
    //RSAKeyPair(encryptionExponent, decryptionExponent, modulus)
    pvkey2 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");
    pbkey2 = new RSAKeyPair("10001", "10001", "30db31542ace0f7d37a629ee5eba28cb");

    ciphertext = encryptedString(pvkey2, "abc");
    plaintext = decryptedString(pbkey2, ciphertext);

    ciphertext = encryptedString(pbkey2, "abc");
    plaintext = decryptedString(pvkey2, ciphertext);
}

primes = [1299553, 1299583, 1299601, 1299631, 1299637, 1299647, 1299653, 1299673, 1299689, 1299709];
var unique = 329121321414214;
var limit = 10;

function getAuthkey(unique, limit) {
    pvkey2 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");

    var shaAuthkey = hex_sha1((unique + primes[10 - limit]).toString());
    var authkey = encryptedString(pvkey2, shaAuthkey);
    return authkey;
}

function getShortAuthkey(unique, limit) {
    pvkey2 = new RSAKeyPair("202700adbd85e2d7182720c3a0ee19c1", "202700adbd85e2d7182720c3a0ee19c1", "30db31542ace0f7d37a629ee5eba28cb");

    var RSAAuthkey = encryptedString(pvkey2, (unique + primes[10 - limit]).toString());
    var authkey = hex_sha1(RSAAuthkey);
    var shortAuthkeyStr = authkey.substr(0, 5);
    var shortAuthkeyNum = Math.floor(parseInt(shortAuthkeyStr, 16) / 1.048577);
    var shortAuthkey = shortAuthkeyNum.toString();
    if (shortAuthkeyNum < 100000) {
        shortAuthkey = shortAuthkeyNum.toPrecision(6).split(".")[1].concat(shortAuthkeyNum);
    }
    //shortAuthkey = ?
    return shortAuthkey;
}

function buildupKey() {
    RSA.setMaxDigits(38);
    var pbkeyStr3 = RSA.RSAKeyStr(
        "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841",
        "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841",
        "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pbkey3 = RSA.RSAKey(pbkeyStr3);

    var pvkeyStr3 = RSA.RSAKeyStr(
        "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1",
        "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1",
        "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");

    var pvkey3 = RSA.RSAKey(pvkeyStr3);

    ciphertext = RSA.encryptedString(pvkey3, "abc");
    plaintext = RSA.decryptedString(pbkey3, ciphertext);

    ciphertext = RSA.encryptedString(pbkey3, "abc");
    plaintext = RSA.decryptedString(pvkey3, ciphertext);

}

function buildupKey2() {
    setMaxDigits(38);
    var pbkey4 = new RSAKeyPair(
        "10001",
        "10001",
        "3e625c0a2e0fcbc7aeeda55b940c60c9cb96e9ba9de21ff7d1fe55d9924d2e5");

    var pvkey4Str = RSAKeyStr(
        "2e6899b3f1044b42a77d9f0ffb9921bc95b4af0f0a1e2b987c4b2625f242d81",
        "2e6899b3f1044b42a77d9f0ffb9921bc95b4af0f0a1e2b987c4b2625f242d81",
        "3e625c0a2e0fcbc7aeeda55b940c60c9cb96e9ba9de21ff7d1fe55d9924d2e5");

    var pvkey4 = RSAKey(pvkey4Str);

    ciphertext = encryptedString(pvkey4, "abc");
    plaintext = decryptedString(pbkey4, ciphertext);

    ciphertext = encryptedString(pbkey4, "abc");
    plaintext = decryptedString(pvkey4, ciphertext);

}
function buildupKey2() {
    var pbkey5a = new RSAKeyPair("10001", "8064edb1f26944f6bec2b68789db7ffd08b074d0953b76feca71dc8265c60e9", "2687f5ac6c70f9cab32fcbded7059502f4c7cc95fc3e09a560c68975ac4bf5e3");
    setMaxDigits(38);
    var pbkey5 = new RSAKeyPair("10001", "10001", "2687f5ac6c70f9cab32fcbded7059502f4c7cc95fc3e09a560c68975ac4bf5e3");
    var pvkey5 = new RSAKeyPair("8064edb1f26944f6bec2b68789db7ffd08b074d0953b76feca71dc8265c60e9", "8064edb1f26944f6bec2b68789db7ffd08b074d0953b76feca71dc8265c60e9", "2687f5ac6c70f9cab32fcbded7059502f4c7cc95fc3e09a560c68975ac4bf5e3");

    ciphertext = encryptedString(pvkey5, "abc");
    plaintext = decryptedString(pbkey5, ciphertext);

    ciphertext = encryptedString(pbkey5, "abc");
    plaintext = decryptedString(pvkey5, ciphertext);

}
var app = {};
app.server = {};
app.account = {};

$(document).ready(function () {
    $("#test1").click(function () {
        window.alert("click");
        $.ajax({
            data: {"text": "abc",
                "accountName": "abc",
                "password": hex_sha1("abc123")
            },
            success: function (data) {
                RSA.setMaxDigits(38);
                app.server.PbKey = RSA.RSAKey(data.PbKey);
                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
//                alert(JSON.stringify(data));
            },
            type: 'GET',
            url: ("/api2/account/auth")
        });
    });

    $("#test_auth").click(function () {

        window.alert("test_auth");
        $.ajax({
            data: {"text": "abc",
                "accountName": "abc",
                "password": hex_sha1("abc123")
            },
            success: function (data) {
                RSA.setMaxDigits(38);
                app.server.PbKey = RSA.RSAKey(data.PbKey);
                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
//                alert(JSON.stringify(data));
            },
            type: 'GET',
            url: ("/api2/account/auth")
        });
    });

    $("#account_add").click(function () {

        window.alert("test_auth");
        $.ajax({
            data: {
                "accountName": "abc",
                "password": hex_sha1("password1"),
                "phone":"15232232888",
                "email":"avasf@163.com"
            },
            success: function (data) {
//                RSA.setMaxDigits(38);
//                app.server.PbKey = RSA.RSAKey(data.PbKey);
//                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
//                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
//                alert(JSON.stringify(data));
            },
            type: 'GET',
            url: ("/api2/account/add")
        });
    });


    $("#account_exist").click(function () {

        window.alert("test_exist");
        $.ajax({
            data: {
                "accountName": "aaabbbccc",
                "password": hex_sha1("123"),
                "phone":"18691171987",
                "email":"avasf@163.com"
            },
            success: function (data) {
                RSA.setMaxDigits(38);
                app.server.PbKey = RSA.RSAKey(data.PbKey);
                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
                alert(JSON.stringify(data));
            },
            type: 'GET',
            url: ("/api2/account/exist")
        });
    });

    $("#account_auth").click(function () {

        window.alert("account_auth");
        $.ajax({
            data: {
                "accountName": "",
                "email":"",
                "phone":"18609878987"
            },
            success: function (data) {
                RSA.setMaxDigits(38);
                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
                alert(JSON.stringify(data));
            },
            type: 'GET',
            url: ("/api2/account/auth")
        });
    });

    $("#account_weixinAdd").click(function () {

        window.alert("account_add");
        $.ajax({
            data: {
                "uid": "asdfasdf",
                "accesskey":"2013",
                "weixinOpenID":"18609878987",
                "weixinName":"gkgkgkgkgkgk",
                "token":"fdadfad"
            },
            success: function (data) {
                RSA.setMaxDigits(38);
                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
                app.account.weixinOpenID = RSA.decryptedString(app.sever.PbKey, data.weixinOpenID);
                app.account.weixinName = RSA.decryptedString(app.sever.PbKey, data.weixinName);
                app.account.token = RSA.decryptedString(app.sever.PbKey, data.token);
                alert(JSON.stringify(data));
            },
            type: 'GET',
            url: ("/api2/weixinuer/add")
        });
    });

});





