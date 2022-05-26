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
        fun scannerCallback(string: String)
    }

    external fun mlkitBarcodeScanning(callback: JNICallback)
    external fun helloDenoRuntime(assets: AssetManager)
    external fun initialiseLogging()
    external fun stringFromJNI(): String?


    override fun onHandleIntent(p0: Intent?) {
        println("工作线程是: " + Thread.currentThread().name)
        val task: String? = p0?.getStringExtra("task")
        println("任务是 :$task")

        val appContext = applicationContext
        makeStatusNotification("有医保的先rush", appContext)

        helloDenoRuntime(appContext.assets)
        mlkitBarcodeScanning(object : JNICallback {
            override fun scannerCallback(string: String) {
                Log.d("startScanner", "now rust says:" + string)
                callable_map[string]?.let { it() }
            }
        })
    }


}

