package org.bfchain.rust.example

import android.content.Context
import android.content.res.AssetManager
import android.util.Log
import androidx.work.Worker
import androidx.work.WorkerParameters

private const val TAG = "DENO_SERVICE"
class DenoService(appContext:Context, workerParams:WorkerParameters) : Worker(appContext,workerParams) {
    public interface JNICallback{
        fun callback(string:String)
    }
    private val context = appContext;
    private val params = workerParams;
    // 加载rust编译的so
    companion object {
        init {
            System.loadLibrary("rust_lib")
        }
    }

    external fun hello(to: String): String;
    external fun invokeCallbackViaJNI(callback:JNICallback)
    public external fun hello2(assets: AssetManager);
    public external fun helloDenoRuntime(assets: AssetManager);
    public external fun initialiseLogging();



    override fun doWork(): Result {
        makeStatusNotification("Blurring image", context)

        try {
            invokeCallbackViaJNI(object:JNICallback{
                override fun callback(string: String) {
                    Log.d("MainActivity","now rust says:"+string);
                }
            })
            initialiseLogging()
            helloDenoRuntime(context.assets)
        } catch (throwable: Throwable) {
            Log.e(TAG, throwable.stackTraceToString())
        }
        return Result.success();
    }

}

