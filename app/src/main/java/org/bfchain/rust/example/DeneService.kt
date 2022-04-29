package org.bfchain.rust.example

import android.app.IntentService
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.res.AssetManager
import android.os.*
import android.util.Log
import android.widget.Toast
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import kotlinx.coroutines.*
import java.util.*

private const val TAG = "DENO_SERVICE"

class DenoService : IntentService("DenoService") {
    public external fun hello();
    public external fun hello2(assets: AssetManager);
    public external fun helloDenoRuntime(assets: AssetManager);
    public external fun initialiseLogging();

    companion object {
        init {
            System.loadLibrary("rust_lib")
        }
    }

    override fun onHandleIntent(p0: Intent?) {

//        while (true) {
//            val startTime = Calendar.getInstance().time;
//            while (true) {
//                val curTime = Calendar.getInstance().time;
//                if (curTime.time - startTime.time > 1000) {
//                    break
//                }
//            }
//            Log.e(TAG, startTime.toString())
//        }

        val appContext = applicationContext
        makeStatusNotification("Blurring image", appContext)

        try {
            initialiseLogging()
            helloDenoRuntime(appContext.assets)
        } catch (throwable: Throwable) {
            Log.e(TAG, throwable.stackTraceToString())
        }
    }

}

//class DenoService : Service() {
//    private var serviceLooper: Looper? = null
//    private var serviceHandler: ServiceHandler? = null
//
//
//    // Handler that receives messages from the thread
//    private inner class ServiceHandler(looper: Looper) : Handler(looper) {
//
//        override fun handleMessage(msg: Message) {
//            // Normally we would do some work here, like download a file.
//            // For our sample, we just sleep for 5 seconds.
//            try {
//                Thread.sleep(5000)
//            } catch (e: InterruptedException) {
//                // Restore interrupt status.
//                Thread.currentThread().interrupt()
//            }
//
//            // Stop the service using the startId, so that we don't stop
//            // the service in the middle of handling another job
//            stopSelf(msg.arg1)
//        }
//    }
//
//    companion object {
//        init {
//            System.loadLibrary("rust_lib")
//        }
//    }
//
//    override fun onCreate() {
//        HandlerThread("ServiceStartArguments", Process.THREAD_PRIORITY_BACKGROUND).apply {
//            start()
//            // Get the HandlerThread's Looper and use it for our Handler
//            serviceLooper = looper
//            serviceHandler = ServiceHandler(looper)
//
//            runBlocking {
//                launch {
//                    Thread {
//
//                        while (true) {
//                            val startTime = Calendar.getInstance().time;
//                            while (true) {
//                                val curTime = Calendar.getInstance().time;
//                                if (curTime.time - startTime.time > 1000) {
//                                    break
//                                }
//                            }
//                            Log.e(TAG, startTime.toString())
//                        }
//                    }.start()
//
//                    val appContext = applicationContext
//                    makeStatusNotification("Blurring image", appContext)
//
//                    try {
//                        MainActivity().initialiseLogging()
//                        MainActivity().helloDenoRuntime(appContext.assets)
//                    } catch (throwable: Throwable) {
//                        Log.e(TAG, throwable.toString())
//                    }
//                }
//            }
//        }
//    }
//
//
//    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
//        Toast.makeText(this, "service starting", Toast.LENGTH_SHORT).show()
//
//        // For each start request, send a message to start a job and deliver the
//        // start ID so we know which request we're stopping when we finish the job
//        serviceHandler?.obtainMessage()?.also { msg ->
//            msg.arg1 = startId
//            serviceHandler?.sendMessage(msg)
//        }
//
//        // If we get killed, after returning from here, restart
//        return START_STICKY
//    }
//
//    override fun onBind(intent: Intent): IBinder? {
//        // We don't provide binding, so return null
//        return null
//    }
//
//    override fun onDestroy() {
//        Toast.makeText(this, "service done", Toast.LENGTH_SHORT).show()
//    }
//
//}

//class DenoWorker(context: Context, parameters: WorkerParameters) :
//    CoroutineWorker(context, parameters) {
//    companion object {
//        init {
//            System.loadLibrary("rust_lib")
//        }
//    }
//
//    override suspend fun doWork(): Result {
//        Log.i(TAG, "do work!!!!!!!!!!!!!!!!!!");
//
//        val appContext = applicationContext
//        makeStatusNotification("Blurring image", appContext)
//
//        return try {
//            MainActivity().initialiseLogging()
//            MainActivity().helloDenoRuntime(appContext.assets)
//            return Result.success()
//        } catch (throwable: Throwable) {
//            Log.e(TAG, throwable.toString())
//            Result.failure()
//        }
//    }
//}