package org.bfchain.rust.example

import android.app.IntentService
import android.content.Intent
import android.content.res.AssetManager
import android.util.Log


private const val TAG = "DENO_SERVICE"

class DenoService : IntentService("DenoService") {
    companion object {
        // 加载rust编译的so
        init {
            System.loadLibrary("rust_lib")
        }
    }

    interface JNICallback {
        fun handleCallback(string: String)
    }

    external fun handleCallback(callback: JNICallback)
    external fun helloDenoRuntime(assets: AssetManager)
    external fun initialiseLogging()
    external fun stringFromJNI(): String?


    override fun onHandleIntent(p0: Intent?) {
        println("工作线程是: " + Thread.currentThread().name)
        val task: String? = p0?.getStringExtra("task")
        println("任务是 :$task")

        val appContext = applicationContext
//        makeStatusNotification("有医保的先rush", appContext)

        handleCallback(object : JNICallback {
            override fun handleCallback(string: String) {
                Log.d("handleCallback", "now rust says:" + string)
                callable_map[string]?.let { it() }
            }
        })
    }


}

