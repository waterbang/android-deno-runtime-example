package org.bfchain.rust.example

import android.app.IntentService
import android.content.Intent
import android.util.Log
import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.ObjectMapper


private const val TAG = "DENO_SERVICE"

// 这里当做一个连接池，每当有客户端传过来方法就注册一下，返回的时候就知道数据是谁要的了 <public_key,handleFunction>
val rust_call_map = mutableMapOf<String, String>()
val mapper = ObjectMapper()

class DenoService : IntentService("DenoService") {

    companion object {
        init {
            // 加载rust编译的so
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
                //允许使用未带引号的字段名
                mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true)
                //允许使用单引号
                mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true)
                val handle = mapper.readValue(callHandle, RustHandle::class.java)
                // 存一下public_key，返回数据的时候才知道给谁
                rust_call_map[(handle.function?.get(0)).toString()] = (handle.public_key).toString()
                // 执行函数
                callable_map[handle.function?.get(0)]?.let { handle.data?.let { it1 -> it(it1) } }
            }
        })
        // 独立启动webView和web Socket
        openWebView(object : IOpenWebView {
            override fun webViewCallback(string: String) {
                Log.d("webViewCallback", "now rust webViewCallback says:$string")
                callable_map["openDWebView"]?.let { it("https://bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj.dweb/$string") }
            }
        })
    }
}

data class RustHandle(
    val function: Array<String>? = null,
    val public_key: String? = null,
    val data: String? = null
)

