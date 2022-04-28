package org.bfchain.rust.example

import android.content.res.AssetManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import org.bfchain.rust.example.lib.RustLog
import org.bfchain.rust.example.ui.theme.RustApplicationTheme


class MainActivity : ComponentActivity() {

    private external fun hello();
    private external fun hello2(assets: AssetManager);
    private external fun helloDenoRuntime(assets: AssetManager);

    companion object {
        init {
            System.loadLibrary("rust_lib")
        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        RustLog.initialiseLogging()
        RustLog.testDenoCore()
//        MainActivity().hello()
//        RustLog.testDenoRuntime()
        MainActivity().helloDenoRuntime(assets)

        setContent {
            RustApplicationTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Greeting("Android With Rust")
                }
            }
        }
    }
}
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}