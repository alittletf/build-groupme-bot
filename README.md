# build-groupme-bot
Build your own GroupMe Bot with Cryptocurrency prices! 


Things you need to make this work:

1. The code above
2. Your GroupMe login
3. Heroku account
4. Coin Market Cap API key

How those 4 connect together => The code above can be deployed to Heroku, which is the hosting provider that host your server code. Inside the code you need your GroupMe Bot ID so your post goes to the right chat. And if you'd like to make your bot in a cryptocurrency price report, you'll need a Coin Market Cap API key to fetch prices on request. 

First create a Heroku account. Once in, under the "Deploy" button, connect your Heroku account to the Github repo this code will live on. This ensure everytime you push to Main, a new deploy is started.

Once logged into dev.groupme.com, create a Bot on this screen: 

![image](https://user-images.githubusercontent.com/17679691/203662465-f82c67a8-1af4-42ca-bd1a-09014a35773d.png)

After completion, you will be taken to a screen with all your Bots. You can grab the BOT ID in that list. 

Now you can plug in your BOT ID info into the code above and get things working! 

