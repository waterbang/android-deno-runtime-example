package org.bfchain.rust.example


import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import android.widget.ImageView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat.startActivityForResult
import com.google.mlkit.vision.barcode.Barcode
import com.king.app.dialog.AppDialog
import com.king.app.dialog.AppDialogConfig
import com.king.mlkit.vision.barcode.BarcodeDecoder
import com.king.mlkit.vision.camera.CameraScan
import com.king.mlkit.vision.camera.analyze.Analyzer.OnAnalyzeListener
import com.king.mlkit.vision.camera.util.LogUtils
import com.king.mlkit.vision.camera.util.PermissionUtils
import org.bfchain.rust.example.barcode.BarcodeScanningActivity
import org.bfchain.rust.example.barcode.MultipleQRCodeScanningActivity
import org.bfchain.rust.example.barcode.QRCodeScanningActivity
import org.bfchain.rust.example.lib.drawRect
import org.bfchain.rust.example.webView.DWebViewActivity
import org.bfchain.rust.example.webView.openDWebWindow


//var start_zzzz: (() -> Unit)? = null
val callable_map = mutableMapOf<String, () -> Unit>()

class MainActivity : AppCompatActivity() {


    var isQRCode = false //是否是识别二维码
    fun getContext() = this

    companion object {
        const val REQUEST_CODE_PHOTO = 1
        const val REQUEST_CODE_REQUEST_EXTERNAL_STORAGE = 2
        const val REQUEST_CODE_SCAN_CODE = 3
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        callable_map["openScanner"] = { openScannerActivity() }
        callable_map["openDWebView"] = { openDWebViewActivity() }
        // 启动Deno服务
        val deno = Intent(this, DenoService::class.java)
        deno.putExtra("task", "openScanner")
        startService(deno)
    }

    // 选择图片回调
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK) {
            when (requestCode) {
                REQUEST_CODE_PHOTO -> processPhoto(data)
                REQUEST_CODE_SCAN_CODE -> processScanResult(data)
            }
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CODE_REQUEST_EXTERNAL_STORAGE && PermissionUtils.requestPermissionsResult(
                Manifest.permission.READ_EXTERNAL_STORAGE,
                permissions,
                grantResults
            )
        ) {
            startPickPhoto()
        }
    }


    private fun processScanResult(data: Intent?) {
        val text = CameraScan.parseScanResult(data)
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
    }

    private fun processPhoto(data: Intent?) {
        data?.let {
            try {
                val src = MediaStore.Images.Media.getBitmap(contentResolver, it.data)
                BarcodeDecoder.process(src, object : OnAnalyzeListener<List<Barcode>?> {
                    override fun onSuccess(result: List<Barcode>) {
                        if (result.isNotEmpty()) {
                            val buffer = StringBuilder()
                            val bitmap = src.drawRect { canvas, paint ->
                                for ((index, data) in result.withIndex()) {
                                    buffer.append("[$index] ").append(data.displayValue)
                                        .append("\n")
                                    canvas.drawRect(data.boundingBox, paint)
                                }
                            }

                            val config =
                                AppDialogConfig(getContext(), R.layout.barcode_result_dialog)
                            config.setContent(buffer)
                                .setHideCancel(true)
                                .setOnClickOk {
                                    AppDialog.INSTANCE.dismissDialog()
                                }
                            val imageView = config.getView<ImageView>(R.id.ivDialogContent)
                            imageView.setImageBitmap(bitmap)
                            AppDialog.INSTANCE.showDialog(config)
                        } else {
                            LogUtils.d("result is null")
                            Toast.makeText(getContext(), "result is null", Toast.LENGTH_SHORT)
                                .show()
                        }
                    }

                    override fun onFailure() {
                        LogUtils.d("onFailure")
                        Toast.makeText(getContext(), "onFailure", Toast.LENGTH_SHORT).show()
                    }
                    //如果指定具体的识别条码类型，速度会更快
                }, if (isQRCode) Barcode.FORMAT_QR_CODE else Barcode.FORMAT_ALL_FORMATS)
            } catch (e: Exception) {
                e.printStackTrace()
                Toast.makeText(getContext(), e.message, Toast.LENGTH_SHORT).show()
            }

        }
    }

    private fun startActivity(cls: Class<*>) {
        startActivity(Intent(this, cls))
    }

    private fun pickPhotoClicked(isQRCode: Boolean) {
        this.isQRCode = isQRCode
        if (PermissionUtils.checkPermission(
                getContext(),
                Manifest.permission.READ_EXTERNAL_STORAGE
            )
        ) {
            startPickPhoto()
        } else {
            PermissionUtils.requestPermission(
                this,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                REQUEST_CODE_REQUEST_EXTERNAL_STORAGE
            )
        }
    }

    private fun startPickPhoto() {
        val pickIntent = Intent(
            Intent.ACTION_PICK,
            MediaStore.Images.Media.EXTERNAL_CONTENT_URI
        )
        pickIntent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*")
        startActivityForResult(pickIntent, REQUEST_CODE_PHOTO)
    }


    fun openScannerActivity() {
        startActivityForResult(
            Intent(this, QRCodeScanningActivity::class.java),
            REQUEST_CODE_SCAN_CODE
        )
    }

    fun openDWebViewActivity() {
        LogUtils.d("启动了DWebView")
        openDWebWindow(
            activity = getContext(),
            url = "file:///android_asset/hello_runtime.html"
        )
    }


    fun onClick(v: View) {
        when (v.id) {
            R.id.btn -> openScannerActivity()
            R.id.btn0 -> startActivity(MultipleQRCodeScanningActivity::class.java)
            R.id.btn1 -> startActivity(BarcodeScanningActivity::class.java)
            R.id.btn2 -> {
                LogUtils.d("android调用js并且返回数据")
//                DWebViewActivity().callJavascript()
            }
            R.id.btn3 -> {
                LogUtils.d("启动了DWebView")
                openDWebWindow(
                    activity = getContext(),
                    url = "file:///android_asset/hello_runtime.html"
                )
            }
        }
    }


}
