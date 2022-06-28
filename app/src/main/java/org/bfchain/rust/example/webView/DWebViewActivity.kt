package org.bfchain.rust.example.webView


import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.webkit.WebView
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.core.view.WindowCompat
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import androidx.navigation.navDeepLink
import com.google.accompanist.navigation.material.ExperimentalMaterialNavigationApi
import com.google.accompanist.navigation.material.ModalBottomSheetLayout
import com.google.accompanist.navigation.material.rememberBottomSheetNavigator
import org.bfchain.rust.example.ui.theme.RustApplicationTheme
import org.bfchain.rust.example.webView.urlscheme.CustomUrlScheme
import org.bfchain.rust.example.webView.urlscheme.requestHandlerFromAssets
import org.bfchain.rust.example.webkit.rememberAdWebViewState
import java.net.URLDecoder
import java.net.URLEncoder
import kotlin.io.path.Path


private const val TAG = "DWebViewActivity"

class DWebViewActivity : AppCompatActivity() {

    companion object {
        val ALL = mutableListOf<DWebViewActivity>()
    }

    override fun onBackPressed() {
        Log.i(TAG, "parentActivityIntent:${this.parentActivityIntent}")

        if (this.parentActivityIntent == null) {
            super.onBackPressed()
        } else {
            this.startActivity(this.parentActivityIntent)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        ALL.remove(this)
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ALL.add(this)
        WebView.setWebContentsDebuggingEnabled(true)

        Log.i(TAG, "onCreate")
        Log.i(TAG, "actionBar$actionBar")
        WindowCompat.setDecorFitsSystemWindows(window, false)

        val activity = this
        setContent {
            RustApplicationTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background,
                ) {
                    NavFun(activity)
                }
            }

        }
    }
}

@OptIn(
    ExperimentalMaterialNavigationApi::class,
    androidx.compose.foundation.layout.ExperimentalLayoutApi::class
)
@Composable
private fun NavFun(activity: ComponentActivity) {
    val bottomSheetNavigator = rememberBottomSheetNavigator()
    val navController = rememberNavController(bottomSheetNavigator)

    ModalBottomSheetLayout(bottomSheetNavigator) {
        NavHost(navController = navController, startDestination = "dweb/{url}") {
            composable(
                "dweb/{url}",
                arguments = listOf(
                    navArgument("url") {
                        type = NavType.StringType
                    }
                ),
                deepLinks = listOf(navDeepLink {
                    uriPattern = "dweb://{url}"
                })
            ) { entry ->
                // 请求文件路径
                var urlStr = entry.arguments?.getString("url")
                    .let { it -> URLDecoder.decode(it, "UTF-8") }
                    ?: "file:///android_asset/index.html"
                var customUrlScheme = CustomUrlScheme(
                    "dweb", urlStr,
                    requestHandlerFromAssets(LocalContext.current.assets, urlStr)
                )

                // 内建应用的路径
                val internalAppFilePathPrefix = "file:///android_asset/app/"
                Log.d(TAG, "NavFun: ${urlStr.startsWith(internalAppFilePathPrefix)}")
                // 如果是内建应用发来的数据
                if (urlStr.startsWith(internalAppFilePathPrefix)) {
                    // 拿到发送请求的文件名 index.html
                    val host = Path(urlStr.substring(internalAppFilePathPrefix.length)).getName(0)
                        .toString()
                    val assetBasePath = "app/$host/"
                    // 设置规则
                    customUrlScheme = CustomUrlScheme(
                        "dweb", host,
                        requestHandlerFromAssets(LocalContext.current.assets, assetBasePath)
                    )
                    urlStr =
                        customUrlScheme.resolveUrl(urlStr.substring(internalAppFilePathPrefix.length + host.length))
                }
                DWebView(
                    state = rememberAdWebViewState(urlStr),
                    navController = navController,
                    activity = activity,
                    modifier = Modifier.background(Color.Unspecified),
                    customUrlScheme = customUrlScheme,
//                    modifier = Modifier.padding(innerPadding)
                ) { webView ->
//                            webView.addJavascriptInterface()
//                    adWebViewHook = webView.adWebViewHook
                }
            }
        }
    }
}


fun openDWebWindow(activity: ComponentActivity, url: String) {
//    activity.applicationContext
//                        navController.navigate("demo-web/$to")
    var intent = Intent(activity.applicationContext, DWebViewActivity::class.java).also {
        it.data =
            Uri.parse("dweb://" + URLEncoder.encode(url, "UTF-8"))
//        it.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT)
//        it.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
//        it.addFlags(Intent.FLAG_ACTIVITY_MULTIPLE_TASK)
    }
    activity.startActivity(intent)
}



