package org.bfchain.rust.example.webView.js.navigator

import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.navigation.NavController
import org.bfchain.rust.example.webView.openDWebWindow

private const val TAG = "js/MyNav"

class NavigatorFFI(
    val webView: WebView,
    val activity: ComponentActivity,
    val navController: NavController
) {

    @JavascriptInterface //android4.2以后 必须加上此注解
    fun showToast(json: String) {
        Toast.makeText(activity, json, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun finishActivity() {
        activity.finish()
    }

    @JavascriptInterface
    fun onBackPressed() {
        //Android调用js方法，并且可以收到返回值
        activity.runOnUiThread {
            webView.evaluateJavascript("javascript:onBackPressed()") {
                Log.d(TAG, "onBackPressed: $it")
            }
        }
    }

    @JavascriptInterface
    fun navigate(to: String) {
        activity.runOnUiThread {
            navController.navigate(to)
        }
    }

    @JavascriptInterface
    fun navigateWeb(to: String) {
        activity.runOnUiThread {
            openDWebWindow(activity = activity, url = to)

            Log.i(TAG, "startActivity!!!")
        }
    }

    @JavascriptInterface
    fun jsFunction(a: Int, b: Int) {
        Log.e(TAG, "call jsFunction in java.fail~~~")
    }

    @JavascriptInterface
    fun testCallJs() {
//                    jsFunction(1, 2)
        activity.runOnUiThread {
            webView.evaluateJavascript("my_nav.jsFunction2(2,3)") { result ->
                Log.i(TAG, "eval jsFunction ${result.toFloat()}")
            }
        }
    }

    @JavascriptInterface
    fun disableBack() {

    }


    @JavascriptInterface
    fun back() {
        activity.runOnUiThread {
            activity.onBackPressed()
        }
//                    activity.runOnUiThread() {
//                        Log.i(TAG, "activity.parentActivityIntent:${activity.parentActivityIntent}")
//                        if (activity.parentActivityIntent == null) {
//                            val latest = DWebViewActivity.ALL.removeLastOrNull()
//                            if (latest != null) {
//                                val parent = DWebViewActivity.ALL.lastOrNull()
//                                Log.i(TAG, "DWebViewActivity.ALL.lastOrNull:$parent")
//                                if (parent != null) {
//                                    Log.i(TAG, "parent.intent:${parent.intent}")
//                                    parent.intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT)
//                                    parent.intent.removeFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT)
//                                    parent.intent.removeFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK)
//                                    parent.intent.removeFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
//                                    activity.startActivity(parent.intent);
//                                    return@runOnUiThread
//                                }
//                            }
//                            activity.onBackPressed()
//                        } else {
//                            activity.startActivity(activity.parentActivityIntent)
//                        }
//                    }
    }

}