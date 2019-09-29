## RLN detect app

## ssh raspi

> ssh pi@10.10.0.1

## copy to raspi wifi

```
// copy by wifi
cd  /Documents/projects/sound-client/server
// all
scp -r ./  pi@10.10.0.1:Documents/code/app/
// without npm module
scp -r ./src  pi@10.10.0.1:Documents/code/app/
scp -r ./app.js  pi@10.10.0.1:Documents/code/app/
scp -r ./public  pi@10.10.0.1:Documents/code/app/
scp -r ./private  pi@10.10.0.1:Documents/code/app/
scp -r ./package.json  pi@10.10.0.1:Documents/code/app/
```