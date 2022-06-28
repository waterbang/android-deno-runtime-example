package org.bfchain.rust.example.webView

import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import androidx.compose.ui.platform.LocalContext
import org.bfchain.rust.example.webView.urlscheme.CustomUrlScheme
import org.bfchain.rust.example.webView.urlscheme.nullInputStream
import org.bfchain.rust.example.webView.urlscheme.requestHandlerFromAssets
import java.io.ByteArrayInputStream

private const val TAG = "NetworkMap"

// 这里是存储客户端的映射规则的，这样才知道需要如何转发给后端 <String,RearRouter>
val front_to_rear_map = mutableMapOf<String, RearRouter>()

fun gateWay(
    url: String
): String {
    test()
    Log.d(TAG, "gateWay: ${url}")
    if (front_to_rear_map.contains(url)) {
        return front_to_rear_map[url]?.url.toString()
    }
    Log.d(TAG, "gateWayxxxx: ${url}")
    return "https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo"
//    return WebResourceResponse(
//        "application/json",
//        "utf-8",
//        ByteArrayInputStream("access denied".toByteArray())
//    )
}

// 假装读取到了配置文件 ， mock : https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo
fun test() {
    val b =
        RearRouter(
            "https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo",
            DHeader("application/json", 200, "xxx hi  this is response")
        )
    front_to_rear_map["/getBlockInfo"] = b
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/getBlockHigh"] = b
    Log.d(
        TAG,
        "test: ${front_to_rear_map["https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo"]}"
    )
}

data class FrontRouter(val url: String, val header: DHeader)

data class RearRouter(val url: String, val header: DHeader)

data class DHeader(val contentType: String, val StatusCode: Number, val response: Any)