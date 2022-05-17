package org.bfchain.rust.example

import android.content.Context
import android.content.res.AssetManager
import android.util.Log
import androidx.work.Worker
import androidx.work.WorkerParameters


private const val TAG = "DENO_SERVICE"
class DenoService(appContext:Context) {

    interface JNICallback{
        fun callback(string:String)
    }
    private val context = appContext;
    // 加载rust编译的so
    companion object {
        init {
            System.loadLibrary("rust_lib")
        }
    }

    external fun mlkitBarcodeScanning(callback:JNICallback)
    external fun helloDenoRuntime(assets: AssetManager);
    external fun initialiseLogging();

//    makeStatusNotification("Blurring image", context)
//    BarcodeScanningActivity().startScan();
//        try {
//    mlkitBarcodeScanning(object:JNICallback{
//        override fun callback(string: String) {
//            Log.d("MainActivity","now rust says:"+string);
//        }
//    })
//    initialiseLogging()
//    helloDenoRuntime(context.assets)
//        } catch (throwable: Throwable) {
//            Log.e(TAG, throwable.stackTraceToString())
//        }

    fun startScanner() {
//        BarcodeScanningActivity().startScan();
        mlkitBarcodeScanning(object:JNICallback{
        override fun callback(string: String) {
            Log.d("MainActivity","now rust says:"+string);
        }
    })
    }
}

