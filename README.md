# bfs base runtime app for modern os

## todo

core模块先不考虑，先直接都写到runtime里面。

### js传递给deno数据现在有两种选择

1. 使用 [protobufjs](https://github.com/protobufjs/protobuf.js)

2. 直接使用JSON序列化,如果遇到大文件直接传递内存地址就可以。

### 目前规划

    [🤯] 封装webComponent
    [] 把js调deno的webSocket注入webComponent
    [😃] 打通js传递消息到deno
    [😃] deno回传给js消息
    [] deno需要携带消息给kotlin,不仅仅是调用一个方法
    [] 重新正确的规划整个plugin和runtime模块，需要和小伙伴讨论。
    [] 系统的封装完android的方法，把函数都暴露出来。
    [] 仿照的已经完成的webComponent完成剩下的
