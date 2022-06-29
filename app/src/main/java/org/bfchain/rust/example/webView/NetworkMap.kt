package org.bfchain.rust.example.webView

import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import okhttp3.OkHttpClient
import okhttp3.Request
import org.bfchain.rust.example.webView.urlscheme.CustomUrlScheme
import java.io.ByteArrayInputStream
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.util.*


private const val TAG = "NetworkMap"

// 这里是存储客户端的映射规则的，这样才知道需要如何转发给后端 <String,RearRouter>
val front_to_rear_map = mutableMapOf<String, RearRouter>()

fun dataGateWay(
    request: WebResourceRequest
): WebResourceResponse {
    val url = request.url.toString().lowercase(Locale.ROOT)
    Log.d(TAG, "gateWay: $url")
    if (front_to_rear_map.contains(url)) {
        try {
            val connection =
                URL(front_to_rear_map[url]?.url.toString()).openConnection() as HttpURLConnection
            connection.requestMethod = request.method
            val statusCode = connection.responseCode
            val response = connection.responseMessage
            val res = connection.inputStream
            Log.i(TAG, "xxxxxxxx gateWay: ${connection.url}")
            Log.i(TAG, "xxxxxxxx gateWay: ${connection.contentType}")
            Log.i(
                TAG,
                "xxxxxxxx gateWay: ${connection.responseMessage}"
            )
            return WebResourceResponse(
                "application/json",
                "utf-8",
                res
            )
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
        }
    }

    return WebResourceResponse(
        "application/json",
        "utf-8",
        ByteArrayInputStream("access denied".toByteArray())
    )
}

fun viewGateWay(
    customUrlScheme: CustomUrlScheme,
    request: WebResourceRequest
): WebResourceResponse {
    val url = request.url.toString().lowercase(Locale.ROOT)
    Log.d(TAG, "front_to_rear_map url: $url")
    if (front_to_rear_map.contains(url)) {
        try {
            val trueUrl = front_to_rear_map[url]?.url
            if (trueUrl != null) {
                // 远程文件处理
                if (trueUrl.startsWith("https") || trueUrl.startsWith("http")) {
                    val client = OkHttpClient()
                    val request = Request.Builder().url(trueUrl).get().build()
                    val response = client.newCall(request).execute()
                    return WebResourceResponse(
                        "text/html", "utf-8", ByteArrayInputStream(
                            response.body?.string()?.toByteArray()
                        )
                    )
//                    val connection =
//                        URL(trueUrl).openConnection() as HttpURLConnection
//                    return WebResourceResponse(
//                        "text/html",
//                        "utf-8",
//                        connection.inputStream
//                    )
                }
                // 本地文件处理
                return customUrlScheme.handleRequest(request, trueUrl)
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    return WebResourceResponse(
        "application/json",
        "utf-8",
        ByteArrayInputStream("access denied".toByteArray())
    )
}

// 假装读取到了配置文件 ， mock : https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo
/**
 * 1. 用户如果知道自己请求的是哪个dweb，那么用户在请求的时候会自己加上，域名前缀。如果在自己的DwebView里发送请求则不用携带前缀，只需要写请求路径。
 * 2. 在读取用户配置的时候，需要把前缀和请求的路径拼接起来。
 * 3. 这里的匹配需要使用正则匹配，用户如果填写了一个主域名，那么默认主域名下的所有资源都是被包括的。
 * (ps:前缀：https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb，请求的路径：getBlockInfo)
 */
fun test() {
    val b =
        RearRouter(
            "https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo",
            DHeader("application/json", 200, "xxx hi  this is response")
        )
    val c =
        RearRouter(
            "https://www.baidu.com",
            DHeader("application/json", 200, "xxx hi  this is response")
        )
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/hello_runtime.html"] = c
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/getBlockInfo"] = b
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/getBlockHigh"] = b

}

data class FrontRouter(val url: String, val header: DHeader)

data class RearRouter(val url: String, val header: DHeader)

data class DHeader(val contentType: String, val StatusCode: Number, val response: Any)