package org.bfchain.rust.example

import android.app.IntentService
import android.content.Intent
import android.util.Log
import com.google.gson.Gson


private const val TAG = "DENO_SERVICE"

// 这里当做一个连接池，每当有客户端传过来方法就注册一下，返回的时候就知道数据是谁要的了 <public_key,handleFunction>
val rust_call_map = mutableMapOf<String, String>()

class DenoService : IntentService("DenoService") {

    companion object {
        // 加载rust编译的so
        init {
            System.loadLibrary("rust_lib")
        }
    }

    interface IHandleCallback {
        fun handleCallback(string: String)
    }

    interface IOpenWebView {
        fun webViewCallback(string: String)
    }

    external fun nativeSetCallback(callback: IHandleCallback)
    external fun openWebView(callback: IOpenWebView)
    external fun getScanningData(
        scannerData: String,
        public_key: String? = rust_call_map["openScanner"]
    )
//    external fun helloDenoRuntime(assets: AssetManager)
//    external fun initialiseLogging()

    fun startForeground() {
    }

    override fun onHandleIntent(p0: Intent?) {
        println("工作线程是: " + Thread.currentThread().name)
        val task: String? = p0?.getStringExtra("task")
        println("任务是 :$task")

        val appContext = applicationContext
//        makeStatusNotification("有医保的先rush", appContext)
        nativeSetCallback(object : IHandleCallback {
            override fun handleCallback(callHandle: String) {
                Log.d("handleCallback", "now rust says:$callHandle")
                val handle = Gson().fromJson(callHandle, RustHandle::class.java)
                // 存一下public_key，返回数据的时候才知道给谁
                rust_call_map[(handle.function?.get(0)).toString()] = (handle.public_key).toString()
                // 执行函数
                callable_map[handle.function?.get(0)]?.let { it() }.apply { handle.data }
            }
        })
        // 独立启动webView和web Socket
        openWebView(object : IOpenWebView {
            override fun webViewCallback(callName: String) {
                Log.d("webViewCallback", "now rust webViewCallback says:$callName")
                callable_map[callName]?.let { it() }
            }
        })
    }
}

class RustHandle {
    var function: Array<String>? = null
    var public_key: String? = null
    var data: String? = null

    override fun toString(): String {
        return "{public_key=$public_key,function=$function,data=$data}"
    }
}

