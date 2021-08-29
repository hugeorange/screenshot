// 测试html字符串
export const htmlstr = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>测试截图html字符串</title>
    </head>
    <style>
        h1 {
            font-size: 22px;
            color: aqua;
            border: 3px solid red;
            box-shadow: 0px 0px 10px royalblue;
        }
        .bgimg {
            width: 300px;
            height: 400px;
            background-size: 100%;
            background-image: url('https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/8/28/1630124458803_17.jpg');
        }
    </style>
    <body>
        <h1>我是测试截图的html字符串窜</h1>
        <div class="bgimg">我是一个有背景图的div</div>
        <h5>下面是一张图片</h5>
        <img width="500" src="https://p3.img.cctvpic.com/photoAlbum/page/performance/img/2021/8/29/1630215380767_621.jpg" alt="防盗链加载不出来">
    </body>
    </html>
`;
