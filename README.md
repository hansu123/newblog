申请ssl证书



参考博文[Nginx配置https](https://segmentfault.com/a/1190000007948986)

小伙伴们一定不要直接把命令复制粘贴到配置文件中，因为conf文件被记事本编辑过，保存成了含[BOM] 。所以当我们保存重新加载nginx时会报错`unknwon directive "" `。

解决办法，自己手写或者外部保存为utf-8的文件类型进行替换。

参考博文 [unknown directive ""](https://www.jianshu.com/p/2516ec8bae72)

这时打开就能看到网站正常显示了

但是还有一个问题，我访问http时会报如下错误:



![](https://hansu-1253325863.cos.ap-shanghai.myqcloud.com/newblog/markdown/linux/https3.jpg)

如何强制跳转呢？





webpack打包