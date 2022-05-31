package org.bfchain.rust.example.webView


import android.annotation.SuppressLint
import android.app.ActivityManager
import android.graphics.Color
import android.os.Message
import android.util.Log
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalDensity
import androidx.core.view.WindowInsetsCompat
import androidx.navigation.NavController
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import org.bfchain.rust.example.webView.js.systemUi.SystemUiFFI
import org.bfchain.rust.example.webView.js.navigator.NavigatorFFI
import org.bfchain.rust.example.webView.js.util.JsUtil
import org.bfchain.plaoc.webkit.*


private const val TAG = "DWebView"

@SuppressLint("JavascriptInterface")
@Composable
fun DWebView(
    state: AdWebViewState,
    navController: NavController,
    activity: ComponentActivity,
    modifier: Modifier = Modifier,
    onCreated: (AdAndroidWebView) -> Unit = {},
) {
    val systemUiController = rememberSystemUiController()
    val isOverlayStatusBar = remember { mutableStateOf(false) }
    val isOverlayNavigationBar = remember { mutableStateOf(false) }
    val insetsCompat = remember(activity.window.decorView.rootWindowInsets) {
        WindowInsetsCompat.toWindowInsetsCompat(
            activity.window.decorView.rootWindowInsets
        )
    }

    val hook = remember {
        AdWebViewHook()
    }

    AdWebView(
        state = state,
        onCreated = { webView ->
            // 允许从file加载
            webView.settings.allowFileAccessFromFileURLs = true
            webView.settings.allowUniversalAccessFromFileURLs = true
            // 将webView的背景默认设置为透明。不通过systemUi的api提供这个功能，一些手机上动态地修改webView背景颜色，在黑夜模式下，会有问题
            webView.setBackgroundColor(Color.TRANSPARENT)
            webView.adWebViewHook = hook

            // 通用的工具类
            val jsUtil = JsUtil(activity, evaluateJavascript = { code, callback ->
                webView.evaluateJavascript(
                    code,
                    callback
                )
            })

            val navigatorFFI = NavigatorFFI(webView, activity, navController)
            webView.addJavascriptInterface(navigatorFFI, "Android_nav")

            val systemUiFFI = SystemUiFFI(
                activity,
                webView,
                hook,
                systemUiController,
                jsUtil,
                isOverlayStatusBar,
                isOverlayNavigationBar
            )
            webView.addJavascriptInterface(systemUiFFI, "Android_ui")

            onCreated(webView)
        },
        chromeClient = remember {
            class MyWebChromeClient : AdWebChromeClient() {
                override fun onReceivedTitle(view: WebView?, title: String?) {
                    super.onReceivedTitle(view, title)
                    Log.i(TAG, "TITLE CHANGED!!!! $title")

                    activity.runOnUiThread {
                        activity.setTaskDescription(
                            ActivityManager.TaskDescription(
                                title ?: ""
                            )
                        )
                    }
                }

                override fun onCreateWindow(
                    view: WebView?,
                    isDialog: Boolean,
                    isUserGesture: Boolean,
                    resultMsg: Message?
                ): Boolean {
                    if (view != null) {
                        val href = view.handler.obtainMessage()
                        view.requestFocusNodeHref(href)
                        val url = href.data.getString("url")
                        if (url != null) {
                            openDWebWindow(activity = activity, url = url)
                            return true
                        }
                    }
                    return super.onCreateWindow(view, isDialog, isUserGesture, resultMsg)

                }

            }
            MyWebChromeClient()
        },
        modifier = modifier.let { m ->
            var typeMask: Int = 0
            if (!isOverlayStatusBar.value) {
                typeMask = typeMask or WindowInsetsCompat.Type.statusBars()
            }
            if (!isOverlayNavigationBar.value) {
                typeMask = typeMask or WindowInsetsCompat.Type.navigationBars()
            }
            val insets = insetsCompat.getInsets(typeMask)
            with(LocalDensity.current) {
                modifier.padding(top = insets.top.toDp(), bottom = insets.bottom.toDp())
            }
        },
    )

}