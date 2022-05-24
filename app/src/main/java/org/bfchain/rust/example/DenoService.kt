package org.bfchain.rust.example

import android.app.IntentService
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.res.AssetManager
import android.os.IBinder
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import org.bfchain.rust.example.barcode.QRCodeScanningActivity


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
        mlkitBarcodeScanning(object : JNICallback {
            override fun scannerCallback(string: String) {
                Log.d("startScanner", "now rust says:" + string)

//                start_zzzz?.let { it() }
            }
        })
    }

}

