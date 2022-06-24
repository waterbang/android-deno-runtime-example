package org.bfchain.rust.example.webView

import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import okhttp3.Headers
import okhttp3.internal.http2.Header
import org.bfchain.rust.example.webView.urlscheme.nullInputStream

private const val TAG = "NetworkMap"

// 这里是存储客户端的映射规则的，这样才知道需要如何转发给后端 <FrontRouter,RearRouter>
val front_to_rear_map = mutableMapOf<String, RearRouter>()

fun gateWay(request: WebResourceRequest): WebResourceResponse {
    test()
    Log.d(TAG, "gateWay: ${request.url}")
    return WebResourceResponse(
        "application/json",
        "utf-8",
        404,
        "User not found",
        emptyMap(),
        nullInputStream
    )
}

fun test() {
    val b =
        RearRouter(
            "http://bMr9vohVtvBvWRS3p4bwgzSMoLHTPHSvVj.dweb",
            DHeader("application/json", 200, "xxx hi  this is response")
        )
    front_to_rear_map.set(b.url, b)
    Log.d(TAG, "test: ${front_to_rear_map.get(b.url)}")
}

data class FrontRouter(val url: String, val header: DHeader)

data class RearRouter(val url: String, val header: DHeader)

data class DHeader(val contentType: String, val StatusCode: Number, val response: Any)