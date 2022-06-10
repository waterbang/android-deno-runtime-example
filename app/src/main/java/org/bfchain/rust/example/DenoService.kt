package org.bfchain.rust.example

import android.app.IntentService
import android.content.Intent
import android.util.Log


private const val TAG = "DENO_SERVICE"

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
            override fun handleCallback(name: String) {
                Log.d("handleCallback", "now rust says:" + string)
                callable_map[name]?.let { it() }
            }
        })
        // 独立启动webView和web Socket
        openWebView(object : IOpenWebView {
            override fun webViewCallback(string: String) {
                Log.d("webViewCallback", "now rust webViewCallback says:" + string)
                callable_map[string]?.let { it() }
            }
        })

    }


}

