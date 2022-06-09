package org.bfchain.rust.example.webkit

import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Process
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebView
import org.bfchain.rust.example.webkit.inputFile.AdFileInputHelper
import org.bfchain.rust.example.webkit.inputFile.InputFileOptions

/**
 * AccompanistWebChromeClient
 *
 * A parent class implementation of WebChromeClient that can be subclassed to add custom behaviour.
 *
 * As Accompanist Web needs to set its own web client to function, it provides this intermediary
 * class that can be overriden if further custom behaviour is required.
 */
open class AdWebChromeClient : WebChromeClient() {
    open lateinit var state: AdWebViewState
        internal set
    open lateinit var fileInputHelper: AdFileInputHelper
        internal set

    override fun onReceivedTitle(view: WebView?, title: String?) {
        super.onReceivedTitle(view, title)
        state.pageTitle = title
    }

    override fun onReceivedIcon(view: WebView?, icon: Bitmap?) {
        super.onReceivedIcon(view, icon)
        state.pageIcon = icon
    }

    override fun onProgressChanged(view: WebView?, newProgress: Int) {
        super.onProgressChanged(view, newProgress)
        if (state.loadingState is AdLoadingState.Finished) return
        state.loadingState = AdLoadingState.Loading(newProgress / 100.0f)
    }

    override fun onShowFileChooser(
        webView: WebView?,
        filePathCallback: ValueCallback<Array<Uri>>?,
        fileChooserParams: FileChooserParams?
    ): Boolean {
//        return super.onShowFileChooser(webView, filePathCallback, fileChooserParams)

        var multiple = false
        var capture = false
        val accept = mutableListOf<String>()

        fileChooserParams?.let { params ->
            capture = params.isCaptureEnabled
            multiple = params.mode == WebChromeClient.FileChooserParams.MODE_OPEN_MULTIPLE
            accept.addAll(params.acceptTypes)
        }

        val launchFileInput = {
            fileInputHelper.filePathCallback = filePathCallback
            val options =
                InputFileOptions(accept = accept, multiple = multiple, capture = capture)
            fileInputHelper.inputFileLauncher.launch(options)
        }

        if (capture && PackageManager.PERMISSION_GRANTED != webView?.context?.checkPermission(
                android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Process.myPid(), Process.myUid()
            ) ?: return false/*cancel*/
        ) {
            fileInputHelper.requestPermissionCallback = ValueCallback {
                launchFileInput()
            }
            fileInputHelper.requestPermissionLauncher.launch(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
        } else {
            launchFileInput()
        }


        return true
    }
}