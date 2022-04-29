package org.bfchain.rust.example

import android.content.Intent
import android.content.res.AssetManager
import android.os.Bundle
import android.os.Looper
import android.util.Log
import android.widget.StackView
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkRequest
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
//import org.bfchain.rust.example.lib.RustLog
import org.bfchain.rust.example.ui.theme.RustApplicationTheme
import java.util.*


private const val TAG = "MainActivity"

class MainActivity : ComponentActivity() {

    //    companion object {
//        init {
//            System.loadLibrary("rust_lib")
//        }
//    }
    private val workManager = WorkManager.getInstance(application)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        Intent(this, DenoService::class.java).also { intent ->
            startService(intent)
        }

        setContent {
            RustApplicationTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Column() {
                        Greeting("Android With Rust")
                        Button(onClick = {
                            Toast.makeText(
                                applicationContext,
                                "clicked!!!",
                                Toast.LENGTH_SHORT
                            ).show()
                            Log.i(TAG, "clicked!!")
                        }) {
                            Text(text = "Hi")
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}