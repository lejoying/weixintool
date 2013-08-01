
MATCH n
RETURN n

/***************************************
 *     schema
 ***************************************/

CREATE INDEX ON :Account(accountName)
CREATE INDEX ON :Account(phone)
CREATE INDEX ON :Account(email)

CREATE INDEX ON :Weixin(token)
CREATE INDEX ON :Weixin(weixinOpenID)

CREATE INDEX ON :User(id)

CREATE INDEX ON :App(appid)


/***************************************
 *     account
 ***************************************/


CREATE account:Account{accountName:'abc2', phone:'15133339999', email:'aa@1.com'}
RETURN  account


CREATE UNIQUE account:Account{}
SET account.id=ID(account)
RETURN  account

MATCH account:Account
WHERE account.accountName! ='abc' OR account.phone! ='15133339999'
RETURN account

/***************************************
 *     weixin
 ***************************************/
 
MATCH account:Account-[:HAS_WEIXIN]->weixin:Weixin
WHERE weixin.status! ='binding'
RETURN weixin, account

START account=node(16)
MATCH account-[:HAS_WEIXIN]->weixin:Weixin<-[:BIND]->app:App
WHERE weixin.status! ='bind_server' OR weixin.status! ='bind_message' 
RETURN weixin, app

MATCH weixin:Weixin, app:App
WHERE weixin.weixinOpenID! ='gh_c6cd8a443586' AND app.appid! =55
CREATE UNIQUE app-[r:BIND]->weixin 
RETURN weixin, app, r


MATCH weixin:Weixin-[r]-other
RETURN weixin, r


/***************************************
 *     user
 ***************************************/
MATCH weixin:Weixin
WHERE weixin.weixinOpenID! ='gh_c6cd8a443586'
CREATE UNIQUE user:User{id:'123dasdfaf'}-[r:FOCUS]->weixin
RETURN  user, weixin, r

CREATE (user:User{id:'123dasdfaf'})
RETURN  user

MATCH user:User
WHERE user.id='123dasdfaf'
RETURN  user


MATCH weixin:Weixin, user:User
WHERE weixin.weixinOpenID! ='gh_c6cd8a443586' AND user.id='123dasdfaf'
CREATE UNIQUE user-[r:FOCUS]->weixin
RETURN  user, weixin, 

MATCH user:User-[:FOCUS]->weixin:Weixin
WHERE weixin.weixinOpenID! ='gh_c6cd8a443586'
RETURN  user


/***************************************
 *     AppStore
 ***************************************/
 
CREATE appStore:AppStore
RETURN  appStore

/***************************************
 *     app
 ***************************************/
MATCH account:Account-[r1:OWN_APP]->app:App-[r2:BIND]->weixin:Weixin
RETURN  app, r1, r2


MATCH other-[r]-app:App
WHERE app.appid=39
RETURN  app, r

