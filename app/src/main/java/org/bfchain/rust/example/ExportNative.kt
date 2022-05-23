package org.bfchain.rust.example

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import org.bfchain.rust.example.barcode.QRCodeScanningActivity

class ExportNative : AppCompatActivity() {

    external fun hello()

    fun startScanner() {
        startActivityForResult(
            Intent(this, QRCodeScanningActivity::class.java),
            MainActivity.REQUEST_CODE_SCAN_CODE
        )
    }
}

