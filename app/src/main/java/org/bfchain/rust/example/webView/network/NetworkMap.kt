package org.bfchain.rust.example.webView.network

import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import com.fasterxml.jackson.databind.DeserializationFeature
import org.bfchain.rust.example.RustHandle
import org.bfchain.rust.example.dWebView_host
import org.bfchain.rust.example.mapper
import org.bfchain.rust.example.webView.urlscheme.CustomUrlScheme
import org.json.JSONObject
import java.io.ByteArrayInputStream
import java.io.FileReader
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.sql.Blob
import java.util.*


private const val TAG = "NetworkMap"

// 这里是存储客户端的映射规则的，这样才知道需要如何转发给后端 <String,RearRouter>
val front_to_rear_map = mutableMapOf<String, RearRouter>()

// ð这里是路由的白名单
var network_whitelist = "http://127.0.0.1"

// 数据资源拦截
fun dataGateWay(
    request: WebResourceRequest
): WebResourceResponse {
    val url = request.url.toString().lowercase(Locale.ROOT)
    if (front_to_rear_map.contains(url)) {
        val trueUrl = front_to_rear_map[url]?.url.toString()
        val connection = URL(trueUrl).openConnection() as HttpURLConnection
        connection.requestMethod = request.method
//        Log.i(TAG, " gateWay: ${connection.url}")
//        Log.i(TAG, " gateWay: ${connection.contentType}")
//        Log.i(TAG, " gateWay: ${connection.responseMessage}")
        return WebResourceResponse(
            "application/json",
            "utf-8",
            connection.inputStream
        )
    }
    return WebResourceResponse(
        "application/json",
        "utf-8",
        ByteArrayInputStream("access denied".toByteArray())
    )
}

// 视图文件拦截
fun viewGateWay(
    customUrlScheme: CustomUrlScheme,
    request: WebResourceRequest
): WebResourceResponse {
    val url = request.url.toString().lowercase(Locale.ROOT)
    if (front_to_rear_map.contains(url)) {
        val trueUrl = front_to_rear_map[url]?.url
        if (trueUrl != null) {
            // 远程文件处理
            if (trueUrl.startsWith("https") || trueUrl.startsWith("http")) {
                val connection = URL(trueUrl).openConnection() as HttpURLConnection
                connection.requestMethod = request.method
                return WebResourceResponse(
                    "text/html",
                    "utf-8",
                    connection.inputStream
                )
            }
            // 本地文件处理
            return customUrlScheme.handleRequest(request, trueUrl)
        }
    }
    return WebResourceResponse(
        "application/json",
        "utf-8",
        ByteArrayInputStream("access denied".toByteArray())
    )
}

fun initMetaData(metaData: String) {
    val decoder: Base64.Decoder = Base64.getDecoder()
    val deJson = String(decoder.decode(metaData))
    mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
    val metaJson =
        mapper.readValue(deJson, UserMetaData::class.java)
    // 设置路由
    for (router in metaJson.router) {
        if (router.url !== null) {
            val header = router.header
            front_to_rear_map[resolveUrl(router.url)] =
                RearRouter(
                    header.response as String,
                    UserHeader(
                        header.method,
                        header.contentType,
                        header.StatusCode,
                    )
                )
        }
    }
    // 设置白名单
    for (whitelist in metaJson.whitelist) {
        network_whitelist += whitelist
    }
    Log.d(TAG, "this is metaData:${network_whitelist}")
}

fun resolveUrl(path: String): String {
    val pathname = if (path.startsWith("/")) {
        path
    } else {
        "/$path"
    }
    return dWebView_host + pathname
}

// 跳过白名单（因为每次请求都会走这个方法，所以抛弃循环的方法，用contains进行模式匹配，保证了速度）
fun jumpWhitelist(url: String): Boolean {
    val currentUrl = URL(url)
    if (network_whitelist.contains(currentUrl.host)) {
        return false
    }
    return true
}

// 假装读取到了配置文件 ， mock : https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo
/**
 * 1. 用户如果知道自己请求的是哪个dweb，那么用户在请求的时候会自己加上，域名前缀。如果在自己的DwebView里发送请求则不用携带前缀，只需要写请求路径。
 * 2. 在读取用户配置的时候，需要把前缀和请求的路径拼接起来。
 * 3. 这里的匹配需要使用正则匹配，用户如果填写了一个主域名，那么默认主域名下的所有资源都是被包括的。
 * 4. 存储的规则统一用小写的
 * (ps:前缀：https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb，请求的路径：getBlockInfo)
 */
fun test() {
    val b =
        RearRouter(
            "https://62b94efd41bf319d22797acd.mockapi.io/bfchain/v1/getBlockInfo",
            UserHeader("GET", "application/json", 200, "xxx hi  this is response")
        )
    val c1 =
        RearRouter(
            "hello_runtime.html",
            UserHeader("GET", "application/json", 200, "xxx hi  this is response")
        )
    val c2 =
        RearRouter(
            "app/bfchain.dev/index.html",
            UserHeader("GET", "application/json", 200, "xxx hi  this is response")
        )
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/hello_runtime.html"] = c1
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/app/bfchain.dev/index.html"] =
        c2
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/getblockinfo"] = b
    front_to_rear_map["https://bmr9vohvtvbvwrs3p4bwgzsmolhtphsvvj.dweb/getBlockHigh"] = b

}

data class RearRouter(val url: String, val header: UserHeader)

data class UserMetaData(
    val router: Array<UserRouter> = arrayOf(UserRouter()),
    val whitelist: Array<String> = arrayOf("https://unpkg.com")
)

data class UserRouter(
    val url: String? = null,
    val header: UserHeader = UserHeader()
)

data class UserHeader(
    val method: String = "GET",
    val contentType: String = "application/json",
    val StatusCode: Number = 200,
    val response: Any = ""
)

